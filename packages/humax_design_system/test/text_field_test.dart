import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';

Widget _wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('HumaxTextField — render', () {
    testWidgets('shows label', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(label: 'Email'),
      ));
      expect(find.text('Email'), findsOneWidget);
    });

    testWidgets('shows hint when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(label: 'Email', hint: 'you@example.com'),
      ));
      // Hint is visible when field is unfocused and empty
      expect(find.text('you@example.com'), findsOneWidget);
    });

    testWidgets('shows helper text', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(label: 'Name', helperText: 'First and last name'),
      ));
      expect(find.text('First and last name'), findsOneWidget);
    });
  });

  group('HumaxTextField — error state', () {
    testWidgets('shows errorText when fieldState=error', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(
          label: 'Password',
          fieldState: HumaxTextFieldState.error,
          errorText: 'Too short',
        ),
      ));
      expect(find.text('Too short'), findsOneWidget);
    });

    testWidgets('does not show errorText when fieldState=normal', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(
          label: 'Password',
          fieldState: HumaxTextFieldState.normal,
          errorText: 'Too short',
        ),
      ));
      expect(find.text('Too short'), findsNothing);
    });
  });

  group('HumaxTextField — readOnly state', () {
    testWidgets('field is not editable when fieldState=readOnly', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(
          label: 'Username',
          fieldState: HumaxTextFieldState.readOnly,
        ),
      ));
      final textField = tester.widget<TextField>(find.byType(TextField));
      expect(textField.readOnly, isTrue);
    });
  });

  group('HumaxTextField — semantics', () {
    testWidgets('uses semanticsLabel when provided', (tester) async {
      await tester.pumpWidget(_wrap(
        const HumaxTextField(
          label: 'PW',
          semanticsLabel: 'Password field',
        ),
      ));
      // Semantics wrapper should carry the override label
      expect(
        find.bySemanticsLabel('Password field'),
        findsWidgets,
      );
    });
  });

  group('HumaxTextField — callbacks', () {
    testWidgets('onChanged fires when text is entered', (tester) async {
      String? changed;
      await tester.pumpWidget(_wrap(
        HumaxTextField(label: 'Name', onChanged: (v) => changed = v),
      ));
      await tester.enterText(find.byType(TextField), 'Alice');
      expect(changed, 'Alice');
    });
  });
}
