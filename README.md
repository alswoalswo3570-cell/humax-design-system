# Humax Design System

A machine-readable, human-readable, and implementation-ready design system for Humax Networks products. One Single Source of Truth in JSON, compiled into a Flutter package, a human-facing docs site, and an AI context bundle.

## Who this is for

| If you are… | Start here |
|---|---|
| A **Flutter developer** who wants to use the system | [`packages/humax_design_system/README.md`](./packages/humax_design_system/README.md) and the live docs site (`npm run dev`) |
| A **designer or PM** checking component specs | Run the docs site: `npm install && npm run dev`, then open `http://localhost:3000` |
| Someone **extending the system** (new token / component) | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| An **AI coding agent** | [`AGENTS.md`](./AGENTS.md) + `tokens/*.json` + `contracts/**/*.json` |

## Repository map

```
.
├── tokens/                       # Single Source of Truth — design tokens
│   ├── base.json                 #   Typography, space, radius, shadow, motion, focusRing
│   ├── light.json                #   Light-mode colors
│   └── dark.json                 #   Dark-mode colors
│
├── contracts/                    # Single Source of Truth — component specs
│   ├── button.contract.json      #   Web reference contract
│   └── flutter/                  #   Primary platform contracts
│       ├── app_bar, bottom_sheet, checkbox, dialog, navigation_bar,
│       ├── radio, snack_bar, switch, tab_bar, text_field (.contract.json)
│
├── docs/                         # Human docs (overview, foundations)
├── patterns/                     # UI pattern docs (empty state, loading, error, ...)
├── prototype/                    # Standalone HTML prototypes
│
├── src/                          # React/Vite — human-facing docs site
├── index.html, vite.config.ts    # Docs site entry
│
├── packages/                     # ⚙️ Compiled Flutter outputs
│   ├── humax_design_tokens/      #   Auto-generated Dart constants (Phase 1)
│   └── humax_design_system/      #   Flutter widgets (Phase 2)
│
├── apps/
│   └── example_app/              #   Flutter example gallery (Phase 3)
│
├── tools/
│   └── build-tokens/             #   Style Dictionary pipeline (Phase 1)
│
├── AGENTS.md                     # AI agent authoring rules
├── CONTRIBUTING.md               # How to propose changes
├── CHANGELOG.md                  # Release history
└── CODEOWNERS                    # Review ownership
```

## Architecture in one diagram

```
           tokens/  +  contracts/     (JSON — Single Source of Truth)
                         │
        ┌────────────────┼──────────────────┬─────────────────────┐
        ▼                ▼                  ▼                     ▼
 Flutter package    CSS variables      Docs site (React)    AI context bundle
 (Dart widgets +    (src/styles/       (src/pages/*.tsx)    (README + JSON)
  ThemeExtension)    tokens.css)
```

JSON never changes for the consumer — it is compiled. The docs site, the Flutter package, and the AI context all re-generate when JSON changes.

## Run the docs site

**Prerequisites:** Node.js ≥ 18

```bash
npm install
npm run dev
# open http://localhost:3000
```

The docs site reads `tokens/*.json` and `contracts/**/*.json` directly — any edit is reflected on save.

## Run the Flutter packages (Phase 1+)

```bash
# Once Style Dictionary is configured (Phase 1)
npm run build:tokens

# Use the Flutter package in an app
# pubspec.yaml:
#   dependencies:
#     humax_design_tokens:
#       path: ../path/to/this/repo/packages/humax_design_tokens
#     humax_design_system:
#       path: ../path/to/this/repo/packages/humax_design_system
```

## Roadmap

Full roadmap: `C:\Users\mjshin1\.claude\plans\sequential-swinging-firefly.md` (internal).

| Phase | Status | Deliverable |
|---|---|---|
| 0 — Repo structure | 🚧 in progress | Monorepo layout + governance files |
| 1 — Token build pipeline | ⏳ planned | `tools/build-tokens/` emits Dart + CSS |
| 2 — Flutter widget package | ⏳ planned | `HumaxButton`, `HumaxTextField`, `HumaxAppBar`, ... |
| 2.5 — UI pattern layer | ⏳ planned | Empty / Loading / Error state + Onboarding / List-detail |
| 3 — Example app | ⏳ planned | Login flow + Settings screen in Flutter |
| 4 — Docs site upgrade | ⏳ planned | Flutter code snippets, Getting Started page |
| 5 — Governance | ⏳ ongoing | Versioning, RFC process, CODEOWNERS |

## Core principles

See [`AGENTS.md`](./AGENTS.md) for the full authoring rules. In short:

1. **Machine-readable first** — every spec is JSON that AI and build tools can consume.
2. **Semantic naming** — `color.text.primary`, not `blue500`.
3. **SSoT ≠ output** — JSON is the truth; Dart/CSS/docs are compiled.
4. **Contract-driven implementation** — a Flutter widget is valid iff it satisfies its contract (tested via golden + Semantics assertions).
5. **Minimal but scalable** — no speculative abstractions, but structure ready to grow.
