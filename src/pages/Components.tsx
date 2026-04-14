import { useState } from "react";
import { Search, Home, User, Settings, X, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

// Import contracts
import buttonContract from "../../contracts/button.contract.json";
import textFieldContract from "../../contracts/flutter/text_field.contract.json";
import appBarContract from "../../contracts/flutter/app_bar.contract.json";
import navigationBarContract from "../../contracts/flutter/navigation_bar.contract.json";
import bottomSheetContract from "../../contracts/flutter/bottom_sheet.contract.json";
import dialogContract from "../../contracts/flutter/dialog.contract.json";
import tabBarContract from "../../contracts/flutter/tab_bar.contract.json";
import switchContract from "../../contracts/flutter/switch.contract.json";
import checkboxContract from "../../contracts/flutter/checkbox.contract.json";
import radioContract from "../../contracts/flutter/radio.contract.json";
import snackBarContract from "../../contracts/flutter/snack_bar.contract.json";

export default function Components() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Components</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Interactive previews and documentation based on our design contracts.
        </p>
      </div>

      <ComponentSection contract={buttonContract}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Form Submit CTA */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">1. Form Submit</h4>
              <div className="space-y-3">
                <div className="h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 flex items-center">
                  <span className="text-sm text-gray-400">Email address</span>
                </div>
                <div className="h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 flex items-center">
                  <span className="text-sm text-gray-400">Password</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="filled" size="md" className="w-full">Sign In</Button>
              <Button variant="filled" size="md" className="w-full" loading>Signing In...</Button>
            </div>
          </div>

          {/* 2. Dialog Actions */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-2 mb-8">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">2. Dialog Actions</h4>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Discard changes?</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You have unsaved changes. Are you sure you want to discard them?</p>
                <div className="flex justify-end gap-2">
                  <Button variant="text" size="sm">Cancel</Button>
                  <Button variant="destructive" size="sm">Discard</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Onboarding Next/Skip */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4 mb-12">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">3. Onboarding Flow</h4>
              <div className="flex justify-center gap-2 pt-8">
                <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="text" size="md">Skip</Button>
              <Button variant="filled" size="md">Next</Button>
            </div>
          </div>

          {/* 4. Sticky Bottom CTA */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col justify-between relative overflow-hidden h-64">
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">4. Sticky Bottom CTA</h4>
              <div className="space-y-3 pt-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
              <Button variant="filled" size="md" className="w-full" disabled>Continue to Checkout</Button>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection contract={textFieldContract}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Default</label>
            <Input placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Focus (Simulated)</label>
            <Input placeholder="Focused state" className="border-indigo-500 ring-2 ring-indigo-500/20 dark:ring-indigo-500/40" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Error</label>
            <Input placeholder="Error state" error className="focus:ring-red-500/20 dark:focus:ring-red-500/40" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Disabled</label>
            <Input placeholder="Disabled state" disabled />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection contract={appBarContract}>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MenuIcon />
              </button>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">Page Content Area</div>
        </div>
      </ComponentSection>

      <ComponentSection contract={tabBarContract}>
        <TabBarPreview />
      </ComponentSection>

      <ComponentSection contract={navigationBarContract}>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 relative h-64 flex flex-col justify-end">
          <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm absolute inset-0 flex items-center justify-center">
            Screen Content
          </div>
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-2 flex justify-around items-center relative z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
            <NavItem icon={<Home className="w-6 h-6" />} label="Home" active />
            <NavItem icon={<Search className="w-6 h-6" />} label="Search" />
            <NavItem icon={<Settings className="w-6 h-6" />} label="Settings" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection contract={switchContract}>
        <SwitchPreview />
      </ComponentSection>

      <ComponentSection contract={checkboxContract}>
        <CheckboxPreview />
      </ComponentSection>

      <ComponentSection contract={radioContract}>
        <RadioPreview />
      </ComponentSection>

      <ComponentSection contract={bottomSheetContract}>
        <div className="flex flex-wrap gap-4">
          <BottomSheetDemo />
        </div>
      </ComponentSection>

      <ComponentSection contract={dialogContract}>
        <div className="flex flex-wrap gap-4">
          <DialogDemo />
        </div>
      </ComponentSection>

      <ComponentSection contract={snackBarContract}>
        <FallbackPreview contract={snackBarContract} />
      </ComponentSection>
    </div>
  );
}

// --- Helper Components for Previews ---

function ComponentSection({ contract, children }: { contract: any, children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
            {contract.name}
            {contract.platform && (
              <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                {contract.platform}
              </span>
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{contract.purpose}</p>
        </div>
        <Link 
          to="/flutter" 
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>View JSON Contract</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Preview</h3>
            {children}
          </div>

          {/* Usage Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contract.whenToUse && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800/30">
                <h3 className="text-sm font-semibold text-green-900 dark:text-green-400 uppercase tracking-wider mb-3">When to use</h3>
                <ul className="space-y-2">
                  {contract.whenToUse.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-green-800 dark:text-green-300">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {contract.whenNotToUse && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-100 dark:border-red-800/30">
                <h3 className="text-sm font-semibold text-red-900 dark:text-red-400 uppercase tracking-wider mb-3">When not to use</h3>
                <ul className="space-y-2">
                  {contract.whenNotToUse.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-red-800 dark:text-red-300">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Token Bindings */}
          {contract.tokenBindings && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Token Bindings</h3>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300">
                  <code>{JSON.stringify(contract.tokenBindings, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Anatomy */}
          {contract.anatomy && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Anatomy</h3>
              <ul className="space-y-2">
                {contract.anatomy.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-md border border-gray-100 dark:border-gray-700">
                    <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-xs font-medium">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants & States */}
          <div className="flex gap-6">
            {contract.variants && (
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  {contract.variants.map((v: string) => (
                    <span key={v} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {contract.states && (
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">States</h3>
                <div className="flex flex-wrap gap-2">
                  {contract.states.map((s: string) => (
                    <span key={s} className="text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Flutter Mapping Notes */}
          {contract.flutterMappingNotes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Flutter Mapping Notes</h3>
              <ul className="space-y-3">
                {contract.flutterMappingNotes.map((note: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Example Usage */}
          {contract.exampleUsage && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Example Usage</h3>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto relative group">
                <button 
                  className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(contract.exampleUsage, null, 2))}
                >
                  Copy
                </button>
                <pre className="text-xs font-mono text-gray-300">
                  <code>{JSON.stringify(contract.exampleUsage, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Button({ variant = "filled", size = "md", loading = false, disabled = false, className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "filled" | "outlined" | "text" | "destructive", size?: "sm" | "md" | "lg", loading?: boolean }) {
  const baseStyles = "group relative inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] overflow-hidden";
  
  const variants = {
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

  const sizes = {
    sm: {
      padding: "var(--space-xs) var(--space-sm)",
      fontSize: "0.75rem",
      borderRadius: "var(--radius-md)",
      minHeight: "32px",
    },
    md: {
      padding: "var(--space-sm) var(--space-md)",
      fontSize: "0.875rem",
      borderRadius: "var(--radius-md)",
      minHeight: "48px",
    },
    lg: {
      padding: "var(--space-md) var(--space-lg)",
      fontSize: "1rem",
      borderRadius: "var(--radius-md)",
      minHeight: "56px",
    },
  };

  return (
    <button 
      className={cn(baseStyles, className)} 
      style={{ 
        ...variants[variant], 
        ...sizes[size],
        opacity: loading ? 0.7 : undefined,
        cursor: loading ? 'wait' : undefined
      }}
      disabled={disabled || loading}
      {...props} 
    >
      <span className="absolute inset-0 bg-black/0 group-active:bg-black/10 dark:group-active:bg-white/10 transition-colors pointer-events-none" />
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Input({ className, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
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

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      <div className={cn(
        "px-4 py-1 rounded-full transition-colors",
        active ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-xs font-medium",
        active ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}>
        {label}
      </span>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Dialog</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Item?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl w-full max-w-md mx-auto animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-center p-3">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            <div className="px-6 pb-8 pt-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share options</h3>
                <button onClick={() => setOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                      {i}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Option {i}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Description for option {i}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabBarPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Recent", "Favorites", "Shared"];
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "flex-1 py-3 text-sm font-medium relative transition-colors",
              activeTab === i 
                ? "text-indigo-600 dark:text-indigo-400" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            {tab}
            {activeTab === i && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        ))}
      </div>
      <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
        {tabs[activeTab]} View Content
      </div>
    </div>
  );
}

function SwitchPreview() {
  const [isOn, setIsOn] = useState(true);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Default (Interactive)</label>
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <span className="text-sm text-gray-700 dark:text-gray-300">Enable notifications</span>
          <button 
            role="switch" 
            aria-checked={isOn}
            onClick={() => setIsOn(!isOn)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
              isOn ? "bg-indigo-600 dark:bg-indigo-500" : "bg-gray-200 dark:bg-gray-700"
            )}
          >
            <span className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              isOn ? "translate-x-6" : "translate-x-1"
            )} />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Disabled</label>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg opacity-60">
          <span className="text-sm text-gray-700 dark:text-gray-300">Background sync</span>
          <button 
            role="switch" 
            aria-checked={true}
            disabled
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600/50 dark:bg-indigo-500/50 cursor-not-allowed"
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckboxPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Default (Interactive)</label>
        <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className={cn(
            "w-5 h-5 rounded flex items-center justify-center border transition-colors",
            checked 
              ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500 text-white" 
              : "border-gray-300 dark:border-gray-600 bg-transparent"
          )}>
            {checked && <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm text-gray-700 dark:text-gray-300">Accept terms and conditions</span>
        </label>
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Error State</label>
        <label className="flex items-center gap-3 p-3 bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg">
          <div className="w-5 h-5 rounded flex items-center justify-center border border-red-500 dark:border-red-400 bg-transparent">
          </div>
          <span className="text-sm text-red-700 dark:text-red-400">You must accept the terms</span>
        </label>
      </div>
    </div>
  );
}

function RadioPreview() {
  const [selected, setSelected] = useState("option1");
  return (
    <div className="max-w-md space-y-3">
      <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Select an option (Interactive)</label>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {[
          { id: "option1", label: "Standard Delivery (3-5 days)" },
          { id: "option2", label: "Express Delivery (1-2 days)" },
          { id: "option3", label: "Same Day Delivery" }
        ].map((opt, i) => (
          <label key={opt.id} className={cn(
            "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            i !== 0 && "border-t border-gray-100 dark:border-gray-700"
          )}>
            <div className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
              selected === opt.id
                ? "border-indigo-600 dark:border-indigo-400"
                : "border-gray-300 dark:border-gray-600"
            )}>
              {selected === opt.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </div>
            <input 
              type="radio" 
              name="delivery" 
              className="sr-only" 
              checked={selected === opt.id} 
              onChange={() => setSelected(opt.id)} 
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FallbackPreview({ contract }: { contract: any }) {
  return (
    <div className="border border-dashed border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 rounded-xl p-8 text-center flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h4 className="text-amber-800 dark:text-amber-300 font-medium mb-2">Preview Not Available</h4>
      <p className="text-amber-600 dark:text-amber-400/80 text-sm max-w-md">
        A visual preview for the <strong>{contract.name}</strong> component has not been implemented yet. Please refer to the contract details below.
      </p>
    </div>
  );
}
