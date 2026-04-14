# UX Guide Project Rules

## Core Principles
- **Machine-readable first**: Include structured definitions (JSON) that AI can read and reuse.
- **Semantic naming**: Use semantic names (`color.text.primary`, `space.md`) instead of raw visual names (`blue500`, `padding16`).
- **Documentation + implementation alignment**: Ensure tokens, rules, and preview examples stay aligned.
- **Minimal but scalable**: Start small, structure for scale.

## Output Expectations for AI Assistants
- **Tokens**: Return valid JSON only unless documentation is explicitly requested.
- **Component contracts**: Return structured JSON or clearly structured markdown.
- **Guide pages**: Return markdown or MDX.
- **Visual prototype/preview**: Generate a self-contained HTML file unless another framework is explicitly requested.
- **Implementation**: Prefer React + TypeScript component structure unless another stack is explicitly requested.
- **Rule**: Do not mix all output formats in a single response unless requested.

## Design Tone
- Clean, practical, modern, enterprise-friendly, low-noise, highly readable.
- Avoid decorative effects, overly playful visuals, flashy marketing style, heavy gradients.

## Token Authoring Rules
- **Naming**: Group by purpose (e.g., `color.background.surface`, `radius.md`).
- **Modes**: Support light and dark mode.
- **Values**: Use realistic, implementation-friendly values.

## Component Authoring Rules
Include: Purpose, When to use, When not to use, Props/variants, Sizes, States, Accessibility, Content rules, Token bindings, Example usage.
