# humax_design_system

Flutter package providing the Humax Design System widgets.

> **Status:** Phase 2 placeholder. Widgets are not yet implemented.

## Planned structure

```
lib/
  humax_design_system.dart         # Barrel export
  src/
    components/                    # Atomic widgets (from contracts/flutter/*)
      button/
      text_field/
      app_bar/
      navigation_bar/
      tab_bar/
      checkbox/
      radio/
      switch/
      bottom_sheet/
      dialog/
      snack_bar/
    patterns/                      # High-level patterns (Phase 2.5)
      empty_state.dart
      skeleton.dart
      error_state.dart
      onboarding.dart
      list_detail.dart
    theme/
      humax_theme.dart              # HumaxTheme.of(context)
```

## Contract-driven

Every widget here is the implementation of the corresponding contract under `../../contracts/flutter/*.contract.json`. When a contract changes, the widget must be updated and golden tests re-run.

## Dependencies

- `humax_design_tokens` (sibling package) — all styling comes from tokens
- `flutter/widgets` — no third-party UI kit dependency
