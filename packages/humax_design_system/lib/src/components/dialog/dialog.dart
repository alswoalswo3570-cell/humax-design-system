import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

/// Semantic variant that controls icon color and title color.
enum HumaxDialogVariant {
  /// Neutral / informational — title uses [HumaxColorScheme.textPrimary].
  info,

  /// Destructive / error — title uses the danger red
  /// ([HumaxColorScheme.actionDestructiveDefault]).
  error,

  /// Positive outcome — title uses the success green
  /// ([HumaxColorScheme.feedbackSuccessBorder]).
  success,

  /// Cautionary — title uses the warning amber
  /// ([HumaxColorScheme.feedbackWarningBorder]).
  warning,
}

/// Moni-spec dialog widget.
///
/// Wraps [showDialog] with a custom-layout panel that matches the Figma
/// spec: colored title, 32 × 32 icon slot, flat action row with a vertical
/// divider between two actions (or a full-width single action).
///
/// **1-button (acknowledge):**
/// ```dart
/// HumaxDialog.show(
///   context: context,
///   variant: HumaxDialogVariant.success,
///   icon: Icon(Icons.check_circle, color: …, size: 32),
///   title: 'Success',
///   content: 'Your device has been registered.',
///   confirmLabel: 'Done',
/// );
/// ```
///
/// **2-button (confirm / cancel):**
/// ```dart
/// HumaxDialog.show(
///   context: context,
///   variant: HumaxDialogVariant.error,
///   icon: Icon(Icons.error, color: …, size: 32),
///   title: 'Sign In Error',
///   content: 'There are already registered devices. Please delete the existing device and try again.',
///   confirmLabel: 'OK',
///   cancelLabel: 'Cancel',
///   onConfirm: () => handleOk(),
///   onCancel: () => handleCancel(),
/// );
/// ```
abstract class HumaxDialog {
  HumaxDialog._();

  /// Shows the dialog and returns `true` on confirm, `false` on cancel,
  /// or `null` if dismissed by tapping the barrier (barrier is always
  /// non-dismissible — returns `null` only if `Navigator.pop()` is called
  /// with no value).
  static Future<bool?> show({
    required BuildContext context,
    required String title,
    required String content,
    Widget? icon,
    String confirmLabel = 'OK',
    String? cancelLabel,
    VoidCallback? onConfirm,
    VoidCallback? onCancel,
    HumaxDialogVariant variant = HumaxDialogVariant.info,
  }) {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      barrierColor: context.humaxColors.backgroundOverlay,
      builder: (ctx) => _HumaxDialogWidget(
        title: title,
        content: content,
        icon: icon,
        confirmLabel: confirmLabel,
        cancelLabel: cancelLabel,
        onConfirm: onConfirm,
        onCancel: onCancel,
        variant: variant,
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────

class _HumaxDialogWidget extends StatelessWidget {
  const _HumaxDialogWidget({
    required this.title,
    required this.content,
    required this.confirmLabel,
    required this.variant,
    this.icon,
    this.cancelLabel,
    this.onConfirm,
    this.onCancel,
  });

  final String title;
  final String content;
  final Widget? icon;
  final String confirmLabel;
  final String? cancelLabel;
  final VoidCallback? onConfirm;
  final VoidCallback? onCancel;
  final HumaxDialogVariant variant;

  Color _titleColor(HumaxColorScheme c) {
    switch (variant) {
      case HumaxDialogVariant.error:
        // #DC362E — Moni Figma exact match
        return c.actionDestructiveDefault;
      case HumaxDialogVariant.success:
        // #6FD94A — Moni Figma exact match (light mode)
        return c.feedbackSuccessBorder;
      case HumaxDialogVariant.warning:
        // #EAB722 — Moni Figma exact match
        return c.feedbackWarningBorder;
      case HumaxDialogVariant.info:
        return c.textPrimary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    final hasTwoActions = cancelLabel != null;

    return Dialog(
      backgroundColor: Colors.transparent,
      elevation: 0,
      // 300 dp fixed width per Moni spec; horizontal padding fills remaining space
      insetPadding: EdgeInsets.symmetric(
        horizontal: (MediaQuery.sizeOf(context).width - 300) / 2,
        vertical: 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // ── Content area ──────────────────────────────────────────────
          Container(
            padding: const EdgeInsets.all(HumaxSpace.m),
            decoration: BoxDecoration(
              color: c.backgroundSurface,
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(HumaxRadius.lg), // 8 dp
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Icon slot — 32 × 32
                if (icon != null) ...[
                  SizedBox(width: 32, height: 32, child: icon),
                  const SizedBox(height: HumaxSpace.xs),
                ],
                // Title
                Text(
                  title,
                  textAlign: TextAlign.center,
                  style: HumaxTextStyle.titleMedium.copyWith(
                    color: _titleColor(c),
                  ),
                ),
                const SizedBox(height: HumaxSpace.xs),
                // Body
                Text(
                  content,
                  textAlign: TextAlign.center,
                  style: HumaxTextStyle.bodyCommon.copyWith(
                    color: c.textPrimary,
                  ),
                ),
              ],
            ),
          ),

          // ── Horizontal divider ─────────────────────────────────────────
          Container(height: 1, color: c.borderSubtle),

          // ── Action row ─────────────────────────────────────────────────
          ClipRRect(
            borderRadius: const BorderRadius.vertical(
              bottom: Radius.circular(HumaxRadius.lg), // 8 dp
            ),
            child: hasTwoActions
                ? IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Cancel — left half
                        Expanded(
                          child: _DialogAction(
                            label: cancelLabel!,
                            color: c.textTertiary,
                            onPressed: () {
                              Navigator.of(context).pop(false);
                              onCancel?.call();
                            },
                          ),
                        ),
                        // Vertical divider between the two actions
                        VerticalDivider(
                          width: 1,
                          thickness: 1,
                          color: c.borderSubtle,
                        ),
                        // Confirm — right half
                        Expanded(
                          child: _DialogAction(
                            label: confirmLabel,
                            color: c.textPrimary,
                            onPressed: () {
                              Navigator.of(context).pop(true);
                              onConfirm?.call();
                            },
                          ),
                        ),
                      ],
                    ),
                  )
                : _DialogAction(
                    label: confirmLabel,
                    color: c.textPrimary,
                    onPressed: () {
                      Navigator.of(context).pop(true);
                      onConfirm?.call();
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────

/// Flat 56 dp tap target used inside the dialog action row.
class _DialogAction extends StatelessWidget {
  const _DialogAction({
    required this.label,
    required this.color,
    required this.onPressed,
  });

  final String label;
  final Color color;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Material(
      color: c.backgroundSurface,
      child: InkWell(
        onTap: onPressed,
        child: SizedBox(
          height: 56,
          child: Center(
            child: Text(
              label,
              style: HumaxTextStyle.titleSmall.copyWith(color: color),
            ),
          ),
        ),
      ),
    );
  }
}
