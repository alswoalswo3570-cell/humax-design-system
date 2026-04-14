import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// Shows a token-driven **modal** bottom sheet.
///
/// Wraps [showModalBottomSheet] with Humax token defaults:
/// - `backgroundColor`: `HumaxColors.backgroundSurface`
/// - Top corners: `HumaxRadius.lg`
/// - Drag handle: enabled by default
/// - Scrim: `HumaxColors.backgroundOverlay`
///
/// ```dart
/// HumaxBottomSheet.show(
///   context: context,
///   builder: (ctx) => const MySheetContent(),
/// );
///
/// // Non-dismissible confirmation sheet
/// HumaxBottomSheet.show(
///   context: context,
///   isDismissible: false,
///   builder: (ctx) => const ConfirmSheet(),
/// );
/// ```
///
/// For a standard (persistent) bottom sheet attached to [Scaffold],
/// use [Scaffold.showBottomSheet] directly and apply [humaxSheetDecoration]
/// to the content widget.
///
/// **Accessibility:** focus is trapped inside the sheet.
/// The drag handle carries a semantic label ('Drag to dismiss').
abstract class HumaxBottomSheet {
  HumaxBottomSheet._();

  /// Shows a modal bottom sheet with Humax token defaults.
  ///
  /// Returns the value passed to [Navigator.pop] when the sheet closes,
  /// or `null` if the sheet was dismissed.
  static Future<T?> show<T>({
    required BuildContext context,
    required WidgetBuilder builder,
    bool isDismissible = true,
    bool enableDrag = true,
    bool showDragHandle = true,
    bool useSafeArea = true,
    bool isScrollControlled = false,
  }) {
    return showModalBottomSheet<T>(
      context: context,
      isDismissible: isDismissible,
      enableDrag: enableDrag,
      showDragHandle: showDragHandle,
      useSafeArea: useSafeArea,
      isScrollControlled: isScrollControlled,
      backgroundColor: HumaxColors.backgroundSurface,
      barrierColor: HumaxColors.backgroundOverlay,
      elevation: 1,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(HumaxRadius.lg),
        ),
      ),
      builder: builder,
    );
  }

  /// A [BoxDecoration] that applies the same surface + radius tokens used
  /// by [show]. Use this when building a standard (persistent) bottom sheet.
  static BoxDecoration get decoration => BoxDecoration(
        color: HumaxColors.backgroundSurface,
        borderRadius: const BorderRadius.vertical(
          top: Radius.circular(HumaxRadius.lg),
        ),
        boxShadow: HumaxShadow.sm,
      );

  /// A pre-styled drag handle widget matching the Humax drag handle tokens.
  ///
  /// Place this at the top of a custom sheet body when [showDragHandle] is
  /// `false` but you still want to render the handle manually.
  static Widget get dragHandle => Semantics(
        label: 'Drag to dismiss',
        child: Center(
          child: Container(
            margin: const EdgeInsets.only(top: HumaxSpace.sm),
            width: 32,
            height: 4,
            decoration: BoxDecoration(
              color: HumaxColors.borderStrong,
              borderRadius: BorderRadius.circular(HumaxRadius.full),
            ),
          ),
        ),
      );
}
