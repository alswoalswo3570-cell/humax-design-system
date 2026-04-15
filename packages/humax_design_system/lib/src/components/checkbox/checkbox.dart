import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

/// A token-driven checkbox satisfying the Humax Checkbox contract.
///
/// Renders a [CheckboxListTile] so the full row is the touch target (≥ 48 dp).
///
/// ```dart
/// // Basic usage
/// HumaxCheckbox(
///   value: _checked,
///   label: 'Accept Terms and Conditions',
///   onChanged: (v) => setState(() => _checked = v ?? false),
/// )
///
/// // Tristate (indeterminate)
/// HumaxCheckbox(
///   value: _partial,  // null = indeterminate
///   label: 'Select all',
///   tristate: true,
///   onChanged: (v) => setState(() => _partial = v),
/// )
///
/// // Error state
/// HumaxCheckbox(
///   value: false,
///   label: 'Required field',
///   isError: true,
///   onChanged: (v) => setState(() => _checked = v ?? false),
/// )
/// ```
///
/// **Accessibility:** screen readers announce checked/unchecked/mixed via the
/// [CheckboxListTile] semantics. Disabled when [onChanged] is `null`.
class HumaxCheckbox extends StatelessWidget {
  const HumaxCheckbox({
    super.key,
    required this.label,
    required this.value,
    required this.onChanged,
    this.tristate = false,
    this.isError = false,
    this.subtitle,
    this.semanticsLabel,
    this.controlAffinity = ListTileControlAffinity.leading,
  });

  /// Whether the checkbox is checked.
  /// When [tristate] is `true`, `null` represents the indeterminate state.
  final bool? value;

  /// Visible label for the checkbox row.
  final String label;

  /// Called when the user toggles the checkbox. Set to `null` to disable.
  final ValueChanged<bool?>? onChanged;

  /// When `true`, allows [value] to be `null` (indeterminate / mixed state).
  final bool tristate;

  /// When `true`, renders the checkbox border in the error color.
  final bool isError;

  /// Optional secondary line of text below [label].
  final String? subtitle;

  /// Accessible name override. Defaults to [label].
  final String? semanticsLabel;

  /// Controls whether the checkbox appears on the leading or trailing side.
  final ListTileControlAffinity controlAffinity;

  /// Token-bound fill color per state.
  WidgetStateProperty<Color?> _fillColor(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return c.textTertiary.withOpacity(0.4);
      }
      if (states.contains(WidgetState.selected)) {
        return c.actionPrimaryDefault;
      }
      return Colors.transparent;
    });
  }

  /// Token-bound side (border) per state.
  WidgetStateProperty<BorderSide> _side(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return BorderSide(color: c.borderSubtle);
      }
      if (isError) {
        return BorderSide(color: c.feedbackErrorText, width: 2);
      }
      if (states.contains(WidgetState.selected)) {
        return BorderSide(color: c.actionPrimaryDefault, width: 2);
      }
      return BorderSide(color: c.borderDefault);
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Semantics(
      label: semanticsLabel ?? label,
      child: CheckboxListTile(
        value: value,
        onChanged: onChanged,
        tristate: tristate,
        controlAffinity: controlAffinity,
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
        fillColor: _fillColor(c),
        checkColor: c.actionPrimaryText,
        side: _side(c),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(HumaxRadius.sm),
        ),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) {
            return c.actionPrimaryDefault.withOpacity(0.08);
          }
          if (states.contains(WidgetState.focused)) {
            return c.actionPrimaryDefault.withOpacity(0.12);
          }
          return Colors.transparent;
        }),
      ),
    );
  }
}
