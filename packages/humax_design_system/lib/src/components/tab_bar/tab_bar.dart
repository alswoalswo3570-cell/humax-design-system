import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

/// Scrollability variant of [HumaxTabBar].
enum HumaxTabBarVariant {
  /// Fixed-width tabs — each tab gets an equal share of the bar width.
  fixed,

  /// Scrollable tabs — width is determined by label content.
  scrollable,
}

/// A tab entry for [HumaxTabBar].
class HumaxTab {
  const HumaxTab({required this.label, this.icon});

  /// Text label displayed in the tab.
  final String label;

  /// Optional icon displayed above the label.
  final IconData? icon;
}

/// Token-driven tab bar satisfying the Humax TabBar contract.
///
/// Must be placed inside a [DefaultTabController] (or a [TabController]
/// ancestor). Pair with a [TabBarView] to render the tab content.
///
/// ```dart
/// DefaultTabController(
///   length: 3,
///   child: Column(
///     children: [
///       HumaxTabBar(
///         tabs: const [
///           HumaxTab(label: 'Recent'),
///           HumaxTab(label: 'Favorites'),
///           HumaxTab(label: 'Shared'),
///         ],
///       ),
///       Expanded(
///         child: TabBarView(
///           children: [RecentView(), FavoritesView(), SharedView()],
///         ),
///       ),
///     ],
///   ),
/// )
/// ```
///
/// To place a tab bar inside an [AppBar]'s `bottom` slot, use
/// [HumaxTabBar.asPreferredSize] which implements [PreferredSizeWidget].
///
/// **Accessibility:** selected tab is announced by screen readers.
/// Each tab has a minimum 48 dp touch target.
class HumaxTabBar extends StatelessWidget {
  const HumaxTabBar({
    super.key,
    required this.tabs,
    this.variant = HumaxTabBarVariant.fixed,
    this.controller,
  });

  /// Tab items to display.
  final List<HumaxTab> tabs;

  /// Scrollability variant. Defaults to [HumaxTabBarVariant.fixed].
  final HumaxTabBarVariant variant;

  /// Explicit [TabController]. When `null`, looks up [DefaultTabController].
  final TabController? controller;

  @override
  Widget build(BuildContext context) {
    return _buildTabBar(context.humaxColors);
  }

  TabBar _buildTabBar(HumaxColorScheme c) {
    return TabBar(
      controller: controller,
      isScrollable: variant == HumaxTabBarVariant.scrollable,
      tabAlignment: variant == HumaxTabBarVariant.scrollable
          ? TabAlignment.start
          : TabAlignment.fill,
      labelColor: c.actionPrimaryDefault,
      unselectedLabelColor: c.textSecondary,
      labelStyle: HumaxTextStyle.bodyPoint
          .copyWith(fontWeight: FontWeight.w600),
      unselectedLabelStyle: HumaxTextStyle.bodyPoint,
      indicatorColor: c.actionPrimaryDefault,
      indicatorWeight: HumaxSpace.xxs,
      indicatorSize: TabBarIndicatorSize.tab,
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.pressed)) {
          return c.actionPrimaryDefault.withOpacity(0.08);
        }
        if (states.contains(WidgetState.focused)) {
          return c.actionPrimaryDefault.withOpacity(0.12);
        }
        return Colors.transparent;
      }),
      tabs: tabs
          .map(
            (t) => Tab(
              text: t.icon == null ? t.label : null,
              icon: t.icon != null ? Icon(t.icon) : null,
              child: t.icon != null ? Text(t.label) : null,
            ),
          )
          .toList(),
    );
  }

  /// Returns a [PreferredSizeWidget] version suitable for [AppBar.bottom].
  static PreferredSize asPreferredSize({
    required List<HumaxTab> tabs,
    HumaxTabBarVariant variant = HumaxTabBarVariant.fixed,
    TabController? controller,
  }) {
    final bar = HumaxTabBar(
      tabs: tabs,
      variant: variant,
      controller: controller,
    );
    return PreferredSize(
      preferredSize: const Size.fromHeight(kTextTabBarHeight),
      child: bar,
    );
  }
}
