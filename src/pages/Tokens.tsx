import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import baseTokens from "../../tokens/base.json";
import lightTokens from "../../tokens/light.json";
import darkTokens from "../../tokens/dark.json";

export default function Tokens() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const colorTokens = theme === "light" ? lightTokens.color : darkTokens.color;

  return (
    <div className={`space-y-10 animate-in fade-in duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Design Tokens</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Semantic values that construct our design system's visual foundation.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/components" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            See how tokens are applied
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setTheme("light")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${theme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Colors</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Action</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ColorSwatch name="primary.default" hex={colorTokens.action.primary.default} />
              <ColorSwatch name="primary.hover" hex={colorTokens.action.primary.hover} />
              <ColorSwatch name="secondary.default" hex={colorTokens.action.secondary.default} border />
              <ColorSwatch name="destructive.default" hex={colorTokens.action.destructive.default} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Background & Surface</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ColorSwatch name="background.page" hex={colorTokens.background.page} border />
              <ColorSwatch name="background.surface" hex={colorTokens.background.surface} border />
              <ColorSwatch name="background.surfaceHover" hex={colorTokens.background.surfaceHover} border />
              <ColorSwatch name="background.overlay" hex={colorTokens.background.overlay} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Text</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ColorSwatch name="text.primary" hex={colorTokens.text.primary} />
              <ColorSwatch name="text.secondary" hex={colorTokens.text.secondary} />
              <ColorSwatch name="text.tertiary" hex={colorTokens.text.tertiary} />
              <ColorSwatch name="text.disabled" hex={colorTokens.text.disabled} />
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Typography</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Token</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Size / Weight</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(baseTokens.typography.textStyle).map(([key, style]: [string, any]) => (
                <tr key={key}>
                  <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">{key}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{style.fontSize} / {style.fontWeight}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white" style={{ fontSize: style.fontSize, fontWeight: style.fontWeight, lineHeight: style.lineHeight, textDecoration: style.textDecoration, fontFamily: "'Archivo', 'Noto Sans', system-ui, sans-serif" }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Example
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Spacing & Radius */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Spacing</h2>
          <div className="space-y-3">
            {Object.entries(baseTokens.space).filter(([key]) => key !== 'none').map(([key, value]) => (
              <SpacingRow key={key} name={`space.${key}`} size={value as string} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Radius</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(baseTokens.radius).filter(([key]) => key !== 'none').map(([key, value]) => (
              <RadiusBox key={key} name={`radius.${key}`} radius={value as string} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({ name, hex, border = false }: { name: string, hex: string, border?: boolean }) {
  return (
    <div className="flex flex-col">
      <div className={`h-16 rounded-t-lg ${border ? 'border border-gray-200 dark:border-gray-700' : ''}`} style={{ backgroundColor: hex }}></div>
      <div className="bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg p-3">
        <div className="text-xs font-semibold text-gray-900 dark:text-white truncate" title={name}>{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{hex}</div>
      </div>
    </div>
  );
}

function SpacingRow({ name, size }: { name: string, size: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-sm font-mono text-gray-600 dark:text-gray-400">{name}</div>
      <div className="w-16 text-sm text-gray-500 dark:text-gray-500">{size}</div>
      <div className="h-4 bg-indigo-200 dark:bg-indigo-900 rounded-sm" style={{ width: size }}></div>
    </div>
  );
}

function RadiusBox({ name, radius }: { name: string, radius: string }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-800" style={{ borderRadius: radius }}></div>
      <div className="text-sm font-mono text-gray-600 dark:text-gray-400">{name}</div>
    </div>
  );
}
