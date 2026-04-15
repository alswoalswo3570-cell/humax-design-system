import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// Inherited design-system theme for Humax widgets.
///
/// Provides a brightness-aware [HumaxColorScheme] that every Humax widget
/// reads via `context.humaxColors.*`. Without `HumaxTheme`, widgets still
/// render — they fall back to deriving the scheme from
/// `Theme.of(context).brightness` — but wrapping the app root is
/// recommended because it is cheaper than the fallback and supports
/// explicit override (e.g. dark-mode screenshots on a light device).
///
/// ```dart
/// // Explicit control — recommended
/// MaterialApp(
///   themeMode: ThemeMode.system,
///   theme: ThemeData.light(),
///   darkTheme: ThemeData.dark(),
///   builder: (context, child) {
///     final brightness = Theme.of(context).brightness;
///     return HumaxTheme(
///       colors: brightness == Brightness.dark
///           ? HumaxColorScheme.dark()
///           : HumaxColorScheme.light(),
///       child: child!,
///     );
///   },
///   home: const HomeScreen(),
/// );
///
/// // Inside any widget
/// Container(color: context.humaxColors.backgroundSurface)
/// ```
class HumaxTheme extends InheritedWidget {
  /// Creates a Humax theme that exposes [colors] to descendants.
  const HumaxTheme({
    super.key,
    required this.colors,
    required super.child,
  });

  /// The color scheme consumed by Humax widgets.
  final HumaxColorScheme colors;

  /// Returns the nearest [HumaxTheme] ancestor, or a brightness-derived
  /// fallback if none is found.
  ///
  /// Never returns `null` — widgets can always read colors safely. Prefer
  /// the [BuildContextHumaxTheme.humaxColors] extension for brevity.
  static HumaxTheme of(BuildContext context) {
    final widget =
        context.dependOnInheritedWidgetOfExactType<HumaxTheme>();
    if (widget != null) return widget;
    final brightness = Theme.of(context).brightness;
    return HumaxTheme(
      colors: brightness == Brightness.dark
          ? HumaxColorScheme.dark()
          : HumaxColorScheme.light(),
      child: const SizedBox.shrink(),
    );
  }

  /// Returns the nearest [HumaxTheme] ancestor, or `null` if none exists.
  /// Use when you want to branch on presence without a fallback.
  static HumaxTheme? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<HumaxTheme>();
  }

  @override
  bool updateShouldNotify(HumaxTheme oldWidget) => colors != oldWidget.colors;
}

/// Sugar: read the current [HumaxColorScheme] from a [BuildContext].
///
/// ```dart
/// Text('hi', style: TextStyle(color: context.humaxColors.textPrimary))
/// ```
extension BuildContextHumaxTheme on BuildContext {
  /// Current Humax color scheme. Falls back to brightness-derived scheme
  /// if no [HumaxTheme] ancestor is present.
  HumaxColorScheme get humaxColors => HumaxTheme.of(this).colors;
}
