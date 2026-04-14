import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// A single shimmer-animated skeleton placeholder shape.
///
/// Used to build skeleton loading states. Prefer the composite widgets
/// [HumaxSkeletonListItem] and [HumaxSkeletonCard] for standard layouts.
///
/// ```dart
/// // Image placeholder
/// HumaxSkeleton(width: 200, height: 120, borderRadius: HumaxRadius.md)
///
/// // Text line
/// HumaxSkeleton(width: double.infinity, height: 16)
/// ```
class HumaxSkeleton extends StatefulWidget {
  const HumaxSkeleton({
    super.key,
    this.width = double.infinity,
    this.height = 16,
    this.borderRadius = HumaxRadius.md,
  });

  /// Width of the placeholder. Defaults to full width.
  final double width;

  /// Height of the placeholder. Defaults to 16 (body line height).
  final double height;

  /// Corner radius. Defaults to [HumaxRadius.md].
  final double borderRadius;

  @override
  State<HumaxSkeleton> createState() => _HumaxSkeletonState();
}

class _HumaxSkeletonState extends State<HumaxSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _shimmer;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: HumaxDuration.slow,
    )..repeat();
    _shimmer = Tween<double>(begin: -2, end: 2).animate(
      CurvedAnimation(parent: _controller, curve: HumaxCurve.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _shimmer,
      builder: (context, _) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            gradient: LinearGradient(
              begin: Alignment(_shimmer.value - 1, 0),
              end: Alignment(_shimmer.value + 1, 0),
              colors: [
                HumaxColors.backgroundSurfaceHover,
                HumaxColors.backgroundSurface,
                HumaxColors.backgroundSurfaceHover,
              ],
            ),
          ),
        );
      },
    );
  }
}

/// Circular skeleton for user avatars.
class HumaxSkeletonAvatar extends StatelessWidget {
  const HumaxSkeletonAvatar({super.key, this.size = 40});

  /// Diameter in logical pixels. Defaults to 40.
  final double size;

  @override
  Widget build(BuildContext context) {
    return HumaxSkeleton(
      width: size,
      height: size,
      borderRadius: HumaxRadius.full,
    );
  }
}

/// A composite skeleton that mirrors a standard list tile.
///
/// ```dart
/// HumaxSkeletonListItem()              // with avatar
/// HumaxSkeletonListItem(showAvatar: false)  // text-only
/// ```
///
/// Wrap in [Semantics] with `label: 'Loading…'` at the list level.
class HumaxSkeletonListItem extends StatelessWidget {
  const HumaxSkeletonListItem({
    super.key,
    this.showAvatar = true,
  });

  /// Whether to show the avatar circle on the left. Defaults to `true`.
  final bool showAvatar;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: HumaxSpace.md,
        vertical: HumaxSpace.sm,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (showAvatar) ...[
            const HumaxSkeletonAvatar(),
            const SizedBox(width: HumaxSpace.md),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                HumaxSkeleton(width: double.infinity, height: 14),
                const SizedBox(height: HumaxSpace.xs),
                HumaxSkeleton(width: 180, height: 12),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// A list of [HumaxSkeletonListItem]s wrapped in a [Semantics] live region.
///
/// ```dart
/// AnimatedSwitcher(
///   duration: HumaxDuration.fast,
///   child: isLoading
///       ? HumaxSkeletonList(itemCount: 5)
///       : MyRealList(items: items),
/// )
/// ```
class HumaxSkeletonList extends StatelessWidget {
  const HumaxSkeletonList({
    super.key,
    this.itemCount = 4,
    this.showAvatar = true,
  });

  /// Number of skeleton rows to display. Defaults to 4.
  final int itemCount;

  /// Passed to each [HumaxSkeletonListItem].
  final bool showAvatar;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Loading\u2026',
      liveRegion: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: List.generate(
          itemCount,
          (_) => HumaxSkeletonListItem(showAvatar: showAvatar),
        ),
      ),
    );
  }
}

/// A composite skeleton that mirrors a content card (image + text lines).
///
/// ```dart
/// HumaxSkeletonCard()          // with image area
/// HumaxSkeletonCard(showImage: false, lineCount: 2)
/// ```
class HumaxSkeletonCard extends StatelessWidget {
  const HumaxSkeletonCard({
    super.key,
    this.showImage = true,
    this.lineCount = 3,
  });

  /// Whether to show the image placeholder at the top. Defaults to `true`.
  final bool showImage;

  /// Number of text skeleton lines below the image. Defaults to 3.
  final int lineCount;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: HumaxColors.backgroundSurface,
        borderRadius: BorderRadius.circular(HumaxRadius.lg),
        boxShadow: HumaxShadow.sm,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showImage)
            HumaxSkeleton(
              width: double.infinity,
              height: 160,
              borderRadius: 0,
            ),
          Padding(
            padding: const EdgeInsets.all(HumaxSpace.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (int i = 0; i < lineCount; i++) ...[
                  HumaxSkeleton(
                    width: i == lineCount - 1 ? 120 : double.infinity,
                    height: i == 0 ? 16 : 12,
                  ),
                  if (i < lineCount - 1) const SizedBox(height: HumaxSpace.xs),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
