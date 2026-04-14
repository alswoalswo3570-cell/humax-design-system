import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('HumaxEmptyState — render', () {
    testWidgets('shows headline', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(headline: 'No messages yet'),
      ));
      expect(find.text('No messages yet'), findsOneWidget);
    });

    testWidgets('shows body when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(
          headline: 'No messages',
          body: 'Messages will appear here.',
        ),
      ));
      expect(find.text('Messages will appear here.'), findsOneWidget);
    });

    testWidgets('shows icon when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(
          headline: 'Empty inbox',
          icon: Icons.inbox_outlined,
        ),
      ));
      expect(find.byIcon(Icons.inbox_outlined), findsOneWidget);
    });

    testWidgets('icon ignored when illustration provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(
          headline: 'Empty',
          icon: Icons.inbox_outlined,
          illustration: SizedBox(width: 100, height: 100),
        ),
      ));
      // Illustration takes priority
      expect(find.byType(SizedBox), findsWidgets);
      expect(find.byIcon(Icons.inbox_outlined), findsNothing);
    });
  });

  group('HumaxEmptyState — actions', () {
    testWidgets('shows primary action button when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxEmptyState(
          headline: 'No devices',
          primaryActionLabel: 'Add device',
          onPrimaryAction: () {},
        ),
      ));
      expect(find.text('Add device'), findsOneWidget);
    });

    testWidgets('primary action not shown when callback is null', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(
          headline: 'No devices',
          primaryActionLabel: 'Add device',
          // onPrimaryAction omitted
        ),
      ));
      expect(find.text('Add device'), findsNothing);
    });

    testWidgets('calls primaryAction callback on tap', (tester) async {
      var tapped = false;
      await tester.pumpWidget(_wrap(
        HumaxEmptyState(
          headline: 'No devices',
          primaryActionLabel: 'Add device',
          onPrimaryAction: () => tapped = true,
        ),
      ));
      await tester.tap(find.text('Add device'));
      expect(tapped, isTrue);
    });

    testWidgets('shows secondary action when both label and callback provided',
        (tester) async {
      await tester.pumpWidget(_wrap(
        HumaxEmptyState(
          headline: 'No items',
          primaryActionLabel: 'Create',
          onPrimaryAction: () {},
          secondaryActionLabel: 'Learn more',
          onSecondaryAction: () {},
        ),
      ));
      expect(find.text('Create'), findsOneWidget);
      expect(find.text('Learn more'), findsOneWidget);
    });
  });

  group('HumaxEmptyState — size variants', () {
    testWidgets('compact size renders without error', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxEmptyState(
          headline: 'Empty section',
          size: HumaxEmptyStateSize.compact,
          icon: Icons.search_off,
        ),
      ));
      expect(find.byType(HumaxEmptyState), findsOneWidget);
    });
  });
}
