import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// A single radio option within a [HumaxRadioGroup].
class HumaxRadioOption<T> {
  const HumaxRadioOption({
    required this.value,
    required this.label,
    this.subtitle,
    this.semanticsLabel,
  });

  /// The value this option represents. Compared against [HumaxRadioGroup.value].
  final T value;

  /// Visible label for the option row.
  final String label;

  /// Optional secondary text below [label].
  final String? subtitle;

  /// Accessible name override. Defaults to [label].
  final String? semanticsLabel;
}

/// A token-driven radio group satisfying the Humax Radio contract.
///
/// Renders each option as a [RadioListTile] for full-row 48 dp touch targets.
///
/// ```dart
/// HumaxRadioGroup<String>(
///   value: _selected,
///   onChanged: (v) => setState(() => _selected = v),
///   options: const [
///     HumaxRadioOption(value: 'hdmi', label: 'HDMI'),
///     HumaxRadioOption(value: 'usb', label: 'USB-C'),
///     HumaxRadioOption(value: 'optical', label: 'Optical'),
///   ],
/// )
/// ```
///
/// Disable the entire group by setting [onChanged] to `null`.
///
/// **Accessibility:** each row announces label + selected state to screen readers.
class HumaxRadioGroup<T> extends StatelessWidget {
  const HumaxRadioGroup({
    super.key,
    required this.value,
    required this.onChanged,
    required this.options,
  });

  /// The currently selected value.
  final T? value;

  /// Called when the user selects a new option. Set to `null` to disable.
  final ValueChanged<T?>? onChanged;

  /// Options to display.
  final List<HumaxRadioOption<T>> options;

  WidgetStateProperty<Color?> get _fillColor {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return HumaxColors.textTertiary.withOpacity(0.4);
      }
      if (states.contains(WidgetState.selected)) {
        return HumaxColors.actionPrimaryDefault;
      }
      return HumaxColors.borderDefault;
    });
  }

  WidgetStateProperty<Color?> get _overlayColor {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.pressed)) {
        return HumaxColors.actionPrimaryDefault.withOpacity(0.08);
      }
      if (states.contains(WidgetState.focused)) {
        return HumaxColors.actionPrimaryDefault.withOpacity(0.12);
      }
      return Colors.transparent;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: options.map((option) {
        final isSelected = option.value == value;
        return Semantics(
          label: option.semanticsLabel ?? option.label,
          child: RadioListTile<T>(
            value: option.value,
            groupValue: value,
            onChanged: onChanged,
            selected: isSelected,
            activeColor: HumaxColors.actionPrimaryDefault,
            fillColor: _fillColor,
            overlayColor: _overlayColor,
            title: Text(
              option.label,
              style: HumaxTextStyle.bodyMd.copyWith(
                color: onChanged == null
                    ? HumaxColors.textTertiary
                    : HumaxColors.textPrimary,
              ),
            ),
            subtitle: option.subtitle != null
                ? Text(
                    option.subtitle!,
                    style: HumaxTextStyle.bodySm
                        .copyWith(color: HumaxColors.textSecondary),
                  )
                : null,
            controlAffinity: ListTileControlAffinity.leading,
          ),
        );
      }).toList(),
    );
  }
}
