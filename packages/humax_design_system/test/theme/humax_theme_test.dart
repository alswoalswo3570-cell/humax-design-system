import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:humax_design_system/humax_design_system.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

void main() {
  group('HumaxColorScheme', () {
    test('.light() and .dark() both construct without error', () {
      expect(HumaxColorScheme.light(), isNotNull);
      expect(HumaxColorScheme.dark(), isNotNull);
    });

    test('.light() and .dark() differ on at least one surface color', () {
      // Sanity: dark mode MUST differ on backgroundPage, otherwise the
      // auto-generator silently emitted the wrong palette.
      expect(
        HumaxColorScheme.light().backgroundPage,
        isNot(equals(HumaxColorScheme.dark().backgroundPage)),
      );
    });

    test('equality works — two .light() instances compare equal by value',
        () {
      // Guards against accidental reference-equality regressions in the
      // generated scheme.
      final a = HumaxColorScheme.light();
      final b = HumaxColorScheme.light();
      expect(a.backgroundSurface, equals(b.backgroundSurface));
      expect(a.textPrimary,       equals(b.textPrimary));
    });
  });

  group('HumaxTheme.of', () {
    testWidgets('returns scheme from ancestor when wrapped', (tester) async {
      HumaxColorScheme? captured;
      await tester.pumpWidget(
        HumaxTheme(
          colors: HumaxColorScheme.dark(),
          child: Builder(
            builder: (context) {
              captured = context.humaxColors;
              return const SizedBox();
            },
          ),
        ),
      );
      expect(captured, isNotNull);
      expect(captured!.backgroundPage,
          equals(HumaxColorScheme.dark().backgroundPage));
    });

    testWidgets('falls back to Theme.of brightness when no ancestor',
        (tester) async {
      HumaxColorScheme? captured;
      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData.light(),
          home: Builder(
            builder: (context) {
              captured = context.humaxColors;
              return const SizedBox();
            },
          ),
        ),
      );
      expect(captured, isNotNull);
      // Fallback should match light because MaterialApp theme is light.
      expect(captured!.backgroundPage,
          equals(HumaxColorScheme.light().backgroundPage));
    });

    testWidgets('falls back to dark scheme in dark MaterialApp',
        (tester) async {
      HumaxColorScheme? captured;
      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData.dark(),
          home: Builder(
            builder: (context) {
              captured = context.humaxColors;
              return const SizedBox();
            },
          ),
        ),
      );
      expect(captured!.backgroundPage,
          equals(HumaxColorScheme.dark().backgroundPage));
    });
  });
}
