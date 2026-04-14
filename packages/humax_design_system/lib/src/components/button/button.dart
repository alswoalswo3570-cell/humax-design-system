import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '_styles.dart';

/// Visual style of the button.
///
/// Contract: contracts/flutter/button.contract.json → variants
enum HumaxButtonVariant {
  /// Solid primary background. Use for the primary action on a screen.
  filled,

  /// Bordered, light background. Use for secondary actions alongside a filled button.
  outlined,

  /// No background, tinted label. Use for tertiary or low-emphasis actions.
  text,

  /// Solid red background. Use for irreversible destructive actions (delete, remove).
  destructive,
}

/// Size of the button.
///
/// Contract: contracts/flutter/button.contract.json → sizes
enum HumaxButtonSize {
  /// Small — use in dense UIs, table rows, or chip-like contexts.
  sm,

  /// Medium (default) — standard touch-target button.
  md,

  /// Large — use for primary CTAs on full-page forms or onboarding screens.
  lg,
}

/// A token-driven button widget that satisfies the Humax Button contract.
///
/// ```dart
/// // Primary action
/// HumaxButton(label: 'Save changes', onPressed: _save)
///
/// // Destructive action
/// HumaxButton(
///   label: 'Delete account',
///   variant: HumaxButtonVariant.destructive,
///   onPressed: _deleteAccount,
/// )
///
/// // Loading state (disables interaction, shows spinner)
/// HumaxButton(label: 'Saving…', onPressed: _save, isLoading: true)
/// ```
///
/// **Accessibility:** wraps child in [Semantics] with `button: true`.
/// Pass [semanticsLabel] to override the accessible name when the visible
/// label is not sufficiently descriptive (e.g., icon-only buttons).
class HumaxButton extends StatelessWidget {
  const HumaxButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = HumaxButtonVariant.filled,
    this.size = HumaxButtonSize.md,
    this.isLoading = false,
    this.leadingIcon,
    this.semanticsLabel,
  });

  /// Visible label text. Should be a verb phrase (e.g., 'Save', 'Delete account').
  final String label;

  /// Called when the button is tapped. Pass `null` to disable the button.
  final VoidCallback? onPressed;

  /// Visual variant. Defaults to [HumaxButtonVariant.filled].
  final HumaxButtonVariant variant;

  /// Size variant. Defaults to [HumaxButtonSize.md].
  final HumaxButtonSize size;

  /// When `true`, interaction is disabled and a spinner replaces the label.
  final bool isLoading;

  /// Optional leading icon placed to the left of [label].
  final Widget? leadingIcon;

  /// Overrides the accessible name. Use when label alone is insufficient.
  final String? semanticsLabel;

  bool get _isDisabled => onPressed == null;

  Widget _buildChild() {
    final textStyle = HumaxButtonStyles.textStyleFor(size);

    if (isLoading) {
      final spinnerSize = HumaxButtonStyles.spinnerSizeFor(size);
      final spinnerColor =
          HumaxButtonStyles.foregroundFor(variant, const <MaterialState>{});
      return SizedBox(
        width: spinnerSize,
        height: spinnerSize,
        child: CircularProgressIndicator.adaptive(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(spinnerColor),
        ),
      );
    }

    if (leadingIcon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          leadingIcon!,
          const SizedBox(width: HumaxSpace.xs),
          Text(label, style: textStyle),
        ],
      );
    }

    return Text(label, style: textStyle);
  }

  @override
  Widget build(BuildContext context) {
    // Disable interaction when loading or when onPressed is null.
    final effectiveOnPressed =
        (isLoading || _isDisabled) ? null : onPressed;

    final style = HumaxButtonStyles.styleFor(variant, size);
    final child = _buildChild();

    final button = switch (variant) {
      HumaxButtonVariant.filled ||
      HumaxButtonVariant.destructive =>
        FilledButton(onPressed: effectiveOnPressed, style: style, child: child),
      HumaxButtonVariant.outlined =>
        OutlinedButton(onPressed: effectiveOnPressed, style: style, child: child),
      HumaxButtonVariant.text =>
        TextButton(onPressed: effectiveOnPressed, style: style, child: child),
    };

    return Semantics(
      label: semanticsLabel ?? label,
      button: true,
      enabled: !_isDisabled && !isLoading,
      excludeSemantics: true,
      child: button,
    );
  }
}
