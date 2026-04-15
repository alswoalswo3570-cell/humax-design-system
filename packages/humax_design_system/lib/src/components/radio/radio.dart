import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

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

  WidgetStateProperty<Color?> _fillColor(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return c.textTertiary.withOpacity(0.4);
      }
      if (states.contains(WidgetState.selected)) {
        return c.actionPrimaryDefault;
      }
      return c.borderDefault;
    });
  }

  WidgetStateProperty<Color?> _overlayColor(HumaxColorScheme c) {
    return WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.pressed)) {
        return c.actionPrimaryDefault.withOpacity(0.08);
      }
      if (states.contains(WidgetState.focused)) {
        return c.actionPrimaryDefault.withOpacity(0.12);
      }
      return Colors.transparent;
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
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
            activeColor: c.actionPrimaryDefault,
            fillColor: _fillColor(c),
            overlayColor: _overlayColor(c),
            title: Text(
              option.label,
              style: HumaxTextStyle.bodyCommon.copyWith(
                color: onChanged == null ? c.textTertiary : c.textPrimary,
              ),
            ),
            subtitle: option.subtitle != null
                ? Text(
                    option.subtitle!,
                    style: HumaxTextStyle.captionCommon
                        .copyWith(color: c.textSecondary),
                  )
                : null,
            controlAffinity: ListTileControlAffinity.leading,
          ),
        );
      }).toList(),
    );
  }
}
