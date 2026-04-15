import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

/// A single destination entry for [HumaxNavigationBar].
///
/// Supply [icon] for the default (unselected) state.
/// Optionally supply [selectedIcon] — if omitted, [icon] is used for both.
class HumaxNavigationDestination {
  const HumaxNavigationDestination({
    required this.icon,
    required this.label,
    this.selectedIcon,
    this.semanticsLabel,
  });

  /// Icon shown when the destination is NOT selected.
  final IconData icon;

  /// Icon shown when the destination IS selected. Falls back to [icon] if null.
  final IconData? selectedIcon;

  /// Accessible label. Falls back to [label] if null.
  final String? semanticsLabel;

  /// Short text label displayed below the icon.
  final String label;
}

/// Token-driven bottom navigation bar satisfying the Humax NavigationBar contract.
///
/// Supports 2–5 destinations. For ≥ 6 destinations use a NavigationDrawer.
///
/// ```dart
/// HumaxNavigationBar(
///   selectedIndex: _currentIndex,
///   onDestinationSelected: (i) => setState(() => _currentIndex = i),
///   destinations: const [
///     HumaxNavigationDestination(icon: Icons.home_outlined, selectedIcon: Icons.home, label: 'Home'),
///     HumaxNavigationDestination(icon: Icons.search, label: 'Search'),
///     HumaxNavigationDestination(icon: Icons.person_outline, selectedIcon: Icons.person, label: 'Profile'),
///   ],
/// )
/// ```
///
/// **Accessibility:** each destination's [HumaxNavigationDestination.label] is used
/// as the semantic label. Supply [HumaxNavigationDestination.semanticsLabel] to
/// override (e.g. for icon-only items).
class HumaxNavigationBar extends StatelessWidget {
  const HumaxNavigationBar({
    super.key,
    required this.selectedIndex,
    required this.onDestinationSelected,
    required this.destinations,
  }) : assert(
          destinations.length >= 2 && destinations.length <= 5,
          'HumaxNavigationBar requires 2–5 destinations.',
        );

  /// Index of the currently selected destination.
  final int selectedIndex;

  /// Called when the user taps a destination.
  final ValueChanged<int> onDestinationSelected;

  /// 2–5 destinations.
  final List<HumaxNavigationDestination> destinations;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return NavigationBar(
      selectedIndex: selectedIndex,
      onDestinationSelected: onDestinationSelected,
      backgroundColor: c.backgroundSurface,
      surfaceTintColor: c.backgroundSurfaceHover,
      indicatorColor: c.actionPrimaryDefault,
      elevation: 3,
      labelTextStyle: WidgetStateProperty.resolveWith((states) {
        final isSelected = states.contains(WidgetState.selected);
        return HumaxTextStyle.captionPoint.copyWith(
          color: isSelected ? c.textPrimary : c.textSecondary,
          fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
        );
      }),
      iconTheme: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return IconThemeData(color: c.textTertiary, size: 24);
        }
        if (states.contains(WidgetState.selected)) {
          return IconThemeData(color: c.actionPrimaryText, size: 24);
        }
        return IconThemeData(color: c.textSecondary, size: 24);
      }),
      destinations: destinations.map((d) {
        return NavigationDestination(
          icon: Semantics(
            label: d.semanticsLabel ?? d.label,
            child: Icon(d.icon),
          ),
          selectedIcon: Semantics(
            label: d.semanticsLabel ?? d.label,
            child: Icon(d.selectedIcon ?? d.icon),
          ),
          label: d.label,
        );
      }).toList(),
    );
  }
}
