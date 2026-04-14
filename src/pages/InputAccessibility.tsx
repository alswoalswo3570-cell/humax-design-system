import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accessibility, Type, AlertCircle, Touchpad, Keyboard, MousePointer, Trash2, Copy, Check, ArrowRight, X } from "lucide-react";
import { cn } from "../lib/utils";

// --- Reusable UI components for previews ---

function Button({ variant = "filled", size = "md", className, children, ...props }: any) {
  const baseStyles = "group relative inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] overflow-hidden";
  
  const variants: any = {
    filled: {
      backgroundColor: "var(--color-action-primary-default)",
      color: "var(--color-action-primary-text)",
      border: "none",
    },
    outlined: {
      backgroundColor: "var(--color-action-secondary-default)",
      color: "var(--color-action-secondary-text)",
      border: "1px solid var(--color-action-secondary-border)",
    },
    text: {
      backgroundColor: "var(--color-action-ghost-default)",
      color: "var(--color-action-ghost-text)",
      border: "none",
    },
    destructive: {
      backgroundColor: "var(--color-action-destructive-default)",
      color: "var(--color-action-destructive-text)",
      border: "none",
    },
  };

  const sizes: any = {
    sm: { padding: "var(--space-xs) var(--space-sm)", fontSize: "0.75rem", borderRadius: "var(--radius-md)", minHeight: "32px" },
    md: { padding: "var(--space-sm) var(--space-md)", fontSize: "0.875rem", borderRadius: "var(--radius-md)", minHeight: "48px" },
    lg: { padding: "var(--space-md) var(--space-lg)", fontSize: "1rem", borderRadius: "var(--radius-md)", minHeight: "56px" },
  };

  return (
    <button 
      className={cn(baseStyles, className)} 
      style={{ ...variants[variant], ...sizes[size] }}
      {...props} 
    >
      <span className="absolute inset-0 bg-black/0 group-active:bg-black/10 dark:group-active:bg-white/10 transition-colors pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

function Input({ className, error, ...props }: any) {
  return (
    <input 
      className={cn(
        "flex h-12 w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      style={{
        backgroundColor: "var(--color-background-surface)",
        color: "var(--color-text-primary)",
        border: `1px solid ${error ? 'var(--color-action-destructive-default)' : 'var(--color-border-default)'}`,
        borderRadius: "var(--radius-md)",
      }}
      {...props}
    />
  );
}

export default function InputAccessibility() {
  const [copied, setCopied] = useState(false);

  const referenceData = {
    domain: "Input & Accessibility",
    platform: "Flutter",
    rules: {
      textFields: {
        label: "Always use labelText for context. Do not rely solely on hintText.",
        error: "Provide clear errorText in InputDecoration. Validate on blur or submit, not on every keystroke.",
        helper: "Use helperText for formatting hints or password requirements."
      },
      touchTargets: {
        minimumSize: "48x48dp",
        spacing: "8dp minimum between interactive elements."
      },
      semantics: {
        usage: "Wrap custom interactive widgets in Semantics.",
        buttons: "Ensure button roles and labels are clear.",
        grouping: "Use MergeSemantics to group related text spans or widgets into a single readable node."
      },
      desktopWeb: {
        focus: "Ensure visible focus rings (FocusNode + Focus widget).",
        hover: "Implement hover states using MouseRegion or built-in hoverColor properties.",
        shortcuts: "Support keyboard shortcuts (Enter to submit, Escape to cancel) using Shortcuts and Actions widgets."
      },
      destructiveActions: {
        confirmation: "Always require explicit confirmation (AlertDialog) for irreversible actions.",
        styling: "Use destructive color tokens to clearly indicate danger."
      }
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(referenceData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Input & Accessibility</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Practical guidelines for creating inclusive, robust, and user-friendly input experiences in a Flutter mobile-first system.
        </p>
      </div>

      {/* Text Field Anatomy */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Type className="w-6 h-6 text-indigo-500" />
            Text Field Anatomy & Roles
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              A well-structured text field provides context before, during, and after interaction.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Label:</strong>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Describes what the field is for. Always visible. Screen readers rely on this. (Flutter: <code>labelText</code>)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Hint Text:</strong>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Provides an example of the expected format. Disappears when typing begins. Do not use as a replacement for a label. (Flutter: <code>hintText</code>)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Helper Text:</strong>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Persistent guidance (e.g., "Must be at least 8 characters"). (Flutter: <code>helperText</code>)</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <div className="w-full max-w-sm space-y-1 relative">
              <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">1</div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-200 block">Account URL</label>
              
              <div className="relative">
                <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">2</div>
                <Input placeholder="e.g., company-name" />
              </div>
              
              <div className="relative">
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">3</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your URL will be: https://app.example.com/<strong>your-url</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation & Error Messaging */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-indigo-500" />
            Validation & Error Messaging
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Validation Timing</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Do:</strong> Validate on blur (when the user leaves the field) or on form submit.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">✗</div>
                <span className="text-gray-700 dark:text-gray-300"><strong>Don't:</strong> Show errors on every keystroke while the user is actively typing, as it causes anxiety and premature errors.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Error State Example</h3>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Email Address</label>
              <Input defaultValue="invalid-email@" error className="focus:ring-red-500/20 dark:focus:ring-red-500/40" />
              <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Please enter a valid email address.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Touch Targets & Spacing */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Touchpad className="w-6 h-6 text-indigo-500" />
            Touch Targets & Spacing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Mobile interfaces require larger hit areas to accommodate finger taps accurately.
            </p>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <strong>Minimum Size:</strong> All interactive elements (buttons, links, icons) must have a minimum touch target of <strong>48x48dp</strong>.
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <strong>Spacing:</strong> Maintain at least <strong>8dp</strong> of space between interactive elements to prevent accidental taps.
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-300 dark:border-indigo-600">
                <Link to="/layout" className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                  See Layout & Grid for visual examples <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-dashed border-indigo-400 dark:border-indigo-600 rounded-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20">
                  <button className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-indigo-600 dark:text-indigo-400 whitespace-nowrap">48dp target</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Readers & Semantics */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Accessibility className="w-6 h-6 text-indigo-500" />
            Screen Readers & Semantics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Flutter Semantics Widget</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Flutter's standard widgets (like <code>FilledButton</code> or <code>TextField</code>) include semantics by default. However, if you build custom interactive widgets using <code>GestureDetector</code>, you <strong>must</strong> wrap them in a <code>Semantics</code> widget.
            </p>
            <pre className="text-xs font-mono bg-gray-900 text-gray-300 p-3 rounded-lg overflow-x-auto">
{`Semantics(
  button: true,
  label: 'Add to favorites',
  child: GestureDetector(
    onTap: () => addFavorite(),
    child: CustomIconWidget(),
  ),
)`}
            </pre>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Grouping & Excluding</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong>MergeSemantics:</strong> Use this to group multiple widgets (like an icon and text) into a single selectable node for screen readers, preventing them from reading each part separately.
              </li>
              <li>
                <strong>ExcludeSemantics:</strong> Use this to hide purely decorative elements (like background illustrations or redundant icons) from the accessibility tree to reduce noise.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Desktop & Web Considerations */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MousePointer className="w-6 h-6 text-indigo-500" />
            Desktop & Web Considerations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <MousePointer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hover States</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mobile doesn't have hover, but desktop/web do. Ensure all interactive elements have visible hover states. In Flutter, use <code>MouseRegion</code> or the built-in <code>hoverColor</code> properties.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <Keyboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Focus Rings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keyboard navigation requires clear visual indicators. Use the <code>Focus</code> widget and <code>FocusNode</code> in Flutter to draw prominent focus rings around active elements.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shortcuts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support standard keyboard shortcuts. Pressing <code>Enter</code> should submit forms, and <code>Escape</code> should close dialogs or bottom sheets.
            </p>
          </div>
        </div>
      </section>

      {/* Destructive Actions */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-indigo-500" />
            Destructive Actions
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Actions that result in data loss (e.g., deleting an account, removing a critical record) must be clearly styled and require explicit confirmation.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Use the <code>destructive</code> variant for buttons.</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Always intercept the action with an <code>AlertDialog</code>.</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">•</span> Provide a clear, non-destructive "Cancel" alternative.</li>
            </ul>
            <div className="pt-2">
              <Link to="/patterns" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                See Destructive Confirmation Pattern
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-auto bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-4">
            <Button variant="destructive" className="w-full md:w-48">
              <Trash2 className="w-4 h-4" />
              Delete Project
            </Button>
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
