import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, Tablet, Monitor, Menu, Home, Search, Settings, Copy, Check, PanelLeft, ArrowRight, LayoutTemplate } from "lucide-react";
import { cn } from "../lib/utils";

// --- Reusable UI components for previews ---

function CompactPreview() {
  return (
    <div className="w-full max-w-[320px] aspect-[390/844] bg-gray-50 dark:bg-gray-900 border-[8px] border-gray-800 dark:border-gray-950 rounded-[2.5rem] overflow-hidden relative shadow-xl mx-auto flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
        <div className="w-36 h-7 bg-gray-800 dark:bg-gray-950 rounded-b-3xl"></div>
      </div>
      
      {/* AppBar */}
      <div className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 pt-8 shrink-0">
        <span className="font-semibold text-gray-900 dark:text-white">Home</span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>

      {/* NavigationBar */}
      <div className="h-24 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around pb-6 shrink-0">
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
          </div>
          <span className="text-[10px] font-medium text-gray-900 dark:text-white">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-8 rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-8 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Settings</span>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-1 inset-x-0 h-5 flex justify-center items-end pb-2 z-50 pointer-events-none">
        <div className="w-28 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

function MediumPreview() {
  return (
    <div className="w-full max-w-[600px] h-[450px] bg-gray-50 dark:bg-gray-900 border-[8px] border-gray-800 dark:border-gray-950 rounded-[2rem] overflow-hidden relative shadow-xl mx-auto flex">
      {/* NavigationRail */}
      <div className="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 shrink-0">
        <div className="w-12 h-12 flex items-center justify-center mb-8">
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
            </div>
            <span className="text-[10px] font-medium text-gray-900 dark:text-white">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* AppBar */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 shrink-0">
          <span className="font-semibold text-gray-900 dark:text-white">Home</span>
        </div>
        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandedPreview() {
  return (
    <div className="w-full max-w-[800px] h-[450px] bg-gray-50 dark:bg-gray-900 border-[8px] border-gray-800 dark:border-gray-950 rounded-[1rem] overflow-hidden relative shadow-xl mx-auto flex">
      {/* NavigationDrawer */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col py-4 shrink-0">
        <div className="h-12 flex items-center px-6 mb-4">
          <span className="font-bold text-lg text-gray-900 dark:text-white">App Name</span>
        </div>
        <div className="flex flex-col px-3 gap-1">
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
            <Home className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
            <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Home</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
            <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* AppBar */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-8 shrink-0">
          <span className="font-semibold text-gray-900 dark:text-white">Home</span>
        </div>
        {/* Body */}
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-3 gap-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdaptiveNavigation() {
  const [copied, setCopied] = useState(false);

  const referenceData = {
    pattern: "Adaptive Navigation",
    platform: "Flutter",
    breakpoints: {
      compact: { max: 599, navigation: "NavigationBar" },
      medium: { min: 600, max: 839, navigation: "NavigationRail" },
      expanded: { min: 840, navigation: "NavigationDrawer" }
    },
    components: {
      NavigationBar: "3-5 primary destinations, bottom placement.",
      NavigationRail: "3-7 primary destinations, left placement, icon + optional label.",
      NavigationDrawer: "5+ destinations, left placement, persistent or modal.",
      TabBar: "Secondary navigation within a screen, top placement under AppBar."
    },
    flutterImplementation: "LayoutBuilder(builder: (context, constraints) { if (constraints.maxWidth >= 840) return ExpandedShell(); if (constraints.maxWidth >= 600) return MediumShell(); return CompactShell(); })"
  };

  const copyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(referenceData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Adaptive Navigation</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Guidelines for responsive navigation patterns across compact, medium, and expanded viewports in a Flutter mobile-first system.
        </p>
      </div>

      {/* Viewport Tiers */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <PanelLeft className="w-6 h-6 text-indigo-500" />
            Viewport Tiers & Switching Rules
          </h2>
        </div>
        
        <div className="space-y-12">
          {/* Compact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Compact (0 - 599dp)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phones in portrait mode</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]">
              <CompactPreview />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">Primary Navigation: NavigationBar</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Use a bottom <code>NavigationBar</code> for 3-5 top-level destinations. It is easily reachable with one hand and preserves vertical space for content.
              </p>
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Tablet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Medium (600 - 839dp)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tablets in portrait, phones in landscape</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] overflow-x-auto">
              <MediumPreview />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">Primary Navigation: NavigationRail</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Switch to a <code>NavigationRail</code> on the left side. This accommodates 3-7 destinations and frees up vertical space, which is especially critical in landscape orientations.
              </p>
            </div>
          </div>

          {/* Expanded */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Expanded (840dp+)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tablets in landscape, desktop, web</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] overflow-x-auto">
              <ExpandedPreview />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">Primary Navigation: NavigationDrawer</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Use a persistent <code>NavigationDrawer</code>. It can hold 5+ destinations, deep hierarchies, and additional actions, taking advantage of the abundant horizontal space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Usage Rules */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-indigo-500" />
            Component Usage Rules
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">TabBar (Secondary Navigation)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Use <code>TabBar</code> for navigating between sibling views within a parent screen. Unlike primary navigation, TabBars work consistently across all viewport tiers.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Placed directly under the AppBar.</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Best for 2-4 related views (e.g., "Recent", "Favorites").</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Landscape & Tablet Considerations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              A phone in landscape mode often triggers the <strong>Medium</strong> breakpoint.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Automatically switch from NavigationBar to NavigationRail to preserve vertical reading space.</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Use <code>LayoutBuilder</code> or <code>MediaQuery</code> to drive this transition dynamically.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Considerations */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Technical Considerations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Safe Area & Bottom Insets</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <strong>NavigationBar:</strong> Flutter's <code>Scaffold.bottomNavigationBar</code> automatically handles the bottom safe area (home indicator).
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <strong>NavigationRail:</strong> Must be wrapped in a <code>SafeArea</code> to avoid notches and status bars on the left/right edges.
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <Link to="/layout" className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                  See Layout & Grid for more details <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Accessibility</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-600">
                <strong>Touch Targets:</strong> Ensure all navigation destinations maintain a minimum 48x48dp touch target, regardless of the visual icon size.
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-600">
                <strong>Labels:</strong> NavigationBar and NavigationDrawer should always show text labels. NavigationRail can use icons only if space is constrained, but labels are preferred.
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-600">
                <strong>Focus Order:</strong> Ensure keyboard focus moves logically from the navigation component into the main content area.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reference Data */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reference Data</h2>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto relative group">
          <button 
            className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 flex items-center gap-1"
            onClick={copyCode}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <pre className="text-xs font-mono text-gray-300">
            <code>{JSON.stringify(referenceData, null, 2)}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
