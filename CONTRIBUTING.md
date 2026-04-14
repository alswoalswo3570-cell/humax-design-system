# Contributing to the Humax Design System

Thank you for contributing. This design system is shared infrastructure — changes affect every product team downstream, so we optimize for **clarity, traceability, and backwards compatibility**.

## Ground rules

1. **JSON under `tokens/` and `contracts/` is the Single Source of Truth.** Flutter Dart, CSS variables, and docs are compiled outputs. Never hand-edit generated files.
2. **Every widget must have a contract.** If you are adding a widget, the contract goes in first.
3. **Breaking changes require a MAJOR version bump and a migration note in `CHANGELOG.md`.** Additive changes are MINOR; internal fixes are PATCH.
4. **All changes go through a PR.** No direct commits to `main`.

## Typical change types

### Adding or modifying a design token

1. Edit the relevant file under `tokens/` (`base.json`, `light.json`, or `dark.json`).
2. Run `npm run build:tokens` — this regenerates Dart constants and CSS variables.
3. Commit **both** the JSON change and the generated output (the build is deterministic; CI will verify).
4. Add a `CHANGELOG.md` entry under `[Unreleased]`.

### Adding or modifying a component contract

1. Edit `contracts/<platform>/<component>.contract.json`.
2. Ensure the contract includes: `purpose`, `whenToUse`, `whenNotToUse`, `variants`, `sizes`, `states`, `accessibility`, `tokenBindings`, `exampleUsage`.
3. If a Flutter implementation exists under `packages/humax_design_system/`, update it to satisfy the new contract — golden tests will otherwise fail.
4. `CHANGELOG.md` entry.

### Adding a new Flutter widget

1. Contract first — see above.
2. Implement under `packages/humax_design_system/lib/src/components/<widget>/`.
3. Naming: `Humax<Name>` (e.g., `HumaxButton`). File layout:
   - `<widget>.dart` — public widget
   - `_styles.dart` — internal styling helpers
   - `_defaults.dart` — default values derived from `HumaxTheme`
4. Tests (all required):
   - Golden test for every `variant × size × state` combination
   - `Semantics` assertion verifying the contract's `accessibility` section
5. Widgetbook story under `apps/example_app/lib/widgetbook/` (once the Widgetbook harness is set up).

### Adding a UI pattern

1. Pattern doc under `patterns/<pattern>.md` — include whenToUse, whenNotToUse, componentList, accessibility notes.
2. Docs page under `src/pages/` (extending `Patterns.tsx` or a new page).
3. If reusable enough, a Flutter pattern widget under `packages/humax_design_system/lib/src/patterns/`.

## Review ownership

See `CODEOWNERS`. In short: token and contract changes require Designer + Senior Dev sign-off. Documentation-only changes need one reviewer.

## Versioning policy

- `humax_design_tokens` and `humax_design_system` follow independent SemVer.
- A breaking contract change implies a major bump for `humax_design_system`.
- Token renames or removals are breaking. Token additions are non-breaking.

## When in doubt

Open a draft PR with just the question in the description — discussion in context beats discussion in isolation.
