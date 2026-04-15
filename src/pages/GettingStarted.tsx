export default function GettingStarted() {
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  // ── Code snippets ──────────────────────────────────────────────────────────

  const pubspecSnippet = `dependencies:
  flutter:
    sdk: flutter

  # Step 1a — Design tokens (colors, spacing, radius, typography)
  humax_design_tokens:
    path: ../path/to/repo/packages/humax_design_tokens

  # Step 1b — Pre-built widgets (Button, TextField, Dialog, …)
  humax_design_system:
    path: ../path/to/repo/packages/humax_design_system`;

  const mainDartSnippet = `import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
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
      // Optional: dark theme uses HumaxDarkColors
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: HumaxColors.actionPrimaryDefault,
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: HumaxDarkColors.backgroundBase,
      ),
      home: const HomeScreen(),
    );
  }
}`;

  const widgetSnippet = `import 'package:humax_design_system/humax_design_system.dart';

// One import — access to all Humax widgets.
// No style parameters needed; tokens are applied internally.

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HumaxAppBar(title: 'Sign in'),
      body: Padding(
        padding: const EdgeInsets.all(HumaxSpace.lg),
        child: Column(
          children: [
            HumaxTextField(
              label: 'Email address',
              hint: 'you@example.com',
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: HumaxSpace.md),
            HumaxTextField(
              label: 'Password',
              obscureText: true,
            ),
            SizedBox(height: HumaxSpace.lg),
            HumaxButton(
              label: 'Sign in',
              variant: HumaxButtonVariant.filled,
              size: HumaxButtonSize.lg,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}`;

  const dialogSnippet = `// Show a confirmation dialog
final confirmed = await HumaxDialog.show(
  context: context,
  title: 'Delete item?',
  content: 'This action cannot be undone.',
  variant: HumaxDialogVariant.destructive,
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
);

if (confirmed == true) {
  // proceed with deletion
}

// Show a snack bar
HumaxSnackBar.show(
  context: context,
  message: 'Item deleted',
  actionLabel: 'Undo',
  onAction: () => restoreItem(),
);

// Show a bottom sheet
HumaxBottomSheet.show(
  context: context,
  builder: (ctx) => const MySheetContent(),
);`;

  const tokenSnippet = `# From the repo root — run after editing tokens/*.json
npm run build:tokens

# Then inside your Flutter project
flutter pub get`;

  // ── Sub-components ─────────────────────────────────────────────────────────

  const CodeBlock = ({ code, label }: { code: string; label: string }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm font-mono text-gray-300">{label}</span>
        <button
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => copyToClipboard(code)}
        >
          Copy
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  const Step = ({
    n,
    title,
    children,
  }: {
    n: number;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex gap-6">
      <div className="flex-none">
        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
          {n}
        </div>
      </div>
      <div className="flex-1 space-y-4 pb-10 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {children}
      </div>
    </div>
  );

  const Pill = ({ text }: { text: string }) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
      {text}
    </span>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Getting Started
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          From zero to a fully token-driven Flutter screen in under 5 minutes.
        </p>
      </div>

      {/* Two-package architecture callout */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5">
        <h2 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
          Two packages, one import chain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
            <code className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
              humax_design_tokens
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Auto-generated Dart constants from{" "}
              <code className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">tokens/*.json</code>.
              Colors, spacing, radius, typography, shadows, motion.
              Use this when you need raw token values.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
            <code className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
              humax_design_system
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Contract-driven Flutter widgets — Button, TextField, AppBar,
              Dialog, BottomSheet, SnackBar, NavigationBar, TabBar, Checkbox,
              Radio, Switch, EmptyState, Skeleton, ErrorState.
              Tokens are wired in; no styling parameters needed.
            </p>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
        <h2 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Prerequisites</h2>
        <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1 list-disc list-inside">
          <li>Flutter SDK ≥ 3.0</li>
          <li>
            Node.js ≥ 18 (for{" "}
            <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
              npm run build:tokens
            </code>
            )
          </li>
          <li>This repository cloned locally</li>
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-0">

        {/* Step 1 */}
        <Step n={1} title="Add both packages to pubspec.yaml">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Both packages are local path dependencies — no pub.dev account required.
            Adjust the paths to match where you cloned the repo.
          </p>
          <CodeBlock code={pubspecSnippet} label="pubspec.yaml" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Run{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
              flutter pub get
            </code>{" "}
            to resolve both packages.
          </p>
        </Step>

        {/* Step 2 */}
        <Step n={2} title="Wire the theme in main.dart">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Import <Pill text="humax_design_tokens" /> and seed{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">ThemeData</code>{" "}
            with Humax color and text tokens. This makes all Material widgets
            respect the design system baseline automatically.
          </p>
          <CodeBlock code={mainDartSnippet} label="lib/main.dart" />
        </Step>

        {/* Step 3 */}
        <Step n={3} title="Use Humax widgets — no styling needed">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Import <Pill text="humax_design_system" /> and compose screens
            directly from Humax widgets. Tokens are wired in — you only specify
            semantics (variant, size, state), not visual properties.
          </p>
          <CodeBlock code={widgetSnippet} label="lib/screens/login_screen.dart" />
        </Step>

        {/* Step 4 */}
        <Step n={4} title="Overlays: Dialog, SnackBar, BottomSheet">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Overlay components are called via static methods — no extra widget
            tree setup required.
          </p>
          <CodeBlock code={dialogSnippet} label="Overlay components" />
        </Step>

        {/* Step 5 */}
        <Step n={5} title="Regenerate tokens after design changes">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            When <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">tokens/</code> JSON
            changes (Figma → JSON export), rebuild the Dart constants:
          </p>
          <CodeBlock code={tokenSnippet} label="Terminal" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The build is deterministic — commit the generated{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">tokens.dart</code> so
            CI can verify it matches the JSON source.
          </p>
        </Step>

      </div>

      {/* Available widgets */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Available widgets
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          All exported from{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
            package:humax_design_system/humax_design_system.dart
          </code>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              tier: "Tier 1 — Core",
              items: [
                { name: "HumaxButton", desc: "filled · outlined · text · destructive · loading" },
                { name: "HumaxTextField", desc: "label, hint, error, readOnly, obscureText, validator" },
                { name: "HumaxAppBar", desc: "title, leading, actions, bottom slot" },
              ],
            },
            {
              tier: "Tier 2 — Navigation & Form",
              items: [
                { name: "HumaxNavigationBar", desc: "2–5 destinations, indicator color, semantics" },
                { name: "HumaxTabBar", desc: "fixed / scrollable, .asPreferredSize() factory" },
                { name: "HumaxCheckbox", desc: "tristate, isError, full-row touch target" },
                { name: "HumaxRadioGroup<T>", desc: "generic, type-safe, column of RadioListTile" },
                { name: "HumaxSwitch", desc: "optional thumb icons (check/close)" },
              ],
            },
            {
              tier: "Tier 3 — Overlays & Feedback",
              items: [
                { name: "HumaxBottomSheet.show()", desc: "modal sheet, drag handle, scrim token" },
                { name: "HumaxDialog.show()", desc: "alert · destructive, barrierDismissible" },
                { name: "HumaxSnackBar.show()", desc: "default · error, action, 4s/10s duration" },
              ],
            },
          ].map((group) => (
            <div
              key={group.tier}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3"
            >
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {group.tier}
              </p>
              {group.items.map((item) => (
                <div key={item.name}>
                  <code className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {item.name}
                  </code>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Available token constants */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Token constants
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          From{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
            package:humax_design_tokens/humax_design_tokens.dart
          </code>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: "HumaxColors",
              desc: "Light mode semantic colors (background, text, border, action, feedback)",
            },
            {
              name: "HumaxDarkColors",
              desc: "Dark mode equivalents — same property names as HumaxColors",
            },
            {
              name: "HumaxSpace",
              desc: "Spacing scale — none, xs, sm, md, lg, xl, twoXl, threeXl, fourXl",
            },
            { name: "HumaxRadius", desc: "Border radius scale — none through full" },
            { name: "HumaxFontSize", desc: "Font size scale — xs through fourXl" },
            { name: "HumaxFontWeight", desc: "regular, medium, semibold, bold" },
            { name: "HumaxLineHeight", desc: "Line height scale — none through loose" },
            {
              name: "HumaxTextStyle",
              desc: "TextStyle presets — headingLg, headingMd, bodyMd, bodySm, labelMd, labelSm",
            },
            {
              name: "HumaxDuration",
              desc: "Animation durations — fast (150ms), normal (300ms), slow (500ms)",
            },
            {
              name: "HumaxCurve",
              desc: "Animation curves — easeInOut, easeOut, easeIn",
            },
            { name: "HumaxShadow", desc: "BoxShadow lists — none, sm, md, lg, xl, inner" },
            { name: "HumaxFocusRing", desc: "Focus ring thickness and offset" },
          ].map((c) => (
            <div
              key={c.name}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <code className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                {c.name}
              </code>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Example app callout */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
        <h2 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
          See it in action — Example App
        </h2>
        <p className="text-sm text-emerald-800 dark:text-emerald-400 mb-3">
          <code className="font-mono bg-emerald-100 dark:bg-emerald-900/40 px-1 rounded">
            apps/example_app/
          </code>{" "}
          contains two complete screens built exclusively from{" "}
          <code className="font-mono bg-emerald-100 dark:bg-emerald-900/40 px-1 rounded">
            humax_design_tokens
          </code>{" "}
          +{" "}
          <code className="font-mono bg-emerald-100 dark:bg-emerald-900/40 px-1 rounded">
            humax_design_system
          </code>
          . Run them to verify the full widget stack before integrating into
          your app.
        </p>
        <pre className="text-sm font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-3">
          {`cd apps/example_app\nflutter pub get\nflutter run`}
        </pre>
        <ul className="text-sm text-emerald-800 dark:text-emerald-400 mt-3 space-y-1 list-disc list-inside">
          <li>
            <strong>Screen 1 — Login:</strong> AppBar · TextField · Button · Dialog · Error state · SnackBar
          </li>
          <li>
            <strong>Screen 2 — Settings:</strong> Switch · BottomSheet · Destructive dialog · Empty state · SnackBar with Undo
          </li>
        </ul>
      </div>

      {/* Next steps */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-indigo-900 dark:text-indigo-300">Next steps</h2>
        <ul className="text-sm text-indigo-800 dark:text-indigo-400 space-y-2 list-disc list-inside">
          <li>
            Browse <strong>Components</strong> for per-component variant tables and token bindings
          </li>
          <li>
            Browse <strong>Flutter Contracts</strong> for the full JSON spec driving each widget
          </li>
          <li>
            Browse <strong>Patterns</strong> for Empty state / Loading / Error state guidance
          </li>
          <li>
            See <strong>Design Tokens</strong> for a full visual token reference
          </li>
        </ul>
      </div>

    </div>
  );
}
