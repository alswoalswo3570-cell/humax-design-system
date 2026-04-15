import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import '../../theme/humax_theme.dart';

/// Variant of the app bar.
///
/// Contract: contracts/flutter/app_bar.contract.json → variants
enum HumaxAppBarVariant {
  /// Standard app bar with title, optional leading, optional actions.
  standard,

  /// Larger title displayed below the toolbar area (Material 3 large app bar).
  large,

  /// Transparent background — for use over full-bleed images or hero content.
  transparent,
}

/// A token-driven app bar that satisfies the Humax AppBar contract.
///
/// Drop-in replacement for [AppBar] / [SliverAppBar].
///
/// ```dart
/// Scaffold(
///   appBar: HumaxAppBar(title: 'Settings'),
///   body: ...,
/// )
/// ```
///
/// For a scrollable large title:
/// ```dart
/// CustomScrollView(
///   slivers: [
///     HumaxAppBar.sliver(title: 'My Feed', variant: HumaxAppBarVariant.large),
///     SliverList(...),
///   ],
/// )
/// ```
///
/// **Accessibility:** title has Semantics header: true. Back button has
/// a default tooltip of 'Back'. Override [leadingSemantics] for non-standard
/// leading widgets.
class HumaxAppBar extends StatelessWidget implements PreferredSizeWidget {
  const HumaxAppBar({
    super.key,
    required this.title,
    this.variant = HumaxAppBarVariant.standard,
    this.leading,
    this.automaticallyImplyLeading = true,
    this.actions,
    this.bottom,
    this.centerTitle = true,
    this.leadingSemantics,
    this.titleSemantics,
  });

  /// Page title. Should be ≤ 3 words, noun phrase, Title Case.
  final String title;

  /// Visual variant. Defaults to [HumaxAppBarVariant.standard].
  final HumaxAppBarVariant variant;

  /// Leading widget (e.g., back button, menu icon).
  /// If `null` and [automaticallyImplyLeading] is `true`, Flutter inserts a back button.
  final Widget? leading;

  /// Whether to automatically insert a back button when there is a route to pop.
  final bool automaticallyImplyLeading;

  /// Action widgets shown on the right side of the app bar.
  final List<Widget>? actions;

  /// A widget placed below the toolbar (e.g., a [TabBar]).
  final PreferredSizeWidget? bottom;

  /// Whether to center the title. Defaults to `true` (iOS-style).
  final bool centerTitle;

  /// Accessible label for the leading widget. Defaults to 'Back'.
  final String? leadingSemantics;

  /// Accessible label override for the title.
  final String? titleSemantics;

  bool get _isTransparent => variant == HumaxAppBarVariant.transparent;

  Color _backgroundColor(HumaxColorScheme c) => _isTransparent
      ? Colors.transparent
      : c.backgroundSurface;

  Color _foregroundColor(HumaxColorScheme c) => c.textPrimary;

  List<BoxShadow> get _shadow =>
      _isTransparent ? const [] : HumaxShadow.sm;

  @override
  Size get preferredSize => Size.fromHeight(
        kToolbarHeight + (bottom?.preferredSize.height ?? 0),
      );

  Widget _buildTitle(HumaxColorScheme c) {
    return Semantics(
      header: true,
      label: titleSemantics ?? title,
      child: Text(
        title,
        style: HumaxTextStyle.titleLarge.copyWith(color: _foregroundColor(c)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return AppBar(
      title: _buildTitle(c),
      leading: leading,
      automaticallyImplyLeading: automaticallyImplyLeading,
      actions: actions,
      bottom: bottom,
      centerTitle: centerTitle,
      backgroundColor: _backgroundColor(c),
      foregroundColor: _foregroundColor(c),
      surfaceTintColor: Colors.transparent,
      shadowColor: _shadow.isNotEmpty ? _shadow.first.color : Colors.transparent,
      elevation: _shadow.isNotEmpty ? 1 : 0,
      scrolledUnderElevation: _isTransparent ? 0 : 2,
      toolbarHeight: kToolbarHeight,
    );
  }

  /// Creates a [SliverAppBar] version for use inside [CustomScrollView].
  ///
  /// Requires [BuildContext] so colors auto-switch with [HumaxTheme].
  static Widget sliver({
    required BuildContext context,
    required String title,
    HumaxAppBarVariant variant = HumaxAppBarVariant.standard,
    Widget? leading,
    bool automaticallyImplyLeading = true,
    List<Widget>? actions,
    PreferredSizeWidget? bottom,
    bool pinned = true,
    bool floating = false,
    bool snap = false,
  }) {
    final c = context.humaxColors;
    final isLarge = variant == HumaxAppBarVariant.large;
    final isTransparent = variant == HumaxAppBarVariant.transparent;
    final bg = isTransparent ? Colors.transparent : c.backgroundSurface;

    return SliverAppBar(
      title: Semantics(
        header: true,
        child: Text(
          title,
          style: HumaxTextStyle.titleLarge.copyWith(color: c.textPrimary),
        ),
      ),
      leading: leading,
      automaticallyImplyLeading: automaticallyImplyLeading,
      actions: actions,
      bottom: bottom,
      pinned: pinned,
      floating: floating,
      snap: snap,
      expandedHeight: isLarge ? 120 : kToolbarHeight,
      backgroundColor: bg,
      foregroundColor: c.textPrimary,
      surfaceTintColor: Colors.transparent,
      elevation: isTransparent ? 0 : 1,
      flexibleSpace: isLarge
          ? FlexibleSpaceBar(
              title: Text(
                title,
                style: HumaxTextStyle.headlineSmall
                    .copyWith(color: c.textPrimary),
              ),
              background: Container(color: bg),
              collapseMode: CollapseMode.pin,
            )
          : null,
    );
  }
}
