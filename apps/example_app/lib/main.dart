import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

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
        scaffoldBackgroundColor: HumaxColors.backgroundBase,
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
        scaffoldBackgroundColor: HumaxDarkColors.backgroundBase,
        textTheme: TextTheme(
          bodyMedium: HumaxTextStyle.bodyCommon,
          bodySmall: HumaxTextStyle.captionCommon,
          labelMedium: HumaxTextStyle.bodyPoint,
        ),
      ),
      home: ExampleGallery(onThemeChange: _toggleTheme),
    );
  }
}

class ExampleGallery extends StatelessWidget {
  const ExampleGallery({super.key, required this.onThemeChange});

  final void Function(ThemeMode) onThemeChange;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Humax DS · Examples',
          style: HumaxTextStyle.titleLarge.copyWith(
            color: isDark ? HumaxDarkColors.textPrimary : HumaxColors.textPrimary,
          ),
        ),
        backgroundColor:
            isDark ? HumaxDarkColors.backgroundSurface : HumaxColors.backgroundSurface,
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
        padding: const EdgeInsets.all(HumaxSpace.md),
        children: [
          const SizedBox(height: HumaxSpace.xs),
          _GalleryTile(
            index: 1,
            label: 'Login / Auth flow',
            description: 'AppBar · TextField · Button · Dialog · Error state · SnackBar',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const LoginScreen()),
            ),
          ),
          const SizedBox(height: HumaxSpace.sm),
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textPrimary = isDark ? HumaxDarkColors.textPrimary : HumaxColors.textPrimary;
    final textSecondary =
        isDark ? HumaxDarkColors.textSecondary : HumaxColors.textSecondary;
    final textTertiary =
        isDark ? HumaxDarkColors.textTertiary : HumaxColors.textTertiary;
    final surface =
        isDark ? HumaxDarkColors.backgroundSurface : HumaxColors.backgroundSurface;
    final border = isDark ? HumaxDarkColors.borderDefault : HumaxColors.borderDefault;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(HumaxRadius.lg),
      child: Container(
        padding: const EdgeInsets.all(HumaxSpace.md),
        decoration: BoxDecoration(
          color: surface,
          borderRadius: BorderRadius.circular(HumaxRadius.lg),
          border: Border.all(color: border, width: 0.5),
        ),
        child: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: HumaxColors.actionPrimaryDefault.withOpacity(0.1),
                borderRadius: BorderRadius.circular(HumaxRadius.sm),
              ),
              child: Center(
                child: Text(
                  '$index',
                  style: HumaxTextStyle.bodyPoint.copyWith(
                    color: HumaxColors.actionPrimaryDefault,
                  ),
                ),
              ),
            ),
            const SizedBox(width: HumaxSpace.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label,
                      style:
                          HumaxTextStyle.bodyPoint.copyWith(color: textPrimary)),
                  const SizedBox(height: 3),
                  Text(description,
                      style:
                          HumaxTextStyle.captionCommon.copyWith(color: textSecondary)),
                ],
              ),
            ),
            Icon(Icons.chevron_right, color: textTertiary, size: 20),
          ],
        ),
      ),
    );
  }
}
