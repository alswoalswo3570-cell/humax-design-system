import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// A token-driven switch satisfying the Humax Switch contract.
///
/// Renders a [SwitchListTile] so the full row is the touch target (≥ 48 dp).
///
/// ```dart
/// // Basic usage
/// HumaxSwitch(
///   value: _isEnabled,
///   label: 'Enable notifications',
///   onChanged: (v) => setState(() => _isEnabled = v),
/// )
///
/// // With icons on thumb
/// HumaxSwitch(
///   value: _darkMode,
///   label: 'Dark mode',
///   showThumbIcon: true,
///   onChanged: (v) => setState(() => _darkMode = v),
/// )
/// ```
///
/// **Accessibility:** screen readers announce the toggled state automatically
/// via [SwitchListTile] semantics. Disabled when [onChanged] is `null`.
class HumaxSwitch extends StatelessWidget {
  const HumaxSwitch({
    super.key,
    required this.value,
    required this.label,
    required this.onChanged,
    this.subtitle,
    this.showThumbIcon = false,
    this.semanticsLabel,
  });

  /// Whether the switch is currently on.
  final bool value;

  /// Visible label for the switch row.
  final String label;

  /// Called when the user toggles the switch. Set to `null` to disable.
  final ValueChanged<bool>? onChanged;

  /// Optional secondary text below [label].
  final String? subtitle;

  /// When `true`, shows a check icon (on) and a close icon (off) on the thumb.
  final bool showThumbIcon;

  /// Accessible name override. Defaults to [label].
  final String? semanticsLabel;

  WidgetStateProperty<Color?> get _trackColor {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return HumaxColors.borderSubtle;
      }
      if (states.contains(WidgetState.selected)) {
        return HumaxColors.actionPrimaryDefault;
      }
      return HumaxColors.borderDefault;
    });
  }

  WidgetStateProperty<Color?> get _thumbColor {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return HumaxColors.textTertiary;
      }
      if (states.contains(WidgetState.selected)) {
        return HumaxColors.backgroundSurface;
      }
      return HumaxColors.textSecondary;
    });
  }

  WidgetStateProperty<Icon?>? get _thumbIcon {
    if (!showThumbIcon) return null;
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return Icon(Icons.check, size: 14, color: HumaxColors.actionPrimaryDefault);
      }
      return Icon(Icons.close, size: 14, color: HumaxColors.textTertiary);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticsLabel ?? label,
      child: SwitchListTile(
        value: value,
        onChanged: onChanged,
        trackColor: _trackColor,
        thumbColor: _thumbColor,
        thumbIcon: _thumbIcon,
        trackOutlineColor: WidgetStateProperty.all(Colors.transparent),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) {
            return HumaxColors.actionPrimaryDefault.withOpacity(0.08);
          }
          if (states.contains(WidgetState.focused)) {
            return HumaxColors.actionPrimaryDefault.withOpacity(0.12);
          }
          return Colors.transparent;
        }),
        title: Text(
          label,
          style: HumaxTextStyle.bodyCommon.copyWith(
            color: onChanged == null
                ? HumaxColors.textTertiary
                : HumaxColors.textPrimary,
          ),
        ),
        subtitle: subtitle != null
            ? Text(
                subtitle!,
                style: HumaxTextStyle.captionCommon
                    .copyWith(color: HumaxColors.textSecondary),
              )
            : null,
      ),
    );
  }
}
