import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('HumaxErrorState — default copy', () {
    testWidgets('network type shows correct headline', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(type: HumaxErrorType.network),
      ));
      expect(find.text('No internet connection'), findsOneWidget);
    });

    testWidgets('notFound type shows correct headline', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(type: HumaxErrorType.notFound),
      ));
      expect(find.text('Page not found'), findsOneWidget);
    });

    testWidgets('permission type shows correct headline', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(type: HumaxErrorType.permission),
      ));
      expect(find.text('Access restricted'), findsOneWidget);
    });
  });

  group('HumaxErrorState — custom copy override', () {
    testWidgets('headline override replaces default', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(
          type: HumaxErrorType.server,
          headline: 'Custom headline',
        ),
      ));
      expect(find.text('Custom headline'), findsOneWidget);
      expect(find.text('Something went wrong'), findsNothing);
    });
  });

  group('HumaxErrorState — retry button', () {
    testWidgets('shows retry button when onRetry provided', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxErrorState(
          type: HumaxErrorType.network,
          onRetry: () {},
        ),
      ));
      expect(find.byType(HumaxButton), findsOneWidget);
    });

    testWidgets('hides retry button when onRetry is null', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(type: HumaxErrorType.network),
      ));
      expect(find.byType(HumaxButton), findsNothing);
    });

    testWidgets('retry button is loading when isRetrying=true', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxErrorState(
          type: HumaxErrorType.network,
          onRetry: () {},
          isRetrying: true,
        ),
      ));
      final button = tester.widget<HumaxButton>(find.byType(HumaxButton));
      expect(button.isLoading, isTrue);
    });
  });

  group('HumaxErrorState — variants', () {
    testWidgets('sectionLevel variant renders without error', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxErrorState(
          type: HumaxErrorType.server,
          variant: HumaxErrorVariant.sectionLevel,
          onRetry: () {},
        ),
      ));
      expect(find.byType(HumaxErrorState), findsOneWidget);
    });

    testWidgets('inlineRetry variant renders without error', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxErrorState(
          type: HumaxErrorType.generic,
          variant: HumaxErrorVariant.inlineRetry,
          onRetry: () {},
        ),
      ));
      expect(find.byType(HumaxErrorState), findsOneWidget);
    });
  });

  group('HumaxErrorState — semantics', () {
    testWidgets('is a live region', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxErrorState(type: HumaxErrorType.generic),
      ));
      // Semantics with liveRegion should be present
      expect(
        tester.getSemantics(find.byType(HumaxErrorState)).hasFlag(
              SemanticsFlag.isLiveRegion,
            ),
        isTrue,
      );
    });
  });
}
