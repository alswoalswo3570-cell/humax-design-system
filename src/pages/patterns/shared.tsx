/**
 * Shared primitives for /patterns page.
 *
 * These are canonical preview components kept in sync with src/pages/Components.tsx
 * so the /patterns page uses the same typography, height, and variant spec as
 * the /components matrix.
 */
import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import baseTokens from "../../../tokens/base.json";

// ─── Button ──────────────────────────────────────────────────────────────────

export function Button({
  variant = "filled",
  size = "md",
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}: any) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] overflow-hidden select-none";

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

  const ts = (baseTokens as any).typography.textStyle;
  const sizes: any = {
    sm: {
      padding: "var(--space-xs) var(--space-sm)",
      fontSize: ts.captionPoint.fontSize,
      fontWeight: ts.captionPoint.fontWeight,
      lineHeight: ts.captionPoint.lineHeight,
      borderRadius: "var(--radius-md)",
      minHeight: "32px",
    },
    md: {
      padding: "var(--space-sm) var(--space-md)",
      fontSize: ts.titleSmall.fontSize,
      fontWeight: ts.titleSmall.fontWeight,
      lineHeight: ts.titleSmall.lineHeight,
      borderRadius: "var(--radius-md)",
      minHeight: "44px",
    },
    lg: {
      padding: "var(--space-md) var(--space-lg)",
      fontSize: ts.titleSmall.fontSize,
      fontWeight: ts.titleSmall.fontWeight,
      lineHeight: ts.titleSmall.lineHeight,
      borderRadius: "var(--radius-md)",
      minHeight: "52px",
    },
  };

  return (
    <button
      className={cn(baseStyles, className)}
      style={{
        ...variants[variant],
        ...sizes[size],
        opacity: loading ? 0.8 : undefined,
        cursor: loading ? "wait" : undefined,
      }}
      disabled={disabled || loading}
      {...props}
    >
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-active:bg-black/10 dark:group-hover:bg-white/5 dark:group-active:bg-white/10 transition-colors pointer-events-none" />
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current relative z-10 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function Input({ className, error, ...props }: any) {
  return (
    <input
      className={cn(
        "flex h-11 w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      style={{
        backgroundColor: "var(--color-background-surface)",
        color: "var(--color-text-primary)",
        border: `1px solid ${error ? "var(--color-action-destructive-default)" : "var(--color-border-default)"}`,
        borderRadius: "var(--radius-md)",
      }}
      {...props}
    />
  );
}

// ─── MobileFrame ──────────────────────────────────────────────────────────────

export function MobileFrame({ children, className }: any) {
  return (
    <div
      className={cn(
        "w-full max-w-[320px] aspect-[390/844] bg-gray-50 dark:bg-gray-900 border-[8px] border-gray-800 dark:border-gray-950 rounded-[2.5rem] overflow-hidden relative shadow-xl mx-auto flex flex-col",
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
        <div className="w-36 h-7 bg-gray-800 dark:bg-gray-950 rounded-b-3xl" />
      </div>
      {children}
      {/* Home Indicator */}
      <div className="absolute bottom-1 inset-x-0 h-5 flex justify-center items-end pb-2 z-50 pointer-events-none">
        <div className="w-28 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}

// ─── SnackBar ─────────────────────────────────────────────────────────────────

type SnackType = "success" | "error" | "warning" | "info";

const SNACK_CONFIG: Record<SnackType, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-green-200 dark:border-green-800/50",
    text: "text-gray-900 dark:text-white",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-red-200 dark:border-red-800/50",
    text: "text-gray-900 dark:text-white",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-amber-200 dark:border-amber-800/50",
    text: "text-gray-900 dark:text-white",
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-blue-200 dark:border-blue-800/50",
    text: "text-gray-900 dark:text-white",
  },
};

export function SnackBar({
  message,
  action,
  type = "info",
}: {
  message: string;
  action?: { label: string; onClick: () => void };
  type?: SnackType;
}) {
  const cfg = SNACK_CONFIG[type];
  return (
    <div
      className={cn(
        "absolute bottom-6 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-bottom-4 duration-300 z-40",
        cfg.bg,
        cfg.border
      )}
    >
      {cfg.icon}
      <span className={cn("flex-1 text-sm font-medium", cfg.text)}>{message}</span>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity shrink-0"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── CategoryHeader ───────────────────────────────────────────────────────────

export function CategoryHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="pt-8 pb-3">
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
        {title}
      </h2>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
    </div>
  );
}

// ─── PatternAccordion ─────────────────────────────────────────────────────────

export function PatternAccordion({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
      >
        <div className="min-w-0 pr-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{subtitle}</p>}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── PatternSection ───────────────────────────────────────────────────────────

export function PatternSection({ whenToUse, components, layout, accessibility, example, children }: any) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(example, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]">
            {children}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-3">
                When to use
              </h3>
              <ul className="space-y-2">
                {whenToUse.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-blue-800 dark:text-blue-300">
                    <span className="font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-400 uppercase tracking-wider mb-3">
                Involved Components
              </h3>
              <div className="flex flex-wrap gap-2">
                {components.map((item: string, i: number) => (
                  <Link
                    to="/components"
                    key={i}
                    className="text-xs font-medium bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-700/50 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Layout Considerations
              </h3>
              <ul className="space-y-3">
                {layout.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-gray-300 dark:border-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Accessibility
              </h3>
              <ul className="space-y-3">
                {accessibility.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Reference Data
            </h3>
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto relative group h-[500px] overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 flex items-center gap-1"
                onClick={copyCode}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <pre className="text-xs font-mono text-gray-300">
                <code>{JSON.stringify(example, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
