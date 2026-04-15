import { Link } from "react-router-dom";
import {
  Smartphone,
  Maximize,
  Touchpad,
  Keyboard,
  Layers,
  ArrowDownToLine,
  ArrowRight,
  Code2,
} from "lucide-react";
import baseTokens from "../../tokens/base.json";

// ── Token-sourced helpers ────────────────────────────────────────────────────

type Tier = "compact" | "medium" | "expanded";

const breakpoint = baseTokens.breakpoint as Record<Tier, string>;
const grid       = baseTokens.grid       as Record<Tier, { margin: string; gutter: string; columns: number }>;

const px = (s: string) => parseFloat(s);                      // "20px" → 20
const stripPx = (s: string) => s.replace(/px$/, "");           // "20px" → "20"

const tierLabel: Record<Tier, { name: string; device: string; range: string }> = {
  compact:  { name: "Compact",  device: "Mobile",  range: `0 – ${px(breakpoint.medium) - 1}dp` },
  medium:   { name: "Medium",   device: "Tablet",  range: `${px(breakpoint.medium)} – ${px(breakpoint.expanded) - 1}dp` },
  expanded: { name: "Expanded", device: "Desktop", range: `${px(breakpoint.expanded)}dp+` },
};

// ── Code snippets ────────────────────────────────────────────────────────────

const flutterUsage = `import 'package:humax_design_system/humax_design_system.dart';

@override
Widget build(BuildContext context) {
  // 1. Get the current breakpoint tier
  final bp = context.humaxBreakpoint;        // .compact | .medium | .expanded

  // 2. Pull the grid spec for that tier
  final tier = HumaxGrid.forBreakpoint(bp);  // { margin, gutter, columns }

  return Padding(
    padding: EdgeInsets.symmetric(horizontal: tier.margin),
    child: Column(
      children: [
        Text('Adaptive padding', style: HumaxTextStyle.titleLarge),
        SizedBox(height: HumaxSpace.m),       // 16dp, Moni spacing
        // …
      ],
    ),
  );
}`;

const responsiveSwitch = `// Different layout per breakpoint
Widget build(BuildContext context) {
  return switch (context.humaxBreakpoint) {
    HumaxBreakpoint.compact  => const MobileLayout(),
    HumaxBreakpoint.medium   => const TabletLayout(),
    HumaxBreakpoint.expanded => const DesktopLayout(),
  };
}`;

