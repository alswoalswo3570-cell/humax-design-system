# humax_design_tokens

Flutter package containing auto-generated design tokens for the Humax Design System.

> **Status:** Phase 1 placeholder. Tokens are not yet generated.

## What lives here

Dart constants and theme extensions compiled from the Single Source of Truth:

- `../../tokens/base.json`
- `../../tokens/light.json`
- `../../tokens/dark.json`

Once the Style Dictionary pipeline under `../../tools/build-tokens/` is configured, this package will export:

- `HumaxColors` — light/dark color constants
- `HumaxSpace` — spacing scale
- `HumaxRadius` — corner radii
- `HumaxShadows` — elevation as `BoxShadow`
- `HumaxTypography` — `TextStyle` presets
- `HumaxMotion` — durations and curves
- `HumaxTheme` — `ThemeExtension` for `HumaxColors`

## Do not edit by hand

Files under `lib/` are generated. Edit `tokens/*.json` at the repo root, then run the build pipeline.
