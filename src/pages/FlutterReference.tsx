import { useState } from "react";
import buttonContract from "../../contracts/button.contract.json?raw";
import textFieldContract from "../../contracts/flutter/text_field.contract.json?raw";
import appBarContract from "../../contracts/flutter/app_bar.contract.json?raw";
import navigationBarContract from "../../contracts/flutter/navigation_bar.contract.json?raw";
import bottomSheetContract from "../../contracts/flutter/bottom_sheet.contract.json?raw";
import dialogContract from "../../contracts/flutter/dialog.contract.json?raw";
import snackBarContract from "../../contracts/flutter/snack_bar.contract.json?raw";
import checkboxContract from "../../contracts/flutter/checkbox.contract.json?raw";
import radioContract from "../../contracts/flutter/radio.contract.json?raw";
import switchContract from "../../contracts/flutter/switch.contract.json?raw";
import tabBarContract from "../../contracts/flutter/tab_bar.contract.json?raw";
import emptyStateContract from "../../contracts/flutter/empty_state.contract.json?raw";
import loadingStateContract from "../../contracts/flutter/loading_state.contract.json?raw";
import errorStateContract from "../../contracts/flutter/error_state.contract.json?raw";

export default function FlutterReference() {
  const [activeGroup, setActiveGroup] = useState<string>("components");

  const groups: Record<string, Record<string, string>> = {
    components: {
      "button.contract.json": buttonContract,
      "text_field.contract.json": textFieldContract,
      "app_bar.contract.json": appBarContract,
      "navigation_bar.contract.json": navigationBarContract,
      "bottom_sheet.contract.json": bottomSheetContract,
      "dialog.contract.json": dialogContract,
      "snack_bar.contract.json": snackBarContract,
      "checkbox.contract.json": checkboxContract,
      "radio.contract.json": radioContract,
      "switch.contract.json": switchContract,
      "tab_bar.contract.json": tabBarContract,
    },
    patterns: {
      "empty_state.contract.json": emptyStateContract,
      "loading_state.contract.json": loadingStateContract,
      "error_state.contract.json": errorStateContract,
    },
  };

  const contracts = groups[activeGroup];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Flutter Contracts</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Machine-readable JSON specs — components (13) and UI patterns (3).
          These are the Single Source of Truth for Flutter widget implementation.
        </p>
      </div>

      {/* Package import snippet */}
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-sm font-mono text-gray-300">pubspec.yaml</span>
          <button
            className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => navigator.clipboard.writeText(`dependencies:\n  humax_design_tokens:\n    path: ../path/to/repo/packages/humax_design_tokens`)}
          >Copy</button>
        </div>
        <div className="p-4">
          <pre className="text-sm font-mono text-gray-300">{`dependencies:
  humax_design_tokens:
    path: ../path/to/repo/packages/humax_design_tokens`}</pre>
        </div>
      </div>

      {/* Group tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[{ id: "components", label: "Components (13)" }, { id: "patterns", label: "UI Patterns (3)" }].map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeGroup === g.id
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(contracts).map(([filename, content]) => (
          <div key={filename} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
              <span className="text-sm font-mono text-gray-300">{filename}</span>
              <button
                className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                onClick={() => navigator.clipboard.writeText(content)}
              >
                Copy
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-300">
                <code>{content}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
