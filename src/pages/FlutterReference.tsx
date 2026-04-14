import { useState } from "react";
import buttonContract from "../../contracts/button.contract.json?raw";
import textFieldContract from "../../contracts/flutter/text_field.contract.json?raw";
import appBarContract from "../../contracts/flutter/app_bar.contract.json?raw";
import navigationBarContract from "../../contracts/flutter/navigation_bar.contract.json?raw";
import bottomSheetContract from "../../contracts/flutter/bottom_sheet.contract.json?raw";
import dialogContract from "../../contracts/flutter/dialog.contract.json?raw";
import snackBarContract from "../../contracts/flutter/snack_bar.contract.json?raw";

export default function FlutterReference() {
  const contracts = {
    "button.contract.json": buttonContract,
    "text_field.contract.json": textFieldContract,
    "app_bar.contract.json": appBarContract,
    "navigation_bar.contract.json": navigationBarContract,
    "bottom_sheet.contract.json": bottomSheetContract,
    "dialog.contract.json": dialogContract,
    "snack_bar.contract.json": snackBarContract,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Flutter Component Contracts</h1>
        <p className="mt-2 text-lg text-gray-600">
          Machine-readable JSON definitions mapping design tokens to Flutter Material widgets.
        </p>
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