// ── Reusable bits ────────────────────────────────────────────────────────────

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-xs font-mono text-gray-300">{label}</span>
        <button
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-0.5 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-gray-200 leading-relaxed overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Visual grid preview for the compact tier, matching the Moni Style Guide spec
// (margin 20dp · 4 cols × 74dp · gutter 8dp on a 360dp viewport).
function CompactGridVisual() {
  const marginDp  = px(grid.compact.margin);
  const gutterDp  = px(grid.compact.gutter);
  const columns   = grid.compact.columns;
  const screenDp  = 360;
  const totalGutter = gutterDp * (columns - 1);
  const columnDp  = (screenDp - 2 * marginDp - totalGutter) / columns;

  // Render as percentages of screenDp so the visual is scale-independent.
  const pct = (dp: number) => `${(dp / screenDp) * 100}%`;

  return (
    <div className="bg-gray-100 dark:bg-gray-800/60 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Compact (360dp) grid preview
        </h3>
        <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
          margin {marginDp} · gutter {gutterDp} · {columns} cols @ {columnDp}dp
        </div>
      </div>

      {/* Labels row */}
      <div
        className="grid text-[10px] font-mono"
        style={{
          gridTemplateColumns: `${pct(marginDp)} repeat(${columns}, 1fr) ${pct(marginDp)}`,
          columnGap: 0,
        }}
      >
        <span className="text-center text-red-600 dark:text-red-400">{marginDp}</span>
        {Array.from({ length: columns }).map((_, i) => (
          <span key={`lbl-${i}`} className="text-center text-sky-600 dark:text-sky-400">
            {columnDp}
          </span>
        ))}
        <span className="text-center text-red-600 dark:text-red-400">{marginDp}</span>
      </div>

      {/* Bars */}
      <div className="flex h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 mt-1">
        <div
          className="bg-red-400/40 border-r border-red-500/40"
          style={{ width: pct(marginDp) }}
          title={`margin ${marginDp}dp`}
        />
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex items-stretch" style={{ width: pct(columnDp + (i < columns - 1 ? gutterDp : 0)) }}>
            <div className="bg-sky-300/50 dark:bg-sky-500/30" style={{ width: pct(columnDp) }} />
            {i < columns - 1 && (
              <div
                className="bg-amber-300/60 dark:bg-amber-400/30"
                style={{ width: pct(gutterDp) }}
                title={`gutter ${gutterDp}dp`}
              />
            )}
          </div>
        ))}
        <div
          className="bg-red-400/40 border-l border-red-500/40"
          style={{ width: pct(marginDp) }}
          title={`margin ${marginDp}dp`}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        <LegendSwatch color="bg-red-400/70"   label={`Margin · ${marginDp}dp`} />
        <LegendSwatch color="bg-sky-400/70"   label={`Column · ${columnDp}dp`} />
        <LegendSwatch color="bg-amber-400/80" label={`Gutter · ${gutterDp}dp`} />
      </div>
    </div>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="font-mono text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LayoutGrid() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Layout &amp; Grid
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Token-driven breakpoints, grid, and safe-area rules. Values below are
          pulled directly from <code className="font-mono text-sm">tokens/base.json</code>,
          so this page and the Flutter runtime stay in lock-step.
        </p>
      </div>

      {/* ── Viewports & Breakpoints ────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Maximize className="w-6 h-6 text-indigo-500" />
            Viewports &amp; Breakpoints
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Resolve at runtime via{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
              context.humaxBreakpoint
            </code>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(tierLabel) as Tier[]).map((tier) => (
            <div
              key={tier}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                {tierLabel[tier].name} · {tierLabel[tier].device}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-mono">
                {tierLabel[tier].range}
              </div>
              <code className="text-xs font-mono text-gray-500 dark:text-gray-400 block mb-3">
                HumaxBreakpoint.{tier}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tier === "compact"  && "Default mobile. Single column, bottom navigation preferred."}
                {tier === "medium"   && "Small tablets and foldables. Navigation rail or two-pane."}
                {tier === "expanded" && "Large tablets / desktop. Multi-column, persistent side nav."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Grid System ──────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-500" />
            Grid System
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Values from{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
              baseTokens.grid
            </code>
            . Access in Flutter via{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
              HumaxGrid.forBreakpoint(bp)
            </code>
            .
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Property</th>
                {(Object.keys(tierLabel) as Tier[]).map((t) => (
                  <th key={t} className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    {tierLabel[t].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Margin (side padding)
                </td>
                {(Object.keys(tierLabel) as Tier[]).map((t) => (
                  <td key={t} className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                    {stripPx(grid[t].margin)}dp
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Gutter (between columns)
                </td>
                {(Object.keys(tierLabel) as Tier[]).map((t) => (
                  <td key={t} className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                    {stripPx(grid[t].gutter)}dp
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Columns</td>
                {(Object.keys(tierLabel) as Tier[]).map((t) => (
                  <td key={t} className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                    {grid[t].columns}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Breakpoint width</td>
                {(Object.keys(tierLabel) as Tier[]).map((t) => (
                  <td key={t} className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                    ≥ {stripPx(breakpoint[t])}dp
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-lg px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
          <strong>Compact</strong> values are sourced from the Moni Style Guide (2024-04-19).{" "}
          <strong>Medium &amp; Expanded</strong> are the Humax Design System team's{" "}
          <strong>proposal</strong>, aligned with Material 3 conventions — pending design review.
          Adjust in <code className="font-mono">tokens/base.json</code> once ratified.
        </div>

        <CompactGridVisual />
      </section>

      {/* ── Spacing reference ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Spacing scale (4dp grid)
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Seven-value Moni scale, every step a multiple of <strong>4dp</strong>. Access via{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">HumaxSpace.*</code>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-lg px-4 py-3">
            <div className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1">8dp grid — primary</div>
            <div className="text-gray-600 dark:text-gray-300 font-mono">
              xs · m · xl · xxl <span className="text-gray-400">(8 · 16 · 24 · 32)</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Default for component padding, section gaps, screen margins.
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40 rounded-lg px-4 py-3">
            <div className="font-semibold text-purple-900 dark:text-purple-200 mb-1">4dp grid — micro</div>
            <div className="text-gray-600 dark:text-gray-300 font-mono">
              xxs · s · l <span className="text-gray-400">(4 · 12 · 20)</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Use for tight vertical rhythm and text-to-icon alignment.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {Object.entries(baseTokens.space)
            .filter(([k]) => k !== "none")
            .map(([k, v]) => {
              const dp = px(v as string);
              return (
                <div
                  key={k}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col items-center"
                >
                  <div
                    className="bg-indigo-500/80 rounded-sm mb-2"
                    style={{ width: `${Math.min(dp, 40)}px`, height: `${Math.min(dp, 40)}px` }}
                  />
                  <code className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {k}
                  </code>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{dp}dp</span>
                </div>
              );
            })}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mt-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Vertical rhythm — Moni reference screen
          </h3>
          <div className="flex items-center gap-6">
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 flex-1">
              <li className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs text-gray-500">Top</span>
                <code className="font-mono text-indigo-600 dark:text-indigo-400">HumaxSpace.m</code>
                <span className="text-gray-400 text-xs">(16dp)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs text-gray-500">Between</span>
                <code className="font-mono text-indigo-600 dark:text-indigo-400">HumaxSpace.s</code>
                <span className="text-gray-400 text-xs">(12dp)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs text-gray-500">Bottom</span>
                <code className="font-mono text-indigo-600 dark:text-indigo-400">HumaxSpace.l</code>
                <span className="text-gray-400 text-xs">(20dp)</span>
              </li>
            </ul>
            <div className="w-24 h-56 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md relative flex flex-col">
              <div className="h-[16px] bg-red-400/40 border-b border-red-500/40" title="Top 16dp" />
              <div className="flex-1 bg-sky-200/40 dark:bg-sky-800/30" />
              <div className="h-[12px] bg-amber-300/60 border-y border-amber-500/40" title="Between 12dp" />
              <div className="flex-1 bg-sky-200/40 dark:bg-sky-800/30" />
              <div className="h-[20px] bg-red-400/40 border-t border-red-500/40" title="Bottom 20dp" />
            </div>
          </div>
        </div>
        <Link
          to="/tokens"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          All tokens → <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ── Using it in Flutter ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-500" />
            Using it in Flutter
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeBlock label="adaptive_padding.dart" code={flutterUsage} />
          <CodeBlock label="adaptive_layout.dart"  code={responsiveSwitch} />
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside pt-2">
          <li>
            <code className="font-mono">context.humaxBreakpoint</code> subscribes to{" "}
            <code className="font-mono">MediaQuery.sizeOf</code> — your widget rebuilds when the
            viewport crosses a threshold (device rotation, window resize).
          </li>
          <li>
            <code className="font-mono">HumaxGrid.forBreakpoint(bp)</code> returns an immutable
            tier struct — cheap to call every build.
          </li>
          <li>
            Widgets never hard-code pixel values — always bind to{" "}
            <code className="font-mono">HumaxSpace</code> or{" "}
            <code className="font-mono">tier.margin</code>.
          </li>
        </ul>
      </section>

      {/* ── Safe Area ────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-indigo-500" />
            Safe Area &amp; System Insets
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Mobile hardware (notches, status bars, home indicators) can obscure content.
              Wrap scrollable screens in Flutter's <code className="font-mono">SafeArea</code>.
            </p>
            <ul className="space-y-3">
              <DoDont ok>
                Wrap the main scrollable body of a screen in a <code className="font-mono">SafeArea</code>.
              </DoDont>
              <DoDont ok>
                Let background color/image bleed into edges — pass{" "}
                <code className="font-mono">bottom: false</code> when a bottom nav handles the inset.
              </DoDont>
              <DoDont>
                Place interactive buttons or text flush against the very top/bottom without inset padding.
              </DoDont>
            </ul>
          </div>

          {/* Phone mockup */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center">
            <div className="w-64 aspect-[390/844] bg-white dark:bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 dark:border-black relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 dark:bg-black rounded-b-3xl z-20" />
              <div className="absolute top-0 left-0 right-0 h-10 bg-red-500/20 border-b border-red-500/50 flex items-end justify-center pb-1 z-10">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-400">Unsafe · Status bar</span>
              </div>
              <div className="absolute top-10 bottom-8 left-0 right-0 bg-green-500/10 border-y border-green-500/50 flex items-center justify-center p-4">
                <div className="text-center">
                  <span className="text-sm font-bold text-green-700 dark:text-green-400 block mb-2">Safe area</span>
                  <div className="w-full h-32 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
                    <span className="text-xs text-gray-500">Scrollable content</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-500/20 border-t border-red-500/50 flex items-start justify-center pt-1 z-10">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-400">Unsafe · Home indicator</span>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-800 dark:bg-gray-300 rounded-full z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Touch targets ────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Touchpad className="w-6 h-6 text-indigo-500" />
            Touch Targets &amp; Interactive Spacing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Interactive elements must meet minimum size and spacing for accessibility.
            </p>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Minimum touch target: 48×48dp
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The tappable area must be ≥ 48×48dp even when the glyph is smaller (e.g. 24dp icon).
              </p>
              <div className="flex items-center gap-8">
                <div className="relative w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 border-dashed rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white">
                    <Touchpad className="w-3 h-3" />
                  </div>
                  <div className="absolute -right-16 text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                    48dp
                  </div>
                  <div className="absolute right-0 top-1/2 w-14 h-px bg-indigo-300 dark:bg-indigo-700" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Interactive spacing: 8dp minimum (<code className="font-mono">HumaxSpace.xs</code>)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Separate distinct interactive elements by at least 8dp to prevent mis-taps.
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md text-sm font-medium">
                  Button 1
                </button>
                <div className="w-2 h-8 bg-red-200 dark:bg-red-900/50 border-x border-red-400 flex items-center justify-center relative">
                  <span className="absolute -top-5 text-[10px] text-red-600 dark:text-red-400 font-mono">
                    8dp
                  </span>
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md text-sm font-medium">
                  Button 2
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom coexistence ───────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowDownToLine className="w-6 h-6 text-indigo-500" />
            Bottom Elements Coexistence
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Mobile interfaces frequently stack elements at the bottom. Plan z-ordering and extra
          content padding to keep the last item reachable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CoexistTile
            title="1. Fixed bottom CTA"
            description="Add bottom padding to the scroll view = CTA height + safe area."
          >
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
            <div className="absolute bottom-16 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3 pb-5">
              <div className="h-10 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-medium">
                Primary Action
              </div>
            </div>
          </CoexistTile>
          <CoexistTile
            title="2. Navigation bar"
            description="Scaffold handles body padding automatically with bottomNavigationBar."
          >
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-14 pb-2 flex justify-around items-center">
              <div className="w-6 h-6 bg-indigo-200 dark:bg-indigo-900/50 rounded-full" />
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </CoexistTile>
          <CoexistTile
            title="3. Bottom sheet overlay"
            description="Modal sheets sit above NavigationBar and FABs."
          >
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 z-10" />
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl h-32 z-20 shadow-lg">
              <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-2" />
              <div className="p-4 space-y-3 mt-2">
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          </CoexistTile>
        </div>
      </section>

      {/* ── Keyboard & Forms ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-indigo-500" />
            Keyboard &amp; Form Layout
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              The software keyboard consumes roughly 50% of the viewport. Forms must keep inputs
              and CTAs reachable while typing.
            </p>
            <ul className="space-y-3">
              <DoDont ok>
                Wrap forms in a <code className="font-mono">SingleChildScrollView</code> so hidden
                inputs remain scrollable.
              </DoDont>
              <DoDont ok>
                Keep the primary Submit/Next button visible. If it's a fixed bottom CTA, enable{" "}
                <code className="font-mono">resizeToAvoidBottomInset</code> so it floats above the keyboard.
              </DoDont>
              <DoDont>
                Place critical context or instructions at the very bottom of a long form — they'll
                stay permanently hidden while typing.
              </DoDont>
            </ul>
            <Link
              to="/patterns"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors pt-2"
            >
              See Form Submit + Error pattern <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Phone mockup with floating CTA */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center">
            <div className="w-64 aspect-[390/844] bg-white dark:bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 dark:border-black relative overflow-hidden shadow-xl flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 dark:bg-black rounded-b-3xl z-50" />
              <div className="h-20 pt-8 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 shrink-0">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Edit profile</span>
              </div>
              <div className="flex-1 p-4 space-y-4 relative -top-12">
                <div className="space-y-1">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-full bg-white dark:bg-gray-900 border-2 border-indigo-500 rounded flex items-center px-2">
                    <div className="w-px h-5 bg-indigo-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[180px] left-0 right-0 p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="h-10 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-medium">
                  Save changes
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-2 flex flex-col gap-2">
                <div className="flex justify-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
                  ))}
                </div>
                <div className="flex justify-center gap-1 px-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
                  ))}
                </div>
                <div className="flex justify-center gap-1 px-6">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm" />
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
                  ))}
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm" />
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-10 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm" />
                  <div className="w-24 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
                  <div className="w-10 h-8 bg-indigo-500 rounded shadow-sm flex items-center justify-center text-white text-[10px]">
                    Done
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1 inset-x-0 h-5 flex justify-center items-end pb-2 z-50 pointer-events-none">
                <div className="w-28 h-1 bg-gray-400 dark:bg-gray-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Small reusable bits used inline ──────────────────────────────────────────

function DoDont({
  ok = false,
  children,
}: {
  ok?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          ok
            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
        }`}
      >
        {ok ? "✓" : "✗"}
      </div>
      <span className="text-gray-700 dark:text-gray-300">
        <strong>{ok ? "Do:" : "Don't:"}</strong> {children}
      </span>
    </li>
  );
}

function CoexistTile({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="w-48 h-64 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg relative overflow-hidden shadow-sm">
        {children}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">{description}</p>
    </div>
  );
}
