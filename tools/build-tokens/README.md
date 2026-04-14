# build-tokens

Token compilation pipeline. Reads `tokens/*.json` (the SSoT) and emits:

- `packages/humax_design_tokens/lib/*.dart` — Flutter constants + `ThemeExtension`
- `src/styles/tokens.css` — CSS custom properties for the React docs site

> **Status:** Phase 1 placeholder. Config is not yet written.

## Chosen tool

[Style Dictionary](https://amzn.github.io/style-dictionary/) — industry standard, has Flutter/Dart transforms, supports custom formats for our shadow/motion normalization needs.

## Planned config (`config.js`)

```js
module.exports = {
  source: ['../../tokens/base.json', '../../tokens/light.json', '../../tokens/dark.json'],
  platforms: {
    flutter: {
      transformGroup: 'flutter',
      buildPath: '../../packages/humax_design_tokens/lib/',
      files: [
        { destination: 'tokens.dart', format: 'flutter/class.dart', className: 'HumaxTokens' },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: '../../src/styles/',
      files: [
        { destination: 'tokens.css', format: 'css/variables' },
      ],
    },
  },
};
```

## Custom transforms needed

- `shadow/flutter` — CSS box-shadow string → Flutter `BoxShadow` constructor
- `motion.easing/flutter` — cubic-bezier string → `Cubic(x1, y1, x2, y2)`
- `easing key normalize` — `ease-in-out` → `easeInOut` (Dart identifier friendly)

## Run

(After `npm install`.)

```bash
npm run build:tokens
```

## When to re-run

Every time any file under `tokens/` changes. CI will gate PRs on `npm run build:tokens && git diff --exit-code` to prevent drift.
