// ignore_for_file: library_private_types_in_public_api
import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import 'button.dart';

/// Internal styling helpers for HumaxButton.
/// Not part of the public API — import button.dart instead.
class HumaxButtonStyles {
  HumaxButtonStyles._();

  // ── Background ─────────────────────────────────────────────────────────────

  static Color backgroundFor(
      HumaxButtonVariant variant, Set<MaterialState> states) {
    final disabled = states.contains(MaterialState.disabled);
    final pressed  = states.contains(MaterialState.pressed);
    final hovered  = states.contains(MaterialState.hovered);

    switch (variant) {
      case HumaxButtonVariant.filled:
        if (disabled) return HumaxColors.actionPrimaryDisabled;
        if (pressed)  return HumaxColors.actionPrimaryActive;
        if (hovered)  return HumaxColors.actionPrimaryHover;
        return HumaxColors.actionPrimaryDefault;

      case HumaxButtonVariant.outlined:
        if (disabled) return HumaxColors.actionSecondaryDisabled;
        if (pressed)  return HumaxColors.actionSecondaryActive;
        if (hovered)  return HumaxColors.actionSecondaryHover;
        return HumaxColors.actionSecondaryDefault;

      case HumaxButtonVariant.text:
        if (disabled) return HumaxColors.actionGhostDisabled;
        if (pressed)  return HumaxColors.actionGhostActive;
        if (hovered)  return HumaxColors.actionGhostHover;
        return HumaxColors.actionGhostDefault;

      case HumaxButtonVariant.destructive:
        if (disabled) return HumaxColors.actionDestructiveDisabled;
        if (pressed)  return HumaxColors.actionDestructiveActive;
        if (hovered)  return HumaxColors.actionDestructiveHover;
        return HumaxColors.actionDestructiveDefault;
    }
  }

  // ── Foreground ─────────────────────────────────────────────────────────────

  static Color foregroundFor(
      HumaxButtonVariant variant, Set<MaterialState> states) {
    final disabled = states.contains(MaterialState.disabled);

    switch (variant) {
      case HumaxButtonVariant.filled:
        return disabled
            ? HumaxColors.actionPrimaryDisabledText
            : HumaxColors.actionPrimaryText;
      case HumaxButtonVariant.outlined:
        return disabled
            ? HumaxColors.actionSecondaryDisabledText
            : HumaxColors.actionSecondaryText;
      case HumaxButtonVariant.text:
        return disabled
            ? HumaxColors.actionGhostDisabledText
            : HumaxColors.actionGhostText;
      case HumaxButtonVariant.destructive:
        return disabled
            ? HumaxColors.actionDestructiveDisabledText
            : HumaxColors.actionDestructiveText;
    }
  }

  // ── Border ─────────────────────────────────────────────────────────────────

  static BorderSide borderFor(
      HumaxButtonVariant variant, Set<MaterialState> states) {
    if (variant != HumaxButtonVariant.outlined) return BorderSide.none;

    final disabled = states.contains(MaterialState.disabled);
    final pressed  = states.contains(MaterialState.pressed);
    final hovered  = states.contains(MaterialState.hovered);

    final color = disabled
        ? HumaxColors.actionSecondaryBorderDisabled
        : pressed
            ? HumaxColors.actionSecondaryBorderActive
            : hovered
                ? HumaxColors.actionSecondaryBorderHover
                : HumaxColors.actionSecondaryBorder;

    return BorderSide(color: color, width: 1);
  }

  // ── Padding ────────────────────────────────────────────────────────────────

  static EdgeInsets paddingFor(HumaxButtonSize size) {
    switch (size) {
      case HumaxButtonSize.sm:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.sm, vertical: HumaxSpace.xs);
      case HumaxButtonSize.md:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.md, vertical: HumaxSpace.sm);
      case HumaxButtonSize.lg:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.lg, vertical: HumaxSpace.md);
    }
  }

  // ── Text style ─────────────────────────────────────────────────────────────

  static TextStyle textStyleFor(HumaxButtonSize size) {
    switch (size) {
      case HumaxButtonSize.sm: return HumaxTextStyle.captionPoint;
      case HumaxButtonSize.md: return HumaxTextStyle.bodyPoint;
      case HumaxButtonSize.lg: return HumaxTextStyle.bodyCommon;
    }
  }

  // ── Spinner size ───────────────────────────────────────────────────────────

  static double spinnerSizeFor(HumaxButtonSize size) {
    switch (size) {
      case HumaxButtonSize.sm: return 14;
      case HumaxButtonSize.md: return 16;
      case HumaxButtonSize.lg: return 18;
    }
  }

  // ── Assembled ButtonStyle ──────────────────────────────────────────────────

  static ButtonStyle styleFor(HumaxButtonVariant variant, HumaxButtonSize size) {
    return ButtonStyle(
      backgroundColor: MaterialStateProperty.resolveWith(
          (s) => backgroundFor(variant, s)),
      foregroundColor: MaterialStateProperty.resolveWith(
          (s) => foregroundFor(variant, s)),
      overlayColor: MaterialStateProperty.all(Colors.transparent),
      elevation: MaterialStateProperty.all(0),
      shadowColor: MaterialStateProperty.all(Colors.transparent),
      padding: MaterialStateProperty.all(paddingFor(size)),
      minimumSize: MaterialStateProperty.all(const Size(0, 0)),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      shape: MaterialStateProperty.resolveWith(
        (s) => RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(HumaxRadius.md),
          side: borderFor(variant, s),
        ),
      ),
      animationDuration: HumaxDuration.fast,
    );
  }
}
