import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// Variant of [HumaxSnackBar].
///
/// Contract: contracts/flutter/snack_bar.contract.json → variants
enum HumaxSnackBarVariant {
  /// Neutral / success feedback. Dark background, inverse text.
  defaultVariant,

  /// Error / failure feedback. Destructive background.
  error,
}

/// Shows a token-driven snack bar via [ScaffoldMessenger].
///
/// Wraps [ScaffoldMessenger.showSnackBar] with Humax token defaults:
/// - Floating behavior
/// - `HumaxRadius.md` rounded corners
/// - Minimum 4 s duration (10 s when an action is present)
/// - Optional close icon
///
/// ```dart
/// // Success
/// HumaxSnackBar.show(
///   context: context,
///   message: 'Settings saved',
/// );
///
/// // With undo action
/// HumaxSnackBar.show(
///   context: context,
///   message: 'Item archived',
///   actionLabel: 'Undo',
///   onAction: () => restoreItem(),
/// );
///
/// // Error
/// HumaxSnackBar.show(
///   context: context,
///   message: 'Failed to connect. Try again.',
///   variant: HumaxSnackBarVariant.error,
/// );
/// ```
///
/// **Accessibility:** message is announced by screen readers when shown.
/// Duration is at least 4 000 ms for readable text; 10 000 ms when an action
/// is present so keyboard users can reach it.
abstract class HumaxSnackBar {
  HumaxSnackBar._();

  /// Shows a floating snack bar with Humax token defaults.
  static ScaffoldFeatureController<SnackBar, SnackBarClosedReason> show({
    required BuildContext context,
    required String message,
    HumaxSnackBarVariant variant = HumaxSnackBarVariant.defaultVariant,
    String? actionLabel,
    VoidCallback? onAction,
    bool showCloseIcon = false,
    Duration? duration,
  }) {
    final hasAction = actionLabel != null && onAction != null;
    final effectiveDuration = duration ??
        (hasAction
            ? const Duration(milliseconds: 10000)
            : const Duration(milliseconds: 4000));

    final isError = variant == HumaxSnackBarVariant.error;

    final backgroundColor = isError
        ? HumaxColors.feedbackErrorBg
        : HumaxColors.backgroundInverse;

    final textColor = isError
        ? HumaxColors.feedbackErrorText
        : HumaxColors.textInverse;

    final actionTextColor = isError
        ? HumaxColors.textInverse
        : HumaxColors.actionPrimaryDefault;

    final snackBar = SnackBar(
      behavior: SnackBarBehavior.floating,
      backgroundColor: backgroundColor,
      elevation: 4,
      duration: effectiveDuration,
      showCloseIcon: showCloseIcon,
      closeIconColor: textColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(HumaxRadius.md),
      ),
      padding: const EdgeInsets.symmetric(
        horizontal: HumaxSpace.md,
        vertical: HumaxSpace.sm,
      ),
      content: Text(
        message,
        style: HumaxTextStyle.bodySm.copyWith(color: textColor),
      ),
      action: hasAction
          ? SnackBarAction(
              label: actionLabel!,
              textColor: actionTextColor,
              onPressed: onAction!,
            )
          : null,
    );

    return ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
