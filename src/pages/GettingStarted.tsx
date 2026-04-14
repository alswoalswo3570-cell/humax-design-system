export default function GettingStarted() {
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const pubspecSnippet = `dependencies:
  flutter:
    sdk: flutter
  humax_design_tokens:
    path: ../path/to/repo/packages/humax_design_tokens`;

  const themeSnippet = `import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: HumaxColors.actionPrimaryDefault,
        ),
        textTheme: TextTheme(
          bodyMedium: HumaxTextStyle.bodyMd,
          bodySmall: HumaxTextStyle.bodySm,
          labelMedium: HumaxTextStyle.labelMd,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}`;

  const buttonSnippet = `import 'package:humax_design_tokens/humax_design_tokens.dart';

// Primary button — using token colors directly
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: HumaxColors.actionPrimaryDefault,
    foregroundColor: HumaxColors.actionPrimaryText,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(HumaxRadius.md),
    ),
    padding: const EdgeInsets.symmetric(
      horizontal: HumaxSpace.lg,
      vertical: HumaxSpace.sm,
    ),
    textStyle: HumaxTextStyle.labelMd,
    elevation: 0,
  ),
  child: const Text('Save changes'),
)`;

  const textFieldSnippet = `import 'package:humax_design_tokens/humax_design_tokens.dart';

TextField(
  decoration: InputDecoration(
    labelText: 'Email address',
    hintText: 'you@example.com',
    filled: true,
    fillColor: HumaxColors.backgroundSurface,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(HumaxRadius.md),
      borderSide: BorderSide(color: HumaxColors.borderDefault),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(HumaxRadius.md),
      borderSide: BorderSide(
        color: HumaxColors.borderFocus,
        width: HumaxFocusRing.thickness,
      ),
    ),
    contentPadding: const EdgeInsets.symmetric(
      horizontal: HumaxSpace.md,
      vertical: HumaxSpace.sm,
    ),
  ),
  style: HumaxTextStyle.bodyMd.copyWith(color: HumaxColors.textPrimary),
)`;

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
        <pre className="text-sm font-mono text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <div className="flex gap-6">
      <div className="flex-none">
        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {n}
        </div>
      </div>
      <div className="flex-1 space-y-4 pb-8 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Getting Started</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          From zero to a token-powered Flutter screen in under 5 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
        <h2 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Prerequisites</h2>
        <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1 list-disc list-inside">
          <li>Flutter SDK ≥ 3.0 installed</li>
          <li>Node.js ≥ 18 (for running <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">npm run build:tokens</code>)</li>
          <li>This repository cloned locally</li>
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        <Step n={1} title="Add the token package to your pubspec.yaml">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">humax_design_tokens</code> package
            is a local path dependency — no pub.dev publishing required.
          </p>
          <CodeBlock code={pubspecSnippet} label="pubspec.yaml" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Then run <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">flutter pub get</code>.
          </p>
        </Step>

        <Step n={2} title="Wire up the theme in main.dart">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Import <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">humax_design_tokens</code> and
            use token values in your <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">ThemeData</code>.
          </p>
          <CodeBlock code={themeSnippet} label="main.dart" />
        </Step>

        <Step n={3} title="Use token constants in your widgets">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Reference <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">HumaxColors</code>,{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">HumaxSpace</code>,{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">HumaxRadius</code>, and others
            directly in your widget code.
          </p>
          <CodeBlock code={buttonSnippet} label="Primary button using tokens" />
          <CodeBlock code={textFieldSnippet} label="TextField using tokens" />
        </Step>

        <Step n={4} title="Regenerate tokens after design changes">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            When <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">tokens/</code> JSON changes,
            regenerate the Dart constants:
          </p>
          <CodeBlock code={`# From the repo root\nnpm run build:tokens\n\n# Then in your Flutter project\nflutter pub get`} label="Terminal" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The build is deterministic — committing the generated{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">tokens.dart</code> is intentional
            so CI can verify the build is up to date.
          </p>
        </Step>
      </div>

      {/* Available constants */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available constants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "HumaxColors", desc: "Light mode semantic colors (background, text, border, action, feedback)" },
            { name: "HumaxDarkColors", desc: "Dark mode equivalents of HumaxColors" },
            { name: "HumaxSpace", desc: "Spacing scale — none, xs, sm, md, lg, xl, twoXl, threeXl, fourXl" },
            { name: "HumaxRadius", desc: "Border radius scale — none through full" },
            { name: "HumaxFontSize", desc: "Font size scale — xs through fourXl" },
            { name: "HumaxFontWeight", desc: "regular, medium, semibold, bold" },
            { name: "HumaxLineHeight", desc: "Line height scale — none through loose" },
            { name: "HumaxTextStyle", desc: "Semantic TextStyle presets — headingLg, headingMd, bodyMd, bodySm, labelMd, labelSm" },
            { name: "HumaxDuration", desc: "Animation durations — fast (150ms), normal (300ms), slow (500ms)" },
            { name: "HumaxCurve", desc: "Animation curves — easeInOut, easeOut, easeIn" },
            { name: "HumaxShadow", desc: "BoxShadow lists — none, sm, md, lg, xl, inner" },
            { name: "HumaxFocusRing", desc: "Focus ring thickness and offset" },
          ].map(c => (
            <div key={c.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <code className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">{c.name}</code>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-indigo-900 dark:text-indigo-300">Next steps</h2>
        <ul className="text-sm text-indigo-800 dark:text-indigo-400 space-y-2 list-disc list-inside">
          <li>Browse <strong>Components</strong> for per-component token binding tables</li>
          <li>Browse <strong>Flutter Contracts</strong> for the full JSON spec of each widget</li>
          <li>Browse <strong>Patterns</strong> for Empty state / Loading / Error state implementation guidance</li>
          <li>See <strong>Design Tokens</strong> for a full visual token reference</li>
        </ul>
      </div>
    </div>
  );
}
