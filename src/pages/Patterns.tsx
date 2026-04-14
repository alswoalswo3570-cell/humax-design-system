import React, { useState } from "react";
import { CheckCircle2, AlertCircle, X, ArrowLeft, Trash2, Archive, Copy, Check, LayoutTemplate } from "lucide-react";
import { cn } from "../lib/utils";

import { Link } from "react-router-dom";

// --- Reusable UI components for previews ---

function Button({ variant = "filled", size = "md", loading = false, disabled = false, className, children, ...props }: any) {
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
      style={{ ...variants[variant], ...sizes[size], opacity: loading ? 0.7 : undefined, cursor: loading ? 'wait' : undefined }}
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

function MobileFrame({ children, className }: any) {
  return (
    <div className={cn("w-full max-w-[320px] aspect-[390/844] bg-gray-50 dark:bg-gray-900 border-[8px] border-gray-800 dark:border-gray-950 rounded-[2.5rem] overflow-hidden relative shadow-xl mx-auto flex flex-col", className)}>
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
        <div className="w-36 h-7 bg-gray-800 dark:bg-gray-950 rounded-b-3xl"></div>
      </div>
      {children}
      {/* Home Indicator */}
      <div className="absolute bottom-1 inset-x-0 h-5 flex justify-center items-end pb-2 z-50 pointer-events-none">
        <div className="w-28 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

function SnackBar({ message, action, onClose, variant = "default" }: any) {
  const variants: any = {
    default: "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
    error: "bg-red-600 dark:bg-red-500 text-white",
  };

  const actionVariants: any = {
    default: "text-indigo-400 dark:text-indigo-600",
    error: "text-white",
  };

  return (
    <div className={cn("absolute bottom-6 left-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-in slide-in-from-bottom-5 duration-300 z-40", variants[variant])}>
      <span className="text-sm font-medium">{message}</span>
      {action && (
        <button onClick={action.onClick} className={cn("text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity", actionVariants[variant])}>
          {action.label}
        </button>
      )}
    </div>
  );
}

// --- Previews ---

function SuccessFeedbackPreview() {
  const [showSnack, setShowSnack] = useState(false);

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="font-semibold text-gray-900 dark:text-white">Edit Profile</span>
        </div>
        <div className="p-4 space-y-4 flex-1">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Name</label>
            <Input defaultValue="Jane Doe" />
          </div>
          <Button variant="filled" className="w-full" onClick={() => {
            setShowSnack(false);
            setTimeout(() => setShowSnack(true), 100);
            setTimeout(() => setShowSnack(false), 3000);
          }}>Save Changes</Button>
        </div>
        {showSnack && <SnackBar message="Profile updated successfully" />}
      </div>
    </MobileFrame>
  );
}

function DestructiveConfirmationPreview() {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8 relative">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-white">Settings</span>
        </div>
        <div className="p-4">
          <Button variant="outlined" className="w-full text-red-600 border-red-200 dark:border-red-900/50 dark:text-red-400" onClick={() => setShowDialog(true)}>
            Delete Account
          </Button>
        </div>

        {showDialog && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowDialog(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full p-6 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete account?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                This action cannot be undone. All your data, including history and preferences, will be permanently removed.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="destructive" size="md" className="w-full" onClick={() => setShowDialog(false)}>Yes, delete account</Button>
                <Button variant="text" size="md" className="w-full" onClick={() => setShowDialog(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}

function FormSubmitErrorPreview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1500);
  };

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8 relative">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="font-semibold text-gray-900 dark:text-white">Add Payment Method</span>
        </div>
        
        <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar pb-24">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-900 dark:text-gray-200">Card Number</label>
            <Input defaultValue="4111 1111 1111 111" error={error} />
            {error && (
              <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
                <AlertCircle className="w-3 h-3" />
                <span className="text-xs font-medium">Invalid card number</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-900 dark:text-gray-200">Expiry</label>
              <Input placeholder="MM/YY" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-900 dark:text-gray-200">CVC</label>
              <Input placeholder="123" />
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-6">
          <Button variant="filled" size="md" className="w-full" loading={loading} onClick={handleSubmit}>
            {loading ? "Verifying..." : "Save Card"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}

function UndoFlowPreview() {
  const [items, setItems] = useState([1, 2, 3]);
  const [showSnack, setShowSnack] = useState(false);

  const handleArchive = (id: number) => {
    setItems(items.filter(i => i !== id));
    setShowSnack(false);
    setTimeout(() => setShowSnack(true), 100);
    setTimeout(() => setShowSnack(false), 4000);
  };

  const handleUndo = () => {
    setItems([1, 2, 3]);
    setShowSnack(false);
  };

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950 pt-8 relative">
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-white">Inbox</span>
        </div>
        
        <div className="flex-1 p-2 space-y-2">
          {items.map(i => (
            <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Message {i}</div>
                  <div className="text-xs text-gray-500">Tap to read...</div>
                </div>
              </div>
              <button onClick={() => handleArchive(i)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Archive className="w-5 h-5" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center text-gray-500 text-sm mt-10">All caught up!</div>
          )}
        </div>

        {showSnack && <SnackBar message="Conversation archived" action={{ label: "Undo", onClick: handleUndo }} />}
      </div>
    </MobileFrame>
  );
}

// --- Main Page Component ---

function PatternSection({ title, overview, whenToUse, components, layout, accessibility, example, children }: any) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(example, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{overview}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]">
            {children}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-3">When to use</h3>
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
              <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-400 uppercase tracking-wider mb-3">Involved Components</h3>
              <div className="flex flex-wrap gap-2">
                {components.map((item: string, i: number) => (
                  <Link to="/components" key={i} className="text-xs font-medium bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-700/50 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Layout Considerations</h3>
              <ul className="space-y-3">
                {layout.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-gray-300 dark:border-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Accessibility</h3>
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
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Reference Data</h3>
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
    </section>
  );
}

export default function Patterns() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Patterns</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Mobile-first Flutter-oriented patterns showing how tokens, layout rules, and components work together.
        </p>
      </div>

      <PatternSection
        title="1. Success Feedback Pattern"
        overview="Providing non-blocking confirmation that an action completed successfully without interrupting the user's flow."
        whenToUse={[
          "After saving settings or profile changes",
          "When an item is successfully created or updated",
          "After completing a background task (e.g., 'Download complete')"
        ]}
        components={["SnackBar", "Button", "AppBar"]}
        layout={[
          "SnackBar floats above the bottom safe area and any bottom navigation.",
          "Does not block interaction with the rest of the screen."
        ]}
        accessibility={[
          "Automatically announced by screen readers.",
          "Duration must be at least 4000ms for readability."
        ]}
        example={{
          pattern: "Success Feedback",
          flutterImplementation: "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Profile updated successfully'), behavior: SnackBarBehavior.floating))"
        }}
      >
        <SuccessFeedbackPreview />
      </PatternSection>

      <PatternSection
        title="2. Destructive Confirmation Pattern"
        overview="Forcing the user to explicitly confirm an action that cannot be easily undone, preventing accidental data loss."
        whenToUse={[
          "Deleting an account or profile",
          "Removing a critical item from a database",
          "Discarding unsaved changes in a complex form"
        ]}
        components={["Dialog", "Button (destructive)", "Button (text)"]}
        layout={[
          "Dialog is centered on screen with a backdrop blur to focus attention.",
          "Actions are stacked vertically on mobile for better touch targets, with the primary destructive action first or clearly highlighted."
        ]}
        accessibility={[
          "Focus is trapped within the dialog until dismissed.",
          "Can be dismissed via the Escape key or tapping the backdrop."
        ]}
        example={{
          pattern: "Destructive Confirmation",
          flutterImplementation: "showDialog(context: context, builder: (context) => AlertDialog(title: Text('Delete account?'), actions: [TextButton(child: Text('Cancel')), FilledButton(child: Text('Delete'), style: destructiveStyle)]))"
        }}
      >
        <DestructiveConfirmationPreview />
      </PatternSection>

      <PatternSection
        title="3. Form Submit + Error Pattern"
        overview="Handling form validation, loading states, and submission errors gracefully within a scrollable view."
        whenToUse={[
          "Login and registration forms",
          "Data entry screens (e.g., adding a payment method)",
          "Checkout flows"
        ]}
        components={["TextField", "Button (loading/disabled)", "AppBar"]}
        layout={[
          "Form content is scrollable (SingleChildScrollView in Flutter).",
          "Primary CTA is sticky at the bottom, above the safe area, ensuring it's always reachable.",
          "Keyboard appearance pushes the scrollable content up, but the sticky CTA remains visible if implemented correctly."
        ]}
        accessibility={[
          "Error text is programmatically linked to the input field.",
          "Loading state disables the button to prevent double submission and provides visual feedback."
        ]}
        example={{
          pattern: "Form Submit + Error",
          flutterImplementation: "Column(children: [Expanded(child: SingleChildScrollView(child: Form(...))), SafeArea(child: Padding(padding: EdgeInsets.all(16), child: FilledButton(onPressed: isLoading ? null : submit, child: isLoading ? CircularProgressIndicator() : Text('Save'))))])"
        }}
      >
        <FormSubmitErrorPreview />
      </PatternSection>

      <PatternSection
        title="4. Undo Flow Pattern"
        overview="Allowing users to quickly reverse a destructive action immediately after it happens, providing a smoother UX than upfront confirmation."
        whenToUse={[
          "Archiving emails or messages",
          "Removing items from a list or cart",
          "Dismissing notifications"
        ]}
        components={["SnackBar (with action)", "ListTile/Card"]}
        layout={[
          "SnackBar floats at the bottom.",
          "List animates the removal of the item smoothly."
        ]}
        accessibility={[
          "SnackBar with an action must remain visible longer (up to 10000ms) to give users time to interact.",
          "Action must be reachable via keyboard navigation."
        ]}
        example={{
          pattern: "Undo Flow",
          flutterImplementation: "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Conversation archived'), action: SnackBarAction(label: 'Undo', onPressed: () => undoArchive()), duration: Duration(milliseconds: 10000)))"
        }}
      >
        <UndoFlowPreview />
      </PatternSection>
    </div>
  );
}
