import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../components/button/button.dart';
import '../theme/humax_theme.dart';

/// Semantic error type — drives default copy and icon.
///
/// Contract: contracts/flutter/error_state.contract.json → errorTypes
enum HumaxErrorType {
  /// No connectivity. Headline: "No internet connection"
  network,

  /// 5xx or unexpected server failure. Headline: "Something went wrong"
  server,

  /// 404. Headline: "Page not found"
  notFound,

  /// 403. Headline: "Access restricted"
  permission,

  /// Generic catch-all. Headline: "Something went wrong"
  generic,
}

/// Layout variant of [HumaxErrorState].
enum HumaxErrorVariant {
  /// Full-page error — centered, replaces entire page body.
  pageLevelFull,

  /// Section-level — inline, compact icon + headline + optional retry.
  sectionLevel,

  /// Minimal — single text line + retry link.
  inlineRetry,
}

// ── Default copy per error type ───────────────────────────────────────────────

String _defaultHeadline(HumaxErrorType type) {
  switch (type) {
    case HumaxErrorType.network:    return 'No internet connection';
    case HumaxErrorType.server:     return 'Something went wrong';
    case HumaxErrorType.notFound:   return 'Page not found';
    case HumaxErrorType.permission: return 'Access restricted';
    case HumaxErrorType.generic:    return 'Something went wrong';
  }
}

String _defaultBody(HumaxErrorType type) {
  switch (type) {
    case HumaxErrorType.network:
      return 'Check your connection and try again.';
    case HumaxErrorType.server:
      return 'We\'re having trouble on our end. Try again in a moment.';
    case HumaxErrorType.notFound:
      return 'This page doesn\'t exist or has been moved.';
    case HumaxErrorType.permission:
      return 'You don\'t have permission to view this.';
    case HumaxErrorType.generic:
      return 'An unexpected error occurred.';
  }
}

IconData _defaultIcon(HumaxErrorType type) {
  switch (type) {
    case HumaxErrorType.network:    return Icons.wifi_off_outlined;
    case HumaxErrorType.server:     return Icons.error_outline;
    case HumaxErrorType.notFound:   return Icons.search_off_outlined;
    case HumaxErrorType.permission: return Icons.lock_outline;
    case HumaxErrorType.generic:    return Icons.error_outline;
  }
}

String _defaultActionLabel(HumaxErrorType type) {
  switch (type) {
    case HumaxErrorType.network:
    case HumaxErrorType.server:
    case HumaxErrorType.generic:    return 'Try again';
    case HumaxErrorType.notFound:   return 'Go home';
    case HumaxErrorType.permission: return 'Go back';
  }
}

// ── Widget ────────────────────────────────────────────────────────────────────

/// A token-driven error state widget satisfying the Humax ErrorState contract.
///
/// ```dart
/// // Page-level network error with retry
/// HumaxErrorState(
///   type: HumaxErrorType.network,
///   onRetry: () => context.read<MyBloc>().add(RetryEvent()),
///   isRetrying: state.isLoading,
/// )
///
/// // Custom copy
/// HumaxErrorState(
///   type: HumaxErrorType.server,
///   headline: 'Oops, lost the data',
///   body: 'Our servers are catching up. Please try again.',
///   onRetry: _reload,
/// )
/// ```
///
/// **Accessibility:** wrapped in [Semantics] with `liveRegion: true` so
/// screen readers announce the error when it appears. Retry button has a
/// minimum 48 dp touch target.
class HumaxErrorState extends StatelessWidget {
  const HumaxErrorState({
    super.key,
    this.type = HumaxErrorType.generic,
    this.variant = HumaxErrorVariant.pageLevelFull,
    this.headline,
    this.body,
    this.actionLabel,
    this.onRetry,
    this.isRetrying = false,
  });

  /// Semantic error type. Drives default copy and icon.
  final HumaxErrorType type;

  /// Layout variant. Defaults to [HumaxErrorVariant.pageLevelFull].
  final HumaxErrorVariant variant;

  /// Override for the headline. Defaults to the canonical copy for [type].
  final String? headline;

  /// Override for the body text. Defaults to the canonical copy for [type].
  final String? body;

  /// Override for the action button label.
  final String? actionLabel;

  /// Retry / primary action callback. When `null`, no action button is shown.
  final VoidCallback? onRetry;

  /// When `true`, the action button shows a loading spinner.
  final bool isRetrying;

  String get _headline => headline ?? _defaultHeadline(type);
  String get _body     => body     ?? _defaultBody(type);
  String get _action   => actionLabel ?? _defaultActionLabel(type);

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Semantics(
      liveRegion: true,
      child: switch (variant) {
        HumaxErrorVariant.pageLevelFull  => _buildFull(c),
        HumaxErrorVariant.sectionLevel   => _buildSection(c),
        HumaxErrorVariant.inlineRetry    => _buildInline(c),
      },
    );
  }

  Widget _buildFull(HumaxColorScheme c) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(HumaxSpace.xxl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              _defaultIcon(type),
              size: 48,
              color: c.feedbackErrorText,
            ),
            const SizedBox(height: HumaxSpace.xl),
            Text(
              _headline,
              style: HumaxTextStyle.titleLarge
                  .copyWith(color: c.textPrimary),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: HumaxSpace.xs),
            Text(
              _body,
              style: HumaxTextStyle.bodyCommon
                  .copyWith(color: c.textSecondary),
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: HumaxSpace.xxl),
              HumaxButton(
                label: _action,
                onPressed: isRetrying ? null : onRetry,
                isLoading: isRetrying,
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildSection(HumaxColorScheme c) {
    return Padding(
      padding: const EdgeInsets.all(HumaxSpace.m),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(
            _defaultIcon(type),
            size: 24,
            color: c.feedbackErrorText,
          ),
          const SizedBox(width: HumaxSpace.xs),
          Expanded(
            child: Text(
              _headline,
              style: HumaxTextStyle.bodyPoint
                  .copyWith(color: c.textPrimary),
            ),
          ),
          if (onRetry != null)
            HumaxButton(
              label: _action,
              onPressed: isRetrying ? null : onRetry,
              isLoading: isRetrying,
              size: HumaxButtonSize.sm,
              variant: HumaxButtonVariant.text,
            ),
        ],
      ),
    );
  }

  Widget _buildInline(HumaxColorScheme c) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          '$_headline ',
          style: HumaxTextStyle.captionCommon.copyWith(color: c.textSecondary),
        ),
        if (onRetry != null)
          GestureDetector(
            onTap: isRetrying ? null : onRetry,
            child: Text(
              _action,
              style: HumaxTextStyle.captionCommon.copyWith(
                color: c.actionPrimaryDefault,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
      ],
    );
  }
}
