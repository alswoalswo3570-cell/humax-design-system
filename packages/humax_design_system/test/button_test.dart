import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';

/// Widget tests for [HumaxButton].
///
/// Covers:
/// - Label is rendered for each variant
/// - Disabled when onPressed is null
/// - Loading state shows indicator and disables tap
/// - Semantics: role=button, enabled/disabled correctly reported
/// - leadingIcon is rendered when provided

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('HumaxButton — render', () {
    testWidgets('renders label text', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxButton(label: 'Save'),
      ));
      expect(find.text('Save'), findsOneWidget);
    });

    for (final variant in HumaxButtonVariant.values) {
      testWidgets('renders for variant $variant', (tester) async {
        await tester.pumpWidget(_wrap(
          HumaxButton(label: 'Test', variant: variant, onPressed: () {}),
        ));
        expect(find.text('Test'), findsOneWidget);
      });
    }

    for (final size in HumaxButtonSize.values) {
      testWidgets('renders for size $size', (tester) async {
        await tester.pumpWidget(_wrap(
          HumaxButton(label: 'Test', size: size, onPressed: () {}),
        ));
        expect(find.text('Test'), findsOneWidget);
      });
    }
  });

  group('HumaxButton — interaction', () {
    testWidgets('calls onPressed when tapped', (tester) async {
      var tapped = false;
      await tester.pumpWidget(_wrap(
        HumaxButton(label: 'Go', onPressed: () => tapped = true),
      ));
      await tester.tap(find.byType(HumaxButton));
      expect(tapped, isTrue);
    });

    testWidgets('does not call onPressed when null (disabled)', (tester) async {
      var tapped = false;
      await tester.pumpWidget(_wrap(
        HumaxButton(label: 'Go', onPressed: null),
      ));
      await tester.tap(find.byType(HumaxButton), warnIfMissed: false);
      expect(tapped, isFalse);
    });
  });

  group('HumaxButton — loading state', () {
    testWidgets('shows CircularProgressIndicator when isLoading=true',
        (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxButton(label: 'Save', isLoading: true, onPressed: () {}),
      ));
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      // Label should be hidden while loading
      expect(find.text('Save'), findsNothing);
    });

    testWidgets('tap is no-op when isLoading=true (onPressed passed null)',
        (tester) async {
      var tapped = false;
      await tester.pumpWidget(_wrap(
        // isLoading passes null to the underlying button's onPressed
        HumaxButton(
          label: 'Save',
          isLoading: true,
          onPressed: () => tapped = true,
        ),
      ));
      await tester.tap(find.byType(HumaxButton), warnIfMissed: false);
      expect(tapped, isFalse);
    });
  });

  group('HumaxButton — semantics', () {
    testWidgets('has button role in semantics tree', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxButton(label: 'Click me', onPressed: null),
      ));
      final semantics = tester.getSemantics(find.byType(HumaxButton));
      expect(semantics.hasFlag(SemanticsFlag.isButton), isTrue);
    });

    testWidgets('uses semanticsLabel when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxButton(
          label: 'X',
          semanticsLabel: 'Close dialog',
          onPressed: null,
        ),
      ));
      final semantics = tester.getSemantics(find.byType(HumaxButton));
      expect(semantics.label, 'Close dialog');
    });

    testWidgets('reports enabled=false when onPressed is null', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxButton(label: 'Disabled'),
      ));
      final semantics = tester.getSemantics(find.byType(HumaxButton));
      expect(semantics.hasFlag(SemanticsFlag.isEnabled), isFalse);
    });

    testWidgets('reports enabled=true when onPressed is provided',
        (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxButton(label: 'Active', onPressed: () {}),
      ));
      final semantics = tester.getSemantics(find.byType(HumaxButton));
      expect(semantics.hasFlag(SemanticsFlag.isEnabled), isTrue);
    });
  });

  group('HumaxButton — leading icon', () {
    testWidgets('renders leading icon widget when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxButton(
          label: 'Add',
          leadingIcon: Icons.add,
          onPressed: () {},
        ),
      ));
      expect(find.byIcon(Icons.add), findsOneWidget);
      expect(find.text('Add'), findsOneWidget);
    });
  });
}
