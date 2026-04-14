import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('HumaxSkeleton', () {
    testWidgets('renders with default dimensions', (tester) async {
      await tester.pumpWidget(_wrap(
        const SizedBox(
          width: 200,
          child: HumaxSkeleton(),
        ),
      ));
      expect(find.byType(HumaxSkeleton), findsOneWidget);
    });

    testWidgets('renders with custom width and height', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxSkeleton(width: 120, height: 40),
      ));
      final container = tester.widget<Container>(
        find.descendant(
          of: find.byType(HumaxSkeleton),
          matching: find.byType(Container),
        ),
      );
      expect(container.constraints?.maxWidth, 120);
    });
  });

  group('HumaxSkeletonAvatar', () {
    testWidgets('renders as a circle', (tester) async {
      await tester.pumpWidget(_wrap(const HumaxSkeletonAvatar()));
      expect(find.byType(HumaxSkeletonAvatar), findsOneWidget);
    });
  });

  group('HumaxSkeletonListItem', () {
    testWidgets('renders with avatar by default', (tester) async {
      await tester.pumpWidget(_wrap(const HumaxSkeletonListItem()));
      expect(find.byType(HumaxSkeletonAvatar), findsOneWidget);
    });

    testWidgets('hides avatar when showAvatar=false', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxSkeletonListItem(showAvatar: false),
      ));
      expect(find.byType(HumaxSkeletonAvatar), findsNothing);
    });
  });

  group('HumaxSkeletonList', () {
    testWidgets('renders correct item count', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxSkeletonList(itemCount: 3),
      ));
      expect(find.byType(HumaxSkeletonListItem), findsNWidgets(3));
    });

    testWidgets('has liveRegion semantics with Loading label', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxSkeletonList(itemCount: 2),
      ));
      expect(
        find.bySemanticsLabel('Loading\u2026'),
        findsOneWidget,
      );
    });
  });

  group('HumaxSkeletonCard', () {
    testWidgets('renders image area by default', (tester) async {
      await tester.pumpWidget(_wrap(
        const SizedBox(
          width: 300,
          child: HumaxSkeletonCard(),
        ),
      ));
      expect(find.byType(HumaxSkeletonCard), findsOneWidget);
      // Should have at least 4 HumaxSkeleton: 1 image + 3 text lines
      expect(find.byType(HumaxSkeleton), findsNWidgets(4));
    });

    testWidgets('hides image area when showImage=false', (tester) async {
      await tester.pumpWidget(_wrap(
        const SizedBox(
          width: 300,
          child: HumaxSkeletonCard(showImage: false, lineCount: 2),
        ),
      ));
      // Only text line skeletons (no image)
      expect(find.byType(HumaxSkeleton), findsNWidgets(2));
    });
  });
}
