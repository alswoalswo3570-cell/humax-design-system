import { CheckCircle2, AlertTriangle } from 'lucide-react';

export function Accessibility() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Accessibility</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Our commitment to inclusive design. We strive to meet WCAG 2.1 AA standards across all components and patterns.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Principles</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Color Contrast</h3>
              <p className="text-sm text-gray-600 mt-1">
                Text must have a contrast ratio of at least 4.5:1 against its background. Large text (18pt or 14pt bold) requires a 3:1 ratio. We never use color as the sole means of conveying information.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Keyboard Navigation</h3>
              <p className="text-sm text-gray-600 mt-1">
                All interactive elements must be focusable and operable via keyboard. Focus indicators must be highly visible (we use a 2px solid ring with offset).
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Screen Reader Support</h3>
              <p className="text-sm text-gray-600 mt-1">
                Proper semantic HTML is used as the foundation. ARIA attributes are added only when native HTML falls short (e.g., complex custom widgets like comboboxes).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-900">Developer Checklist</h3>
          <ul className="mt-2 text-sm text-amber-800 list-disc list-inside space-y-1">
            <li>Have you tested the component using only the keyboard (Tab, Enter, Space, Arrows)?</li>
            <li>Do all images have descriptive `alt` text (or empty `alt=""` if decorative)?</li>
            <li>Are form inputs explicitly linked to their labels via `id` and `htmlFor`?</li>
            <li>Is the focus state clearly visible and not overridden by `outline: none` without a fallback?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
