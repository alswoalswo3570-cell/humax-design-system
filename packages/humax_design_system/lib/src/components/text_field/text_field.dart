import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// State of the text field — controls border and label color.
enum HumaxTextFieldState {
  /// Normal interactive state.
  normal,

  /// Field has an error. Shows [errorText] below and a red border.
  error,

  /// Field is read-only. User cannot edit the value.
  readOnly,
}

/// A token-driven text input widget that satisfies the Humax TextField contract.
///
/// ```dart
/// // Basic usage
/// HumaxTextField(
///   label: 'Email address',
///   hint: 'you@example.com',
///   controller: _emailController,
/// )
///
/// // Error state
/// HumaxTextField(
///   label: 'Password',
///   controller: _passwordController,
///   fieldState: HumaxTextFieldState.error,
///   errorText: 'Must be at least 8 characters',
///   obscureText: true,
/// )
/// ```
///
/// **Accessibility:** label is always visible (never replaced by placeholder).
/// `errorText` is announced as a live region via the [InputDecoration] error
/// field, which Flutter surfaces automatically to screen readers.
class HumaxTextField extends StatelessWidget {
  const HumaxTextField({
    super.key,
    required this.label,
    this.hint,
    this.helperText,
    this.errorText,
    this.controller,
    this.focusNode,
    this.fieldState = HumaxTextFieldState.normal,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.onChanged,
    this.onSubmitted,
    this.maxLines = 1,
    this.semanticsLabel,
  });

  /// Visible label above the field. Always shown — never use hint as a substitute.
  final String label;

  /// Placeholder text shown when the field is empty. Must not repeat the label.
  final String? hint;

  /// Helper text shown below the field in the normal state.
  final String? helperText;

  /// Error message shown below the field. Only displayed when [fieldState] is [HumaxTextFieldState.error].
  final String? errorText;

  final TextEditingController? controller;
  final FocusNode? focusNode;

  /// Controls border and label color. Defaults to [HumaxTextFieldState.normal].
  final HumaxTextFieldState fieldState;

  /// Whether to obscure text (for passwords).
  final bool obscureText;

  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;

  /// Defaults to 1 (single-line). Set to `null` for unlimited lines.
  final int? maxLines;

  /// Overrides the accessible name. Use when label alone is insufficient.
  final String? semanticsLabel;

  bool get _isReadOnly => fieldState == HumaxTextFieldState.readOnly;
  bool get _hasError   => fieldState == HumaxTextFieldState.error;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticsLabel ?? label,
      child: TextField(
        controller: controller,
        focusNode: focusNode,
        readOnly: _isReadOnly,
        obscureText: obscureText,
        keyboardType: keyboardType,
        textInputAction: textInputAction,
        onChanged: onChanged,
        onSubmitted: onSubmitted,
        maxLines: maxLines,
        style: HumaxTextStyle.bodyCommon.copyWith(
          color: _isReadOnly
              ? HumaxColors.textSecondary
              : HumaxColors.textPrimary,
        ),
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          helperText: helperText,
          errorText: _hasError ? errorText : null,

          // Colors
          filled: true,
          fillColor: _isReadOnly
              ? HumaxColors.backgroundSurfaceHover
              : HumaxColors.backgroundSurface,

          // Label style
          labelStyle: HumaxTextStyle.bodyPoint.copyWith(
            color: _hasError
                ? HumaxColors.feedbackErrorText
                : HumaxColors.textSecondary,
          ),
          floatingLabelStyle: HumaxTextStyle.captionPoint.copyWith(
            color: _hasError
                ? HumaxColors.feedbackErrorText
                : HumaxColors.actionPrimaryDefault,
          ),

          // Helper / error text
          helperStyle: HumaxTextStyle.captionPoint.copyWith(
            color: HumaxColors.textTertiary,
          ),
          errorStyle: HumaxTextStyle.captionPoint.copyWith(
            color: HumaxColors.feedbackErrorText,
          ),

          // Padding
          contentPadding: const EdgeInsets.symmetric(
            horizontal: HumaxSpace.md,
            vertical: HumaxSpace.sm,
          ),

          // Borders
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(color: HumaxColors.borderDefault),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(
              color: _hasError ? HumaxColors.borderError : HumaxColors.borderDefault,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(
              color: _hasError ? HumaxColors.borderError : HumaxColors.borderFocus,
              width: HumaxFocusRing.thickness,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(color: HumaxColors.borderError),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(
              color: HumaxColors.borderError,
              width: HumaxFocusRing.thickness,
            ),
          ),
          disabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(HumaxRadius.md),
            borderSide: BorderSide(color: HumaxColors.borderSubtle),
          ),
        ),
      ),
    );
  }
}
