import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../components/button/button.dart';

/// Size variant of [HumaxEmptyState].
enum HumaxEmptyStateSize {
  /// For small containers (list sections, cards).
  compact,

  /// Default — for page-level empty states.
  standard,
}

/// A token-driven empty state widget that satisfies the Humax EmptyState contract.
///
/// ```dart
/// // No items yet
/// HumaxEmptyState(
///   icon: Icons.inbox_outlined,
///   headline: 'No messages yet',
///   body: 'When you receive messages, they\'ll appear here.',
/// )
///
/// // Actionable empty state
/// HumaxEmptyState(
///   icon: Icons.devices_outlined,
///   headline: 'No devices connected',
///   body: 'Add your first device to get started.',
///   primaryActionLabel: 'Add device',
///   onPrimaryAction: () => navigateToAddDevice(),
/// )
/// ```
///
/// **Accessibility:** headline and body are readable by screen readers.
/// Icon is excluded from semantics if [iconSemantics] is not provided.
class HumaxEmptyState extends StatelessWidget {
  const HumaxEmptyState({
    super.key,
    required this.headline,
    this.icon,
    this.illustration,
    this.body,
    this.primaryActionLabel,
    this.onPrimaryAction,
    this.secondaryActionLabel,
    this.onSecondaryAction,
    this.size = HumaxEmptyStateSize.standard,
    this.iconSemantics,
  });

  /// Short (≤ 5 words) statement of the empty situation.
  final String headline;

  /// Icon to display. Ignored if [illustration] is provided.
  final IconData? icon;

  /// Custom illustration widget (SVG, Lottie, etc.).
  /// When provided, [icon] is ignored.
  final Widget? illustration;

  /// Optional body text — 1–2 sentences at most.
  final String? body;

  /// Label for the primary CTA. Requires [onPrimaryAction].
  final String? primaryActionLabel;
  final VoidCallback? onPrimaryAction;

  /// Label for the secondary CTA. Requires [onSecondaryAction].
  final String? secondaryActionLabel;
  final VoidCallback? onSecondaryAction;

  /// Size variant. Defaults to [HumaxEmptyStateSize.standard].
  final HumaxEmptyStateSize size;

  /// Accessible label for the icon/illustration. If `null`, the visual is excluded from semantics.
  final String? iconSemantics;

  bool get _isCompact => size == HumaxEmptyStateSize.compact;

  double get _iconSize => _isCompact ? 24 : 48;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Visual
        if (illustration != null)
          Semantics(
            label: iconSemantics,
            excludeSemantics: iconSemantics == null,
            child: _isCompact
                ? illustration!
                : ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 200),
                    child: illustration!,
                  ),
          )
        else if (icon != null)
          Semantics(
            label: iconSemantics,
            excludeSemantics: iconSemantics == null,
            child: Icon(
              icon,
              size: _iconSize,
              color: HumaxColors.textTertiary,
            ),
          ),

        SizedBox(height: _isCompact ? HumaxSpace.sm : HumaxSpace.lg),

        // Headline
        Text(
          headline,
          style: (_isCompact ? HumaxTextStyle.bodyPoint : HumaxTextStyle.titleLarge)
              .copyWith(color: HumaxColors.textPrimary),
          textAlign: TextAlign.center,
        ),

        // Body
        if (body != null) ...[
          const SizedBox(height: HumaxSpace.sm),
          Text(
            body!,
            style: HumaxTextStyle.bodyCommon.copyWith(color: HumaxColors.textSecondary),
            textAlign: TextAlign.center,
          ),
        ],

        // Actions
        if (primaryActionLabel != null && onPrimaryAction != null) ...[
          SizedBox(height: _isCompact ? HumaxSpace.md : HumaxSpace.xl),
          HumaxButton(
            label: primaryActionLabel!,
            onPressed: onPrimaryAction,
            size: _isCompact ? HumaxButtonSize.sm : HumaxButtonSize.md,
          ),
        ],

        if (secondaryActionLabel != null && onSecondaryAction != null) ...[
          const SizedBox(height: HumaxSpace.sm),
          HumaxButton(
            label: secondaryActionLabel!,
            onPressed: onSecondaryAction,
            variant: HumaxButtonVariant.text,
            size: _isCompact ? HumaxButtonSize.sm : HumaxButtonSize.md,
          ),
        ],
      ],
    );
  }
}
