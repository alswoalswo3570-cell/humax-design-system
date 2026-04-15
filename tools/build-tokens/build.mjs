/**
 * Humax Design System — Token Build Pipeline
 *
 * Reads tokens/{base,light,dark}.json and emits:
 *   ../../packages/humax_design_tokens/lib/src/tokens.dart
 *   ../../src/styles/tokens.css
 *
 * Run: node build.mjs   (or npm run build from this directory)
 *      npm run build:tokens  (from the repo root)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

const base = JSON.parse(readFileSync(resolve(ROOT, 'tokens/base.json'), 'utf8'));
const light = JSON.parse(readFileSync(resolve(ROOT, 'tokens/light.json'), 'utf8'));
const dark  = JSON.parse(readFileSync(resolve(ROOT, 'tokens/dark.json'),  'utf8'));

// ── Utility ───────────────────────────────────────────────────────────────────

/** "#111827"  →  "Color(0xFF111827)" */
function hexToFlutter(hex) {
  return `Color(0xFF${hex.replace('#', '').toUpperCase()})`;
}

/** "rgba(17, 24, 39, 0.4)"  →  "Color.fromRGBO(17, 24, 39, 0.4)" */
function rgbaToFlutter(value) {
  const m = value.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)/);
  if (!m) return '/* unparsed rgba */';
  const [, r, g, b, a = '1'] = m;
  if (parseFloat(a) === 1) {
    const hex = [r, g, b].map(v => parseInt(v).toString(16).padStart(2, '0')).join('');
    return `Color(0xFF${hex.toUpperCase()})`;
  }
  return `Color.fromRGBO(${r}, ${g}, ${b}, ${a})`;
}

/** Returns the Flutter color expression. Non-const values use Color.fromRGBO. */
function colorToFlutter(value) {
  if (!value || value === 'transparent') return 'Color(0x00000000)';
  if (value.startsWith('#'))    return hexToFlutter(value);
  if (value.match(/^rgba?/))    return rgbaToFlutter(value);
  return `/* unknown color: ${value} */`;
}

/** true if the color expression can be used in a const context */
function isConstColor(value) {
  if (!value || value === 'transparent') return true;
  if (value.startsWith('#')) return true;
  const m = value.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)/);
  if (m) return parseFloat(m[4] ?? '1') === 1; // fromRGBO with alpha is not const
  return false;
}

/** "0.25rem" | "4px"  →  4.0  (assumes 16px base) */
function lengthToDouble(value) {
  if (!value || value === 'none' || value === '0' || value === '0px') return 0.0;
  if (value === '9999px') return 9999.0;
  if (value.endsWith('rem')) return parseFloat(value) * 16;
  if (value.endsWith('px'))  return parseFloat(value);
  return parseFloat(value);
}

/** "400" → "FontWeight.w400" */
function fontWeightToFlutter(value) {
  return `FontWeight.w${value}`;
}

/** "150ms" → 150 */
function durationMs(value) {
  return parseInt(value.replace('ms', ''), 10);
}

/** "cubic-bezier(0.4, 0, 0.2, 1)" → "Cubic(0.4, 0.0, 0.2, 1.0)" */
function easingToFlutter(value) {
  const m = value.match(/cubic-bezier\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*\)/);
  if (!m) return '/* unparsed easing */';
  const nums = m.slice(1).map(n => parseFloat(n).toFixed(1));
  return `Cubic(${nums.join(', ')})`;
}

/**
 * "ease-in-out" → "easeInOut"
 * "2xl"         → "twoXl"
 * "3xl"         → "threeXl"
 */
function toDartId(key) {
  const numPrefix = { '2': 'two', '3': 'three', '4': 'four', '5': 'five' };
  let id = key.replace(/^(\d+)(.+)/, (_, n, rest) => {
    const prefix = numPrefix[n] || `x${n}`;
    return prefix + rest.charAt(0).toUpperCase() + rest.slice(1);
  });
  id = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return id;
}

/**
 * Parse a CSS box-shadow string into a Dart List<BoxShadow> literal.
 * Handles multi-layer shadows (comma-separated) and inset.
 *
 * "0 1px 2px 0 rgba(0,0,0,0.05)"
 * → "[\n    BoxShadow(...),\n  ]"
 */
