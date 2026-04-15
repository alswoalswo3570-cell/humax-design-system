import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

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

  WidgetStateProperty<Color?> _trackColor(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return c.borderSubtle;
      }
      if (states.contains(WidgetState.selected)) {
        return c.actionPrimaryDefault;
      }
      return c.borderDefault;
    });
  }

  WidgetStateProperty<Color?> _thumbColor(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return c.textTertiary;
      }
      if (states.contains(WidgetState.selected)) {
        return c.backgroundSurface;
      }
      return c.textSecondary;
    });
  }

  WidgetStateProperty<Icon?>? _thumbIconFor(HumaxColorScheme c) {
    if (!showThumbIcon) return null;
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return Icon(Icons.check, size: 14, color: c.actionPrimaryDefault);
      }
      return Icon(Icons.close, size: 14, color: c.textTertiary);
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Semantics(
      label: semanticsLabel ?? label,
      child: SwitchListTile(
        value: value,
        onChanged: onChanged,
        trackColor: _trackColor(c),
        thumbColor: _thumbColor(c),
        thumbIcon: _thumbIconFor(c),
        trackOutlineColor: WidgetStateProperty.all(Colors.transparent),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) {
            return c.actionPrimaryDefault.withOpacity(0.08);
          }
          if (states.contains(WidgetState.focused)) {
            return c.actionPrimaryDefault.withOpacity(0.12);
          }
          return Colors.transparent;
        }),
        title: Text(
          label,
          style: HumaxTextStyle.bodyCommon.copyWith(
            color: onChanged == null ? c.textTertiary : c.textPrimary,
          ),
        ),
        subtitle: subtitle != null
            ? Text(
                subtitle!,
                style: HumaxTextStyle.captionCommon
                    .copyWith(color: c.textSecondary),
              )
            : null,
      ),
    );
  }
}
