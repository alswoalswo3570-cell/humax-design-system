import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import 'package:humax_design_system/humax_design_system.dart';

import 'screens/login_screen.dart';
import 'screens/settings_screen.dart';

void main() {
  runApp(const ExampleApp());
}

class ExampleApp extends StatefulWidget {
  const ExampleApp({super.key});

  @override
  State<ExampleApp> createState() => _ExampleAppState();
}

class _ExampleAppState extends State<ExampleApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme(ThemeMode mode) => setState(() => _themeMode = mode);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Humax DS · Examples',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: HumaxColors.actionPrimaryDefault,
        ),
        scaffoldBackgroundColor: HumaxColors.backgroundPage,
        textTheme: TextTheme(
          bodyMedium: HumaxTextStyle.bodyCommon,
          bodySmall: HumaxTextStyle.captionCommon,
          labelMedium: HumaxTextStyle.bodyPoint,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: HumaxColors.actionPrimaryDefault,
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: HumaxDarkColors.backgroundPage,
        textTheme: TextTheme(
          bodyMedium: HumaxTextStyle.bodyCommon,
          bodySmall: HumaxTextStyle.captionCommon,
          labelMedium: HumaxTextStyle.bodyPoint,
        ),
      ),
      // Wrap every page in HumaxTheme so descendants resolve colors via
      // context.humaxColors instead of static HumaxColors.* constants.
      builder: (context, child) {
        final brightness = Theme.of(context).brightness;
        return HumaxTheme(
          colors: brightness == Brightness.dark
              ? HumaxColorScheme.dark()
              : HumaxColorScheme.light(),
          child: child!,
        );
      },
      home: ExampleGallery(onThemeChange: _toggleTheme),
    );
  }
}

class ExampleGallery extends StatelessWidget {
  const ExampleGallery({super.key, required this.onThemeChange});

  final void Function(ThemeMode) onThemeChange;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Humax DS · Examples',
          style: HumaxTextStyle.titleLarge.copyWith(color: c.textPrimary),
        ),
        backgroundColor: c.backgroundSurface,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined),
            tooltip: 'Toggle theme',
            onPressed: () =>
                onThemeChange(isDark ? ThemeMode.light : ThemeMode.dark),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(HumaxSpace.m),
        children: [
          const SizedBox(height: HumaxSpace.xxs),
          _GalleryTile(
            index: 1,
            label: 'Login / Auth flow',
            description: 'AppBar · TextField · Button · Dialog · Error state · SnackBar',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const LoginScreen()),
            ),
          ),
          const SizedBox(height: HumaxSpace.xs),
          _GalleryTile(
            index: 2,
            label: 'Settings / Profile',
            description: 'AppBar · Switch · BottomSheet · SnackBar · Empty state · Destructive dialog',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const SettingsScreen()),
            ),
          ),
        ],
      ),
    );
  }
}

class _GalleryTile extends StatelessWidget {
  const _GalleryTile({
    required this.index,
    required this.label,
    required this.description,
    required this.onTap,
  });

  final int index;
  final String label;
  final String description;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(HumaxRadius.lg),
      child: Container(
        padding: const EdgeInsets.all(HumaxSpace.m),
        decoration: BoxDecoration(
          color: c.backgroundSurface,
          borderRadius: BorderRadius.circular(HumaxRadius.lg),
          border: Border.all(color: c.borderDefault, width: 0.5),
        ),
        child: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: c.actionPrimaryDefault.withOpacity(0.1),
                borderRadius: BorderRadius.circular(HumaxRadius.sm),
              ),
              child: Center(
                child: Text(
                  '$index',
                  style: HumaxTextStyle.bodyPoint.copyWith(
                    color: c.actionPrimaryDefault,
                  ),
                ),
              ),
            ),
            const SizedBox(width: HumaxSpace.m),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label,
                      style:
                          HumaxTextStyle.bodyPoint.copyWith(color: c.textPrimary)),
                  const SizedBox(height: 3),
                  Text(description,
                      style: HumaxTextStyle.captionCommon
                          .copyWith(color: c.textSecondary)),
                ],
              ),
            ),
            Icon(Icons.chevron_right, color: c.textTertiary, size: 20),
          ],
        ),
      ),
    );
  }
}
