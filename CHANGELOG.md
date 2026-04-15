# Changelog

All notable changes to the Humax Design System are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/) per package — see each package's `pubspec.yaml` / `package.json`.

## [Unreleased]

### Spacing + Breakpoint + Grid — Moni Style Guide alignment (2026-04-15) — Phase B

**Breaking change** for `HumaxSpace.*` identifiers. All 69 widget + example_app callsites migrated mechanically.

**Spacing — 8 values matching Moni 4dp grid**

| Old | px | New | px |
| --- | --- | --- | --- |
| `xs` | 4 | `xxs` | 4 |
| `sm` | 8 | `xs` | 8 |
| — | — | `s` | **12 (new)** |
| `md` | 16 | `m` | 16 |
| — | — | `l` | **20 (new)** |
| `lg` | 24 | `xl` | 24 |
| `xl` | 32 | `xxl` | 32 |
| `twoXl` / `threeXl` / `fourXl` | 48 / 64 / 96 | ❌ removed | — |

Callsites previously using 48/64/96 (3 total: `login_screen.dart` ×2, `error_state.dart` ×1) were migrated to `xxl` (32) per Moni guidance — slight vertical compression by design.

**New — Breakpoints**
- `tokens/base.json` → `breakpoint` section (compact 0 / medium 600 / expanded 840)
- Generated `HumaxBreakpoints` class (const doubles) + `HumaxBreakpoint` enum (compact/medium/expanded)
- New `packages/humax_design_system/lib/src/layout/breakpoint.dart`:
  - `humaxBreakpointOf(BuildContext)` → current tier
  - `context.humaxBreakpoint` extension for fluent access

**New — Grid (3 tiers)**
- `tokens/base.json` → `grid` section per breakpoint:
  - compact:  margin 20, gutter 8, columns 4 (Moni-verified)
  - medium:   margin 24, gutter 16, columns 8 (Material 3 guidance, awaiting Moni spec)
  - expanded: margin 32, gutter 24, columns 12 (Material 3 guidance, awaiting Moni spec)
- Generated `HumaxGridTier` immutable struct + `HumaxGrid` class with `compact` / `medium` / `expanded` consts and `HumaxGrid.forBreakpoint(bp)` switch helper

**Build pipeline**
- `tools/build-tokens/build.mjs`:
  - New `genBreakpointClasses` — emits both consts and enum
  - New `genGridClasses` — emits `HumaxGridTier` struct, tier consts, and `forBreakpoint` switch

**Barrel export**
- `packages/humax_design_system/lib/humax_design_system.dart` re-exports `HumaxBreakpoint`, `HumaxBreakpoints`, `HumaxGrid`, `HumaxGridTier` from tokens package for ergonomic imports.

### Dark-mode infrastructure — `HumaxTheme` (2026-04-15) — Phase A

**Breaking change** for direct consumers of the static `HumaxColors.*` API: widget code and apps should now read colors via `context.humaxColors.*` so that light/dark modes auto-switch.

**New**
- `HumaxColorScheme` — immutable struct mirroring all 58 semantic color fields, auto-generated in `packages/humax_design_tokens/lib/src/tokens.dart` alongside light/dark factories
- `HumaxTheme` InheritedWidget + `HumaxTheme.of(context)` / `HumaxTheme.maybeOf(context)` / `BuildContextHumaxTheme.humaxColors` extension under `packages/humax_design_system/lib/src/theme/humax_theme.dart`
- Falls back to deriving scheme from `Theme.of(context).brightness` when no `HumaxTheme` ancestor is present — existing apps won't crash
- Field-parity + ancestor resolution tests at `packages/humax_design_system/test/theme/humax_theme_test.dart`
- Barrel export re-exports `HumaxColorScheme` for ergonomics

**Build pipeline**
- `tools/build-tokens/build.mjs` now emits `HumaxColorScheme` + `.light()` / `.dark()` factories and throws loudly if light/dark keys drift

