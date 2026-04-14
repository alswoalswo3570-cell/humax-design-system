# example_app

Flutter example gallery demonstrating real screens built exclusively with `humax_design_tokens` + `humax_design_system`.

> **Status:** Phase 3 placeholder.

## Purpose

This is the **feedback loop** of the design system. Every screen built here must use only DS widgets. Any gap discovered during implementation is filed as a contract/token issue, not worked around in-app.

## Planned screens

| Priority | Screen | Atoms | Patterns exercised |
|---|---|---|---|
| 1 | Login / Authentication flow | AppBar, TextField, Button, Dialog | Loading, Error, Onboarding |
| 2 | Settings / Profile | AppBar, List, BottomSheet, SnackBar | Empty state, Dark mode toggle |
| 3 | List-detail | NavigationBar, List items | Adaptive (Compact push / Expanded split) |

## Run

(Placeholder — populated when Phase 3 starts.)

```bash
cd apps/example_app
flutter pub get
flutter run
```
