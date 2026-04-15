// ignore_for_file: library_private_types_in_public_api
import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import 'button.dart';

/// Internal styling helpers for HumaxButton.
/// Not part of the public API — import button.dart instead.
///
/// Color methods accept a [HumaxColorScheme] so that the same style helper
/// can resolve to light or dark colors depending on the enclosing
/// `HumaxTheme`. Callers read the scheme once via `context.humaxColors`
/// in `build()` and pass it to these helpers.
class HumaxButtonStyles {
  HumaxButtonStyles._();

  // ── Background ─────────────────────────────────────────────────────────────

  static Color backgroundFor(HumaxColorScheme c,
      HumaxButtonVariant variant, Set<MaterialState> states) {
    final disabled = states.contains(MaterialState.disabled);
    final pressed  = states.contains(MaterialState.pressed);
    final hovered  = states.contains(MaterialState.hovered);

    switch (variant) {
      case HumaxButtonVariant.filled:
        if (disabled) return c.actionPrimaryDisabled;
        if (pressed)  return c.actionPrimaryActive;
        if (hovered)  return c.actionPrimaryHover;
        return c.actionPrimaryDefault;

      case HumaxButtonVariant.outlined:
        if (disabled) return c.actionSecondaryDisabled;
        if (pressed)  return c.actionSecondaryActive;
        if (hovered)  return c.actionSecondaryHover;
        return c.actionSecondaryDefault;

      case HumaxButtonVariant.text:
        if (disabled) return c.actionGhostDisabled;
        if (pressed)  return c.actionGhostActive;
        if (hovered)  return c.actionGhostHover;
        return c.actionGhostDefault;

      case HumaxButtonVariant.destructive:
        if (disabled) return c.actionDestructiveDisabled;
        if (pressed)  return c.actionDestructiveActive;
        if (hovered)  return c.actionDestructiveHover;
        return c.actionDestructiveDefault;
    }
  }

  // ── Foreground ─────────────────────────────────────────────────────────────

  static Color foregroundFor(HumaxColorScheme c,
      HumaxButtonVariant variant, Set<MaterialState> states) {
    final disabled = states.contains(MaterialState.disabled);

    switch (variant) {
      case HumaxButtonVariant.filled:
        return disabled
            ? c.actionPrimaryDisabledText
            : c.actionPrimaryText;
      case HumaxButtonVariant.outlined:
        return disabled
            ? c.actionSecondaryDisabledText
            : c.actionSecondaryText;
      case HumaxButtonVariant.text:
        return disabled
            ? c.actionGhostDisabledText
            : c.actionGhostText;
      case HumaxButtonVariant.destructive:
        return disabled
            ? c.actionDestructiveDisabledText
            : c.actionDestructiveText;
    }
  }

  // ── Border ─────────────────────────────────────────────────────────────────

  static BorderSide borderFor(HumaxColorScheme c,
      HumaxButtonVariant variant, Set<MaterialState> states) {
    if (variant != HumaxButtonVariant.outlined) return BorderSide.none;

    final disabled = states.contains(MaterialState.disabled);
    final pressed  = states.contains(MaterialState.pressed);
    final hovered  = states.contains(MaterialState.hovered);

    final color = disabled
        ? c.actionSecondaryBorderDisabled
        : pressed
            ? c.actionSecondaryBorderActive
            : hovered
                ? c.actionSecondaryBorderHover
                : c.actionSecondaryBorder;

    return BorderSide(color: color, width: 1);
  }

  // ── Padding ────────────────────────────────────────────────────────────────

  static EdgeInsets paddingFor(HumaxButtonSize size) {
    switch (size) {
      case HumaxButtonSize.sm:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.xs, vertical: HumaxSpace.xxs);
      case HumaxButtonSize.md:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.m, vertical: HumaxSpace.xs);
      case HumaxButtonSize.lg:
        return const EdgeInsets.symmetric(
            horizontal: HumaxSpace.xl, vertical: HumaxSpace.m);
    }
  }

  // ── Text style ─────────────────────────────────────────────────────────────

  static TextStyle textStyleFor(HumaxButtonSize size) {
    switch (size) {
      case HumaxButtonSize.sm: return HumaxTextStyle.captionPoint;  // 12px/500
      case HumaxButtonSize.md: return HumaxTextStyle.titleSmall;    // 16px/700 — Moni primary button spec
      case HumaxButtonSize.lg: return HumaxTextStyle.titleSmall;    // 16px/700 — same spec, larger padding
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

  static ButtonStyle styleFor(HumaxColorScheme c,
      HumaxButtonVariant variant, HumaxButtonSize size) {
    return ButtonStyle(
      backgroundColor: MaterialStateProperty.resolveWith(
          (s) => backgroundFor(c, variant, s)),
      foregroundColor: MaterialStateProperty.resolveWith(
          (s) => foregroundFor(c, variant, s)),
      overlayColor: MaterialStateProperty.all(Colors.transparent),
      elevation: MaterialStateProperty.all(0),
      shadowColor: MaterialStateProperty.all(Colors.transparent),
      padding: MaterialStateProperty.all(paddingFor(size)),
      minimumSize: MaterialStateProperty.all(const Size(0, 0)),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      shape: MaterialStateProperty.resolveWith(
        (s) => RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(HumaxRadius.md),
          side: borderFor(c, variant, s),
        ),
      ),
      animationDuration: HumaxDuration.fast,
    );
  }
}