**Migration (internal API-compatible)**
- All 11 widgets + 3 patterns: internal color reads switched from `HumaxColors.*` to `context.humaxColors.*`. Public widget APIs unchanged.
- Getters returning `WidgetStateProperty` (checkbox, radio, switch) refactored to methods that accept `HumaxColorScheme` — internal only.
- `HumaxButtonStyles.styleFor`/`backgroundFor`/etc. now take `HumaxColorScheme c` as first parameter (internal, only consumed by `HumaxButton`).
- `HumaxBottomSheet.decoration` / `.dragHandle` getters replaced by `decorationOf(context)` / `dragHandleOf(context)` methods **(breaking — but zero external consumers at 0.1.0)**.
- `HumaxAppBar.sliver(...)` now requires `context` as a named parameter **(breaking for direct callers — none exist yet)**.
- `apps/example_app/lib/main.dart` wraps the tree with `HumaxTheme` in `MaterialApp.builder`, switching on `Theme.of(context).brightness`.

**Bug fixes surfaced during migration**
- `snack_bar.dart` referenced non-existent `HumaxColors.feedbackErrorBg` → corrected to `feedbackErrorBackground`
- `settings_screen.dart` referenced non-existent `HumaxColors.feedbackErrorDefault` (×2) → corrected to `actionDestructiveDefault`
- `main.dart` referenced non-existent `HumaxColors.backgroundBase` → corrected to `backgroundPage`

### Typography — Moni Style Guide alignment (2026-04-15)

**Breaking change** to `HumaxTextStyle`. All 6 legacy keys renamed to Moni naming; 9 new styles added. Widget callsites migrated.

**Font family**
- Primary: **Archivo** (English / numbers)
- Fallback: **Noto Sans** (Korean / special symbols)
- Applied via `fontFamily` + `fontFamilyFallback` on every `HumaxTextStyle` constant

**Text style set — 15 tokens matching Moni Style Guide 2024-04-19**

| Token | Size / LH / Weight |
| --- | --- |
| `headlineLarge` | 32 / 40 / 700 |
| `headlineMedium` | 28 / 36 / 700 |
| `headlineSmall` | 24 / 32 / 700 |
| `titleLarge` | 20 / 28 / 700 |
| `titleMedium` | 18 / 26 / 700 |
| `titleSmall` | 16 / 24 / 700 |
| `titlePoint` | 16 / 24 / 500 |
| `bodyTitle` | 14 / 18 / 700 |
| `bodyPoint` | 14 / 18 / 500 |
| `bodyCommon` | 14 / 18 / 400 |
| `captionTitle` | 12 / 16 / 700 |
| `captionPoint` | 12 / 16 / 500 |
| `captionPointUnderline` | 12 / 16 / 400 · underline |
| `captionCommon` | 12 / 16 / 400 |
| `captionMiniPoint` | 10 / 14 / 500 |

**Rename migration (applied across widgets + example_app)**

| Legacy | New | Note |
| --- | --- | --- |
| `headingLg` | `headlineSmall` | size identical |
| `headingMd` | `titleLarge` | weight 600 → 700 |
| `bodyMd` | `bodyCommon` | 16→14 px (Moni body baseline) |
| `bodySm` | `captionCommon` | 14→12 px |
| `labelMd` | `bodyPoint` | 14 px Medium |
| `labelSm` | `captionPoint` | 12 px Medium |

**Token scale changes**
- `fontSize`: now px-based (10/12/14/16/18/20/24/28/32), was rem
- `fontWeight`: dropped `semibold` — Moni uses regular/medium/bold only
- `lineHeight`: simplified to `tight/normal/relaxed`; per-style line heights live in `textStyle`
- New class: `HumaxFontFamily` exposing `primary` + `fallback`

**Build pipeline updates (`tools/build-tokens/build.mjs`)**
- `textStyle.lineHeight` now accepts px values (Figma truth) and converts to Flutter height multiplier
- Emits `fontFamily` + `fontFamilyFallback` on every `TextStyle`
- Emits `decoration: TextDecoration.underline` when `textDecoration: "underline"` is present
- Emits `HumaxFontFamily` class when `fontFamily.primary` is set

### Added (Phase 0)
- Monorepo structure: `packages/`, `apps/`, `tools/` scaffolded with placeholder READMEs
- Root `README.md` rewritten as orientation for developers, designers, PMs, and AI agents
- `CONTRIBUTING.md` — how to propose tokens, contracts, widgets
- `CODEOWNERS` — review ownership
- `.gitignore` — extended for Flutter/Dart

### Changed
- Previous `README.md` (AI Studio run instructions) replaced with full system orientation

### Notes
- SSoT (`tokens/`, `contracts/`) and existing React docs (`src/`) are unchanged in this phase.
