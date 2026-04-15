import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';
import '../button/button.dart';

/// Variant of [HumaxDialog].
enum HumaxDialogVariant {
  /// Standard informational alert — dismissible, single confirm action.
  alert,

  /// Destructive confirmation — warns the user before an irreversible action.
  /// Sets `barrierDismissible: false` and renders the confirm button as
  /// [HumaxButtonVariant.destructive].
  destructive,
}

/// A token-driven dialog satisfying the Humax Dialog contract.
///
/// Wraps [showDialog] + [AlertDialog] with token-bound styling.
///
/// ```dart
/// // Informational alert
/// HumaxDialog.show(
///   context: context,
///   title: 'Update available',
///   content: 'A new firmware version is ready to install.',
///   confirmLabel: 'Install now',
///   onConfirm: () => installUpdate(),
/// );
///
/// // Destructive confirmation — cannot be dismissed by tapping outside
/// HumaxDialog.show(
///   context: context,
///   variant: HumaxDialogVariant.destructive,
///   title: 'Delete account?',
///   content: 'This action permanently removes all your data and cannot be undone.',
///   confirmLabel: 'Delete',
///   cancelLabel: 'Cancel',
///   onConfirm: () => deleteAccount(),
/// );
/// ```
///
/// **Accessibility:** role is `alertdialog`. Focus moves to the primary action
/// when the dialog opens.
abstract class HumaxDialog {
  HumaxDialog._();

  /// Shows a Humax dialog.
  ///
  /// Returns `true` if the user confirmed, `false` if cancelled, or `null`
  /// if the dialog was dismissed by tapping outside (alert variant only).
  static Future<bool?> show({
    required BuildContext context,
    required String content,
    String? title,
    String confirmLabel = 'OK',
    String? cancelLabel,
    VoidCallback? onConfirm,
    VoidCallback? onCancel,
    HumaxDialogVariant variant = HumaxDialogVariant.alert,
  }) {
    final isDestructive = variant == HumaxDialogVariant.destructive;

    return showDialog<bool>(
      context: context,
      barrierDismissible: !isDestructive,
      barrierColor: context.humaxColors.backgroundOverlay,
      builder: (ctx) => _HumaxDialogWidget(
        title: title,
        content: content,
        confirmLabel: confirmLabel,
        cancelLabel: cancelLabel,
        onConfirm: onConfirm,
        onCancel: onCancel,
        variant: variant,
      ),
    );
  }
}

class _HumaxDialogWidget extends StatelessWidget {
  const _HumaxDialogWidget({
    required this.content,
    required this.confirmLabel,
    required this.variant,
    this.title,
    this.cancelLabel,
    this.onConfirm,
    this.onCancel,
  });

  final String? title;
  final String content;
  final String confirmLabel;
  final String? cancelLabel;
  final VoidCallback? onConfirm;
  final VoidCallback? onCancel;
  final HumaxDialogVariant variant;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    final isDestructive = variant == HumaxDialogVariant.destructive;

    return AlertDialog(
      backgroundColor: c.backgroundSurface,
      surfaceTintColor: Colors.transparent,
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(HumaxRadius.xl),
      ),
      title: title != null
          ? Text(
              title!,
              style: HumaxTextStyle.titleLarge
                  .copyWith(color: c.textPrimary),
            )
          : null,
      content: Text(
        content,
        style: HumaxTextStyle.bodyCommon.copyWith(color: c.textSecondary),
      ),
      actionsPadding: const EdgeInsets.fromLTRB(
        HumaxSpace.m,
        HumaxSpace.xxs,
        HumaxSpace.m,
        HumaxSpace.m,
      ),
      actions: [
        if (cancelLabel != null)
          HumaxButton(
            label: cancelLabel!,
            variant: HumaxButtonVariant.text,
            onPressed: () {
              Navigator.of(context).pop(false);
              onCancel?.call();
            },
          ),
        HumaxButton(
          label: confirmLabel,
          variant: isDestructive
              ? HumaxButtonVariant.destructive
              : HumaxButtonVariant.filled,
          onPressed: () {
            Navigator.of(context).pop(true);
            onConfirm?.call();
          },
        ),
      ],
    );
  }
}