function shadowToFlutter(cssValue) {
  if (cssValue === 'none') return '[]';

  // Split layers on commas NOT inside parentheses
  const layers = [];
  let depth = 0, start = 0;
  for (let i = 0; i < cssValue.length; i++) {
    if (cssValue[i] === '(') depth++;
    else if (cssValue[i] === ')') depth--;
    else if (cssValue[i] === ',' && depth === 0) {
      layers.push(cssValue.slice(start, i).trim());
      start = i + 1;
    }
  }
  layers.push(cssValue.slice(start).trim());

  const parsed = layers.map(layer => {
    const inset = layer.startsWith('inset');
    if (inset) layer = layer.replace(/^inset\s*/, '');

    // Pull out the color token (rgba/rgb or #hex at end)
    let colorStr = '';
    const rgbaMatch = layer.match(/(rgba?\([^)]+\))\s*$/);
    const hexMatch  = layer.match(/(#[0-9a-fA-F]{3,8})\s*$/);
    if (rgbaMatch) {
      colorStr = rgbaMatch[1];
      layer = layer.replace(rgbaMatch[0], '').trim();
    } else if (hexMatch) {
      colorStr = hexMatch[1];
      layer = layer.replace(hexMatch[0], '').trim();
    }

    const parts = layer.trim().split(/\s+/).filter(Boolean);
    const [ox = '0', oy = '0', blur = '0', spread = '0'] = parts;

    const color = colorStr ? colorToFlutter(colorStr) : 'Color(0xFF000000)';

    const lines = [
      '    BoxShadow(',
      `      offset: Offset(${parseFloat(ox)}, ${parseFloat(oy)}),`,
      `      blurRadius: ${parseFloat(blur)},`,
      `      spreadRadius: ${parseFloat(spread)},`,
      `      color: ${color},`,
      inset ? '      blurStyle: BlurStyle.inner,' : null,
      '    )',
    ].filter(Boolean);

    return lines.join('\n');
  });

  return `[\n${parsed.join(',\n')},\n  ]`;
}

// ── Dart generator ────────────────────────────────────────────────────────────

function genHeader() {
  const now = new Date().toISOString().slice(0, 10);
  return `// AUTO-GENERATED — do not hand-edit.
// Run \`npm run build:tokens\` from the repo root to regenerate.
// Generated: ${now}
//
// Source: tokens/base.json, tokens/light.json, tokens/dark.json

// ignore_for_file: constant_identifier_names

import 'package:flutter/material.dart';
`;
}

/** Flatten { color: { text: { primary: "#111" } } } → [["colorTextPrimary", "#111"], ...] */
function flattenColors(colorObj, prefix = '') {
  const entries = [];
  for (const [k, v] of Object.entries(colorObj)) {
    const id = prefix ? `${prefix}${k.charAt(0).toUpperCase()}${k.slice(1)}` : k;
    if (typeof v === 'string') {
      entries.push([toDartId(id), v]);
    } else {
      entries.push(...flattenColors(v, id));
    }
  }
  return entries;
}

function genColorClass(name, colorObj) {
  const entries = flattenColors(colorObj);
  const body = entries
    .map(([id, value]) => {
      const isConst = isConstColor(value);
      return `  static ${isConst ? 'const' : 'final'} Color ${toDartId(id)} = ${colorToFlutter(value)};`;
    })
    .join('\n');
  return `// ─── ${name} ───────────────────────────────────────────────────────────────
class ${name} {
  ${name}._();
${body}
}
`;
}

function genSpaceClass(spaceObj) {
  const body = Object.entries(spaceObj)
    .map(([k, v]) => `  static const double ${toDartId(k)} = ${lengthToDouble(v)};`)
    .join('\n');
  return `// ─── Spacing ─────────────────────────────────────────────────────────────────
class HumaxSpace {
  HumaxSpace._();
${body}
}
`;
}

function genRadiusClass(radiusObj) {
  const body = Object.entries(radiusObj)
    .map(([k, v]) => `  static const double ${toDartId(k)} = ${lengthToDouble(v)};`)
    .join('\n');
  return `// ─── Border Radius ───────────────────────────────────────────────────────────
class HumaxRadius {
  HumaxRadius._();
${body}
}
`;
}

/** Parse lineHeight value. If it has a unit (px/rem) return px value; otherwise treat as unitless multiplier. */
function parseLineHeight(value, fontSizePx) {
  if (typeof value !== 'string') return { kind: 'multiplier', value: parseFloat(value) };
  if (value.endsWith('px') || value.endsWith('rem')) {
    const lhPx = lengthToDouble(value);
    const multiplier = fontSizePx > 0 ? lhPx / fontSizePx : 1;
    return { kind: 'px', value: multiplier };
  }
  return { kind: 'multiplier', value: parseFloat(value) };
}

/** Trim trailing zeros from a fixed-precision number. "1.2500" → "1.25" */
function trimFloat(n) {
  return parseFloat(n.toFixed(4)).toString();
}

function genTypographyClasses(typo) {
  const primaryFamily = typo.fontFamily?.primary;
  const fallbackFamily = typo.fontFamily?.fallback;

  const fontSizeBody = Object.entries(typo.fontSize)
    .map(([k, v]) => `  static const double ${toDartId(k)} = ${lengthToDouble(v)};`)
    .join('\n');

  const fontWeightBody = Object.entries(typo.fontWeight)
    .map(([k, v]) => `  static const FontWeight ${toDartId(k)} = ${fontWeightToFlutter(v)};`)
    .join('\n');

  const lineHeightBody = Object.entries(typo.lineHeight)
    .map(([k, v]) => `  static const double ${toDartId(k)} = ${parseFloat(v)};`)
    .join('\n');

  const textStyleBody = Object.entries(typo.textStyle)
    .map(([k, style]) => {
      const fs = lengthToDouble(style.fontSize);
      const lh = parseLineHeight(style.lineHeight, fs);
      const fw = fontWeightToFlutter(style.fontWeight);
      const fields = [
        primaryFamily  ? `    fontFamily: '${primaryFamily}',` : null,
        fallbackFamily ? `    fontFamilyFallback: <String>['${fallbackFamily}'],` : null,
        `    fontSize: ${fs},`,
        `    height: ${trimFloat(lh.value)},`,
        `    fontWeight: ${fw},`,
        style.textDecoration === 'underline' ? `    decoration: TextDecoration.underline,` : null,
      ].filter(Boolean).join('\n');
      return `  static const TextStyle ${toDartId(k)} = TextStyle(\n${fields}\n  );`;
    })
    .join('\n\n');

  const familyClass = primaryFamily
    ? `class HumaxFontFamily {
  HumaxFontFamily._();
  static const String primary = '${primaryFamily}';
${fallbackFamily ? `  static const List<String> fallback = <String>['${fallbackFamily}'];\n` : ''}}

`
    : '';

  return `// ─── Typography ──────────────────────────────────────────────────────────────
${familyClass}class HumaxFontSize {
  HumaxFontSize._();
${fontSizeBody}
}

class HumaxFontWeight {
  HumaxFontWeight._();
${fontWeightBody}
}

class HumaxLineHeight {
  HumaxLineHeight._();
${lineHeightBody}
}

class HumaxTextStyle {
  HumaxTextStyle._();
${textStyleBody}
}
`;
}

function genMotionClasses(motion) {
  const durationBody = Object.entries(motion.duration)
    .map(([k, v]) => `  static const Duration ${toDartId(k)} = Duration(milliseconds: ${durationMs(v)});`)
    .join('\n');

  const curveBody = Object.entries(motion.easing)
    .map(([k, v]) => `  static const Curve ${toDartId(k)} = ${easingToFlutter(v)};`)
    .join('\n');

  return `// ─── Motion ──────────────────────────────────────────────────────────────────
class HumaxDuration {
  HumaxDuration._();
${durationBody}
}

class HumaxCurve {
  HumaxCurve._();
${curveBody}
}
`;
}

function genShadowClass(shadowObj) {
  const body = Object.entries(shadowObj)
    .map(([k, v]) => `  static const List<BoxShadow> ${toDartId(k)} = ${shadowToFlutter(v)};`)
    .join('\n');
  return `// ─── Shadows ─────────────────────────────────────────────────────────────────
class HumaxShadow {
  HumaxShadow._();
${body}
}
`;
}

function genFocusRingClass(focusRing) {
  return `// ─── Focus Ring ──────────────────────────────────────────────────────────────
class HumaxFocusRing {
  HumaxFocusRing._();
  static const double thickness = ${lengthToDouble(focusRing.thickness)};
  static const double offset    = ${lengthToDouble(focusRing.offset)};
}
`;
}

function buildDart() {
  return [
    genHeader(),
    genColorClass('HumaxColors',     light.color),
    genColorClass('HumaxDarkColors', dark.color),
    genSpaceClass(base.space),
    genRadiusClass(base.radius),
    genTypographyClasses(base.typography),
    genMotionClasses(base.motion),
    genShadowClass(base.shadow),
    genFocusRingClass(base.focusRing),
  ].join('\n');
}

// ── CSS generator ─────────────────────────────────────────────────────────────

function flattenToCssVars(obj, prefix) {
  const vars = [];
  function walk(node, path) {
    for (const [k, v] of Object.entries(node)) {
      const next = path ? `${path}-${k}` : k;
      if (typeof v === 'string') {
        vars.push(`  --${prefix}-${next}: ${v};`);
      } else if (typeof v === 'object') {
        walk(v, next);
      }
    }
  }
  walk(obj, '');
  return vars.join('\n');
}

function buildCss() {
  const baseVars  = Object.entries(base)
    .map(([k, v]) => flattenToCssVars(v, `humax-${k}`))
    .join('\n');

  const lightVars = flattenToCssVars(light.color, 'humax-color');
  const darkVars  = flattenToCssVars(dark.color,  'humax-color');

  return `/* AUTO-GENERATED — do not hand-edit. Run \`npm run build:tokens\` to regenerate. */

:root {
${baseVars}

  /* Light mode colors (default) */
${lightVars}
}

@media (prefers-color-scheme: dark) {
  :root {
${darkVars}
  }
}

[data-theme="dark"] {
${darkVars}
}
`;
}

// ── Write outputs ─────────────────────────────────────────────────────────────

const dartOut = resolve(ROOT, 'packages/humax_design_tokens/lib/src/tokens.dart');
const cssOut  = resolve(ROOT, 'src/styles/tokens.css');

mkdirSync(dirname(dartOut), { recursive: true });
mkdirSync(dirname(cssOut),  { recursive: true });

writeFileSync(dartOut, buildDart(), 'utf8');
writeFileSync(cssOut,  buildCss(),  'utf8');

console.log(`✅  tokens.dart → ${dartOut}`);
console.log(`✅  tokens.css  → ${cssOut}`);
