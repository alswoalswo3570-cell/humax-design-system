import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Maximize, Touchpad, Keyboard, Layers, ArrowDownToLine, ArrowRight } from "lucide-react";
import baseTokens from "../../tokens/base.json";

export default function LayoutGrid() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Layout & Grid</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Foundational rules for spatial organization, safe areas, and responsive behavior, optimized for Flutter mobile-first development.
        </p>
      </div>

      {/* Viewports & Breakpoints */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Maximize className="w-6 h-6 text-indigo-500" />
            Viewports & Breakpoints
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Compact (Mobile)</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">0 - 599dp</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Default mobile layout. Single column, full width content. Bottom navigation is preferred.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Medium (Tablet)</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">600 - 839dp</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small tablets and foldables. Can support two columns or a navigation rail.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Expanded (Desktop)</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">840dp+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Large tablets and desktop. Multi-column layouts, persistent side navigation, constrained max-width.
            </p>
          </div>
        </div>
      </section>

      {/* Grid System */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-500" />
            Grid System
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Property</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Compact</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Medium</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Expanded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Columns</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">4</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">8</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">12</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Gutter</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.md} (16dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.lg} (24dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.lg} (24dp)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Page Padding (Margin)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.md} (16dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.lg} (24dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.xl} (32dp)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Max Content Width</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">100%</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">100%</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">1040dp (centered)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Section Spacing</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space.xl} (32dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space["2xl"]} (48dp)</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{baseTokens.space["3xl"]} (64dp)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Visual Preview of Grid */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Compact Grid Preview (4 Columns, 16dp Gutter/Margin)</h3>
          <div className="flex gap-4 px-4 py-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg relative">
            {/* Margins */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-red-500/10 border-r border-red-500/30 flex items-center justify-center">
              <span className="text-[10px] text-red-600 dark:text-red-400 rotate-90">16dp</span>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-red-500/10 border-l border-red-500/30 flex items-center justify-center">
              <span className="text-[10px] text-red-600 dark:text-red-400 -rotate-90">16dp</span>
            </div>
            
            {/* Columns */}
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="flex-1 h-24 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Col {col}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safe Area & System Insets */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-indigo-500" />
            Safe Area & System Insets
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Mobile devices have hardware notches, status bars, and home indicators that can obscure content. We use Flutter's <code>SafeArea</code> to ensure content remains visible and interactive.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Do:</strong> Wrap the main scrollable body of a screen in a <code>SafeArea</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Do:</strong> Allow background colors or images to bleed into the safe area edges (e.g., using <code>bottom: false</code> on SafeArea if a bottom nav bar handles the inset).</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">✗</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Don't:</strong> Place interactive buttons or text directly at the very top or bottom edge of the screen without inset padding.</span>
              </li>
            </ul>
          </div>
          
          {/* Visual Preview */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center">
            <div className="w-64 aspect-[390/844] bg-white dark:bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 dark:border-black relative overflow-hidden shadow-xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 dark:bg-black rounded-b-3xl z-20"></div>
              
              {/* Unsafe Top Area */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-red-500/20 border-b border-red-500/50 flex items-end justify-center pb-1 z-10">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-400">Unsafe Top (Status Bar)</span>
              </div>
              
              {/* Safe Area Content */}
              <div className="absolute top-10 bottom-8 left-0 right-0 bg-green-500/10 border-y border-green-500/50 flex items-center justify-center p-4">
                <div className="text-center">
                  <span className="text-sm font-bold text-green-700 dark:text-green-400 block mb-2">Safe Area</span>
                  <div className="w-full h-32 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
                    <span className="text-xs text-gray-500">Scrollable Content</span>
                  </div>
                </div>
              </div>
              
              {/* Unsafe Bottom Area */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-500/20 border-t border-red-500/50 flex items-start justify-center pt-1 z-10">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-400">Unsafe Bottom (Home Indicator)</span>
              </div>
              {/* Home Indicator Line */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-800 dark:bg-gray-300 rounded-full z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Touch Targets & Interactive Spacing */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Touchpad className="w-6 h-6 text-indigo-500" />
            Touch Targets & Interactive Spacing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              To ensure accessibility and prevent accidental taps, all interactive elements must meet minimum size and spacing requirements.
            </p>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Minimum Touch Target: 48x48dp</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Even if the visual representation of an icon or button is smaller (e.g., 24x24dp), the tappable area must be at least 48x48dp.
              </p>
              <div className="flex items-center gap-8">
                <div className="relative w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 border-dashed rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white">
                    <Touchpad className="w-3 h-3" />
                  </div>
                  <div className="absolute -right-16 text-xs text-indigo-600 dark:text-indigo-400 font-mono">48dp</div>
                  <div className="absolute right-0 top-1/2 w-14 h-px bg-indigo-300 dark:bg-indigo-700"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Spacing: 8dp Minimum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Separate distinct interactive elements by at least 8dp to prevent mis-taps.
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md text-sm font-medium">Button 1</button>
                <div className="w-2 h-8 bg-red-200 dark:bg-red-900/50 border-x border-red-400 flex items-center justify-center relative">
                  <span className="absolute -top-5 text-[10px] text-red-600 dark:text-red-400 font-mono">8dp</span>
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md text-sm font-medium">Button 2</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coexistence: Bottom CTA, Nav, BottomSheet */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowDownToLine className="w-6 h-6 text-indigo-500" />
            Bottom Elements Coexistence
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Mobile interfaces frequently stack elements at the bottom of the screen. Proper z-indexing and spatial awareness are critical.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">1. Fixed Bottom CTA</h3>
              <div className="w-48 h-64 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg relative overflow-hidden shadow-sm">
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                {/* Gradient fade */}
                <div className="absolute bottom-16 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
                {/* Fixed CTA Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3 pb-5">
                  <div className="h-10 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-medium">Primary Action</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Add padding to the bottom of the scroll view equal to the CTA height + safe area.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">2. Navigation Bar</h3>
              <div className="w-48 h-64 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg relative overflow-hidden shadow-sm">
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
                {/* Nav Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-14 pb-2 flex justify-around items-center">
                  <div className="w-6 h-6 bg-indigo-200 dark:bg-indigo-900/50 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Flutter's Scaffold handles body padding automatically when using bottomNavigationBar.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">3. Bottom Sheet Overlay</h3>
              <div className="w-48 h-64 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 z-10"></div>
                {/* Bottom Sheet */}
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl h-32 z-20 shadow-lg">
                  <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-2"></div>
                  <div className="p-4 space-y-3 mt-2">
                    <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Modal sheets sit above all other UI, including NavigationBars and FABs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard & Forms */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-indigo-500" />
            Keyboard & Form Layout
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              When the software keyboard appears, it consumes roughly 50% of the screen height. Forms must be designed to remain usable.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Do:</strong> Wrap forms in a <code>SingleChildScrollView</code> so users can scroll to see inputs hidden by the keyboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Do:</strong> Keep the primary "Submit" or "Next" button visible. If it's a fixed bottom CTA, ensure <code>resizeToAvoidBottomInset</code> is true on the Scaffold so the button floats above the keyboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">✗</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Don't:</strong> Place critical context or instructions at the very bottom of a long form where they will be permanently hidden while typing.</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/patterns" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                See Form Submit + Error Pattern
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Preview */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center">
            <div className="w-64 aspect-[390/844] bg-white dark:bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 dark:border-black relative overflow-hidden shadow-xl flex flex-col">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 dark:bg-black rounded-b-3xl z-50"></div>
              
              {/* Header */}
              <div className="h-20 pt-8 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 shrink-0">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Edit Profile</span>
              </div>
              
              {/* Form Content (Scrolled up) */}
              <div className="flex-1 p-4 space-y-4 relative -top-12">
                <div className="space-y-1">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 w-full bg-white dark:bg-gray-900 border-2 border-indigo-500 rounded flex items-center px-2">
                    <div className="w-px h-5 bg-indigo-500 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Floating CTA above keyboard */}
              <div className="absolute bottom-[180px] left-0 right-0 p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="h-10 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-medium">Save Changes</div>
              </div>

              {/* Simulated Keyboard */}
              <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-2 flex flex-col gap-2">
                <div className="flex justify-center gap-1">
                  {[...Array(10)].map((_, i) => <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm"></div>)}
                </div>
                <div className="flex justify-center gap-1 px-2">
                  {[...Array(9)].map((_, i) => <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm"></div>)}
                </div>
                <div className="flex justify-center gap-1 px-6">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm"></div>
                  {[...Array(7)].map((_, i) => <div key={i} className="w-5 h-8 bg-white dark:bg-gray-700 rounded shadow-sm"></div>)}
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm"></div>
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-10 h-8 bg-gray-300 dark:bg-gray-600 rounded shadow-sm"></div>
                  <div className="w-24 h-8 bg-white dark:bg-gray-700 rounded shadow-sm"></div>
                  <div className="w-10 h-8 bg-indigo-500 rounded shadow-sm flex items-center justify-center text-white text-[10px]">Done</div>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-1 inset-x-0 h-5 flex justify-center items-end pb-2 z-50 pointer-events-none">
                <div className="w-28 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
