# Changelog

All notable changes to the Humax Design System are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/) per package — see each package's `pubspec.yaml` / `package.json`.

## [Unreleased]

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
