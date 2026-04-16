import { useState, useEffect } from "react";
import {
  Search, Home, User, Settings, X, ExternalLink,
  Eye, EyeOff, ChevronLeft, Bell, AlertCircle,
  CheckCircle2, Info, AlertTriangle, Minus, Check, LogOut,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

// Token source
import baseTokens from "../../tokens/base.json";

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

      {/* ── Button ─────────────────────────────────────────────────────────── */}
      <ComponentSection contract={buttonContract}>
        <div className="space-y-8">
          {/* Variant × Size Matrix */}
          <div>
            <SectionLabel>Variant × Size matrix</SectionLabel>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-28">Variant</th>
                    {["sm", "md", "lg"].map(s => (
                      <th key={s} className="text-center py-2 px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{s}</th>
                    ))}
                    <th className="text-center py-2 px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Disabled</th>
                    <th className="text-center py-2 px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Loading</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {(["filled", "outlined", "text", "destructive"] as const).map(v => (
                    <tr key={v} className="group">
                      <td className="py-3 pr-4 text-xs font-mono text-gray-500 dark:text-gray-400">{v}</td>
                      {(["sm", "md", "lg"] as const).map(s => (
                        <td key={s} className="py-3 px-4 text-center">
                          <Button variant={v} size={s}>Label</Button>
                        </td>
                      ))}
                      <td className="py-3 px-4 text-center">
                        <Button variant={v} size="md" disabled>Label</Button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button variant={v} size="md" loading>Label</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contextual usage */}
          <div>
            <SectionLabel>Contextual usage</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Form Submit */}
              <UsageCard title="Form Submit CTA">
                <div className="space-y-3 mb-4">
                  <Input placeholder="Email address" />
                  <Input placeholder="Password" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="filled" size="md" className="w-full">Sign In</Button>
                  <Button variant="filled" size="md" className="w-full" loading>Signing in…</Button>
                </div>
                <WidthRule
                  rule="w-full"
                  note="폼 너비에 맞춰 전체 확장 — 단독 CTA일 때 필수"
                />
              </UsageCard>

              {/* Dialog Actions */}
              <UsageCard title="Dialog Actions">
                {/* Moni-spec dialog — scaled preview */}
                <div className="flex justify-center">
                  <div style={{ width: 240, transformOrigin: "top center" }} className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                    {/* Content area */}
                    <div className="bg-white dark:bg-gray-800 px-3 pt-3 pb-3 flex flex-col items-center gap-1.5">
                      <AlertCircle size={24} color="#DC362E" />
                      <p className="text-center font-bold" style={{ fontSize: 14, lineHeight: "20px", color: "#DC362E" }}>
                        Sign In Error Information
                      </p>
                      <p className="text-center" style={{ fontSize: 11, lineHeight: "16px", color: "var(--color-text-primary)" }}>
                        There are already registered devices. Please delete the existing device and try again.
                      </p>
                    </div>
                    {/* Divider */}
                    <div style={{ height: 1, backgroundColor: "var(--color-border-subtle)" }} />
                    {/* Action row */}
                    <div className="flex bg-white dark:bg-gray-800" style={{ height: 44 }}>
                      <div className="flex-1 flex items-center justify-center" style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-tertiary)" }}>Cancel</div>
                      <div style={{ width: 1, backgroundColor: "var(--color-border-subtle)" }} />
                      <div className="flex-1 flex items-center justify-center" style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>OK</div>
                    </div>
                  </div>
                </div>
                <WidthRule
                  rule="w-[300dp] fixed · action-row h-[56dp] · each button flex-1"
                  note="Moni 스펙 — 고정폭, 액션 버튼 균등 분할"
                />
              </UsageCard>

              {/* Onboarding */}
              <UsageCard title="Onboarding Flow">
                <div className="flex justify-end mb-3">
                  <Button variant="text" size="sm">Skip</Button>
                </div>
                <div className="flex justify-center gap-1.5 mb-6">
                  {[0,1,2].map(i => (
                    <div key={i} className={cn("h-1.5 rounded-full transition-all", i===0 ? "w-6 bg-indigo-600 dark:bg-indigo-400" : "w-2 bg-gray-200 dark:bg-gray-700")} />
                  ))}
                </div>
                <div className="space-y-2 mb-6 px-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
                </div>
                <Button variant="filled" size="md" className="w-full">Next</Button>
                <WidthRule
                  rule="Skip: auto · Next: w-full"
                  note="보조 이탈 버튼은 자동폭, 주요 진행 버튼은 전폭"
                />
              </UsageCard>

              {/* Sticky Bottom */}
              <UsageCard title="Sticky Bottom CTA" className="relative overflow-hidden min-h-[180px]">
                <div className="space-y-2 pb-16">
                  {[100, 80, 90, 70].map((w, i) => (
                    <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="p-3">
                    <Button variant="filled" size="md" className="w-full">Continue to Checkout</Button>
                  </div>
                  <div className="px-3 pb-2 pt-0 border-t border-dashed border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
                    <WidthRule
                      rule="w-full"
                      note="하단 고정 CTA — 항상 전폭, 여백은 컨테이너가 담당"
                      inline
                    />
                  </div>
                </div>
              </UsageCard>

            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ── Text Field ─────────────────────────────────────────────────────── */}
      <ComponentSection contract={textFieldContract}>
        <div className="space-y-6">
          {/* States grid */}
          <div>
            <SectionLabel>States</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputCase label="Default">
                <Input placeholder="Enter your email" />
              </InputCase>
              <InputCase label="With value">
                <Input defaultValue="hello@humax.com" />
              </InputCase>
              <InputCase label="Focus">
                <Input placeholder="Focused" className="border-indigo-500 ring-2 ring-indigo-500/20" />
              </InputCase>
              <InputCase label="Error" hint="Please enter a valid email." hintError>
                <Input placeholder="bad-input" error />
              </InputCase>
              <InputCase label="Disabled">
                <Input placeholder="Cannot edit" disabled />
              </InputCase>
              <InputCase label="Read-only">
                <Input defaultValue="Read only value" readOnly className="bg-gray-50 dark:bg-gray-900/60 cursor-default" />
              </InputCase>
            </div>
          </div>

          {/* Prefix / Suffix / Counter */}
          <div>
            <SectionLabel>Prefix · Suffix · Counter</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputCase label="Search (prefix icon)">
                <InputWithAdornment
                  placeholder="Search…"
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                />
              </InputCase>
              <InputCase label="Password (suffix toggle)">
                <PasswordInput placeholder="Enter password" />
              </InputCase>
              <InputCase label="Character counter (max 50)" hint="10 / 50">
                <InputWithCounter maxLength={50} defaultValue="Hello world" />
              </InputCase>
              <InputCase label="Helper text" hint="We'll never share your email.">
                <Input placeholder="Email address" />
              </InputCase>
              <InputCase label="Prefix text">
                <InputWithAdornment
                  placeholder="0"
                  prefixText="KRW"
                />
              </InputCase>
              <InputCase label="Multiline">
                <textarea
                  className="w-full px-3 py-2 text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors"
                  rows={3}
                  placeholder="Write a message…"
                  style={{
                    backgroundColor: "var(--color-background-surface)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-md)",
                  }}
                />
              </InputCase>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ── App Bar ────────────────────────────────────────────────────────── */}
      <ComponentSection contract={appBarContract}>
        <div className="space-y-4">
          <SectionLabel>Variants</SectionLabel>
          <div className="space-y-3">
            {/* Standard */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-mono">standard</p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <AppBar
                  leading={<MenuIcon />}
                  title="Dashboard"
                  actions={[
                    <Search key="s" className="w-5 h-5" />,
                    <Bell key="b" className="w-5 h-5" />,
                    <User key="u" className="w-5 h-5" />,
                  ]}
                />
                <div className="p-6 text-center text-xs text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900/50">Screen content</div>
              </div>
            </div>

            {/* Back button */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-mono">back-button</p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <AppBar
                  leading={<ChevronLeft className="w-5 h-5" />}
                  title="Edit Profile"
                  actions={[<span key="s" className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Save</span>]}
                />
                <div className="p-6 text-center text-xs text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900/50">Screen content</div>
              </div>
            </div>

            {/* Search mode */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-mono">search-mode</p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 flex items-center gap-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 gap-2">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none py-2"
                      placeholder="Search…"
                      defaultValue="Hum"
                      readOnly
                    />
                    <button className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800">
                  {["Humax OTT", "Humax Router", "Hub device"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-t border-gray-100 dark:border-gray-800 first:border-t-0">
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ── Tab Bar ────────────────────────────────────────────────────────── */}
      <ComponentSection contract={tabBarContract}>
        <TabBarPreview />
      </ComponentSection>

      {/* ── Navigation Bar ─────────────────────────────────────────────────── */}
      <ComponentSection contract={navigationBarContract}>
        <NavigationBarPreview />
      </ComponentSection>

      {/* ── Switch ─────────────────────────────────────────────────────────── */}
      <ComponentSection contract={switchContract}>
        <SwitchPreview />
      </ComponentSection>

      {/* ── Checkbox ───────────────────────────────────────────────────────── */}
      <ComponentSection contract={checkboxContract}>
        <CheckboxPreview />
      </ComponentSection>

      {/* ── Radio ──────────────────────────────────────────────────────────── */}
      <ComponentSection contract={radioContract}>
        <RadioPreview />
      </ComponentSection>

      {/* ── Bottom Sheet ───────────────────────────────────────────────────── */}
      <ComponentSection contract={bottomSheetContract}>
        <BottomSheetDemo />
      </ComponentSection>

      {/* ── Dialog ─────────────────────────────────────────────────────────── */}
      <ComponentSection contract={dialogContract}>
        <DialogDemo />
      </ComponentSection>

      {/* ── Snack Bar ──────────────────────────────────────────────────────── */}
      <ComponentSection contract={snackBarContract}>
        <SnackBarPreview />
      </ComponentSection>
    </div>
  );
}

// ── Layout helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

function UsageCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5", className)}>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">{title}</p>
      {children}
    </div>
  );
}

function WidthRule({ rule, note, inline = false }: { rule: string; note: string; inline?: boolean }) {
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-x-2 gap-y-0.5",
      inline ? "pt-2" : "mt-3 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700"
    )}>
      <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider shrink-0">Width:</span>
      <code className="text-[11px] font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded whitespace-nowrap">
        {rule}
      </code>
      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">{note}</span>
    </div>
  );
}

function InputCase({ label, hint, hintError, children }: { label: string; hint?: string; hintError?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</label>
      {children}
      {hint && (
        <p className={cn("text-xs", hintError ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400")}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ── ComponentSection ──────────────────────────────────────────────────────────

function ComponentSection({ contract, children }: { contract: any; children: React.ReactNode }) {
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
          <p className="text-gray-600 dark:text-gray-300 mt-1">{contract.purpose}</p>
        </div>
        <Link
          to="/flutter"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-4"
        >
          JSON Contract <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {children}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contract.whenToUse && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800/30">
                <h3 className="text-xs font-semibold text-green-900 dark:text-green-400 uppercase tracking-wider mb-3">When to use</h3>
                <ul className="space-y-2">
                  {contract.whenToUse.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-green-800 dark:text-green-300">
                      <span className="font-bold shrink-0">•</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {contract.whenNotToUse && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-100 dark:border-red-800/30">
                <h3 className="text-xs font-semibold text-red-900 dark:text-red-400 uppercase tracking-wider mb-3">When not to use</h3>
                <ul className="space-y-2">
                  {contract.whenNotToUse.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-red-800 dark:text-red-300">
                      <span className="font-bold shrink-0">•</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {contract.tokenBindings && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Token Bindings</h3>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-gray-300 leading-relaxed">
                  <code>{JSON.stringify(contract.tokenBindings, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {contract.anatomy && (
            <div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Anatomy</h3>
              <ul className="space-y-2">
                {contract.anatomy.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-md border border-gray-100 dark:border-gray-700">
                    <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-xs font-medium shrink-0">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 flex-wrap">
            {contract.variants && (
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Variants</h3>
                <div className="flex flex-wrap gap-1.5">
                  {contract.variants.map((v: string) => (
                    <span key={v} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {contract.states && (
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">States</h3>
                <div className="flex flex-wrap gap-1.5">
                  {contract.states.map((s: string) => (
                    <span key={s} className="text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-800/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {contract.flutterMappingNotes && (
            <div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Flutter Mapping Notes</h3>
              <ul className="space-y-2">
                {contract.flutterMappingNotes.map((note: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {contract.exampleUsage && (
            <div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Example Usage</h3>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto relative group">
                <button
                  className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(contract.exampleUsage, null, 2))}
                >
                  Copy
                </button>
                <pre className="text-xs font-mono text-gray-300 leading-relaxed">
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

// ── Primitive UI components ───────────────────────────────────────────────────

function Button({
  variant = "filled", size = "md", loading = false, disabled = false, className, children, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outlined" | "text" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}) {
  const base = "group relative inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] overflow-hidden select-none";

  const variants: Record<string, React.CSSProperties> = {
    filled:      { backgroundColor: "var(--color-action-primary-default)", color: "var(--color-action-primary-text)", border: "none" },
    outlined:    { backgroundColor: "var(--color-action-secondary-default)", color: "var(--color-action-secondary-text)", border: "1px solid var(--color-action-secondary-border)" },
    text:        { backgroundColor: "var(--color-action-ghost-default)", color: "var(--color-action-ghost-text)", border: "none" },
    destructive: { backgroundColor: "var(--color-action-destructive-default)", color: "var(--color-action-destructive-text)", border: "none" },
  };

  // Typography sourced from tokens/base.json — matches Flutter HumaxButtonStyles.textStyleFor()
  // sm → captionPoint (12px/500)
  // md → titleSmall  (16px/700) — Moni primary button spec (SwiftUI: Archivo 16 .bold)
  // lg → titleSmall  (16px/700) — same spec, larger padding/height
  const ts = (baseTokens as any).typography.textStyle;
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "var(--space-xs) var(--space-sm)",  fontSize: ts.captionPoint.fontSize, fontWeight: ts.captionPoint.fontWeight, lineHeight: ts.captionPoint.lineHeight, borderRadius: "var(--radius-md)", minHeight: "32px" },
    md: { padding: "var(--space-sm) var(--space-md)",  fontSize: ts.titleSmall.fontSize,   fontWeight: ts.titleSmall.fontWeight,   lineHeight: ts.titleSmall.lineHeight,   borderRadius: "var(--radius-md)", minHeight: "44px" },
    lg: { padding: "var(--space-md) var(--space-lg)",  fontSize: ts.titleSmall.fontSize,   fontWeight: ts.titleSmall.fontWeight,   lineHeight: ts.titleSmall.lineHeight,   borderRadius: "var(--radius-md)", minHeight: "52px" },
  };

  return (
    <button
      className={cn(base, className)}
      style={{ ...variants[variant], ...sizes[size], opacity: loading ? 0.8 : undefined, cursor: loading ? "wait" : undefined }}
      disabled={disabled || loading}
      {...props}
    >
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-active:bg-black/10 dark:group-hover:bg-white/5 dark:group-active:bg-white/10 transition-colors pointer-events-none" />
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current relative z-10 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Input({
  className, error, readOnly, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(
        "flex h-11 w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        readOnly && "cursor-default",
        className
      )}
      style={{
        backgroundColor: "var(--color-background-surface)",
        color: "var(--color-text-primary)",
        border: `1px solid ${error ? "var(--color-action-destructive-default)" : "var(--color-border-default)"}`,
        borderRadius: "var(--radius-md)",
      }}
      readOnly={readOnly}
      {...props}
    />
  );
}

function InputWithAdornment({
  prefix, prefixText, suffix, className, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  prefixText?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center h-11 w-full text-sm transition-colors focus-within:ring-2 focus-within:ring-indigo-500/30"
      style={{
        backgroundColor: "var(--color-background-surface)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {prefix && <span className="pl-3 shrink-0">{prefix}</span>}
      {prefixText && (
        <span className="pl-3 pr-1 text-sm text-gray-500 dark:text-gray-400 font-medium shrink-0 border-r border-gray-200 dark:border-gray-700 mr-2 h-full flex items-center">
          {prefixText}
        </span>
      )}
      <input
        className={cn("flex-1 bg-transparent px-3 py-2 focus:outline-none text-sm", className)}
        style={{ color: "var(--color-text-primary)" }}
        {...props}
      />
      {suffix && <span className="pr-3 shrink-0">{suffix}</span>}
    </div>
  );
}

function PasswordInput({ placeholder }: { placeholder: string }) {
  const [show, setShow] = useState(false);
  return (
    <InputWithAdornment
      type={show ? "text" : "password"}
      placeholder={placeholder}
      defaultValue="secret123"
      suffix={
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}

function InputWithCounter({ maxLength, defaultValue }: { maxLength: number; defaultValue?: string }) {
  const [val, setVal] = useState(defaultValue ?? "");
  return (
    <div className="space-y-1">
      <Input
        value={val}
        onChange={e => setVal(e.target.value.slice(0, maxLength))}
        className={cn(val.length >= maxLength && "border-amber-400 dark:border-amber-500")}
      />
      <div className="flex justify-end">
        <span className={cn("text-xs font-mono", val.length >= maxLength ? "text-amber-500" : "text-gray-400 dark:text-gray-500")}>
          {val.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}

function AppBar({
  leading, title, actions,
}: {
  leading: React.ReactNode;
  title: string;
  actions?: React.ReactNode[];
}) {
  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {leading}
        </button>
        <span className="text-base font-semibold text-gray-900 dark:text-white ml-1">{title}</span>
      </div>
      {actions && (
        <div className="flex items-center gap-0.5">
          {actions.map((a, i) => (
            <button key={i} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────

function TabBarPreview() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label: "Recent",    badge: 3 },
    { label: "Favorites", badge: 0 },
    { label: "Shared",    badge: 12 },
    { label: "Archived",  badge: 0 },
  ];
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 min-w-[80px] py-3 px-4 text-sm font-medium relative transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap",
              active === i
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            {tab.label}
            {tab.badge > 0 && (
              <span className={cn(
                "min-w-[18px] h-[18px] text-[10px] font-bold rounded-full flex items-center justify-center px-1",
                active === i
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              )}>
                {tab.badge > 9 ? "9+" : tab.badge}
              </span>
            )}
            {active === i && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        ))}
      </div>
      <div className="p-8 bg-gray-50 dark:bg-gray-900/50 text-center text-xs text-gray-400 dark:text-gray-600">
        {tabs[active].label} content area
      </div>
    </div>
  );
}

// ── Navigation Bar ────────────────────────────────────────────────────────────

function NavigationBarPreview() {
  const [activeNav, setActiveNav] = useState(0);
  const items = [
    { icon: <Home className="w-6 h-6" />, label: "Home", badge: 0 },
    { icon: <Search className="w-6 h-6" />, label: "Search", badge: 0 },
    { icon: <Bell className="w-6 h-6" />, label: "Inbox", badge: 5 },
    { icon: <Settings className="w-6 h-6" />, label: "Settings", badge: 0 },
  ];
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 relative h-56 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 pointer-events-none">
        Screen Content — tap icons below
      </div>
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-2 flex justify-around items-center z-10 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.06)]">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActiveNav(i)}
            className="flex flex-col items-center gap-0.5 group relative"
          >
            {item.badge > 0 && (
              <span className="absolute -top-1 right-0 min-w-[16px] h-4 text-[9px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center px-1">
                {item.badge}
              </span>
            )}
            <div className={cn(
              "px-4 py-1 rounded-full transition-colors",
              activeNav === i
                ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            )}>
              {item.icon}
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors",
              activeNav === i ? "text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Switch ────────────────────────────────────────────────────────────────────

function SwitchPreview() {
  const [states, setStates] = useState({ notifications: true, darkMode: false, sync: true });

  const rows = [
    { key: "notifications", label: "Push notifications", desc: "Get alerts for new messages" },
    { key: "darkMode",      label: "Dark appearance",    desc: "Use dark theme system-wide" },
    { key: "sync",          label: "Background sync",    desc: "Sync data in the background" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Interactive settings list */}
      <div>
        <SectionLabel>Interactive — settings list context</SectionLabel>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
          {rows.map(row => (
            <label key={row.key} className="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{row.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.desc}</p>
              </div>
              <HumaxSwitch
                checked={states[row.key]}
                onChange={v => setStates(s => ({ ...s, [row.key]: v }))}
              />
            </label>
          ))}
        </div>
      </div>

      {/* State matrix */}
      <div>
        <SectionLabel>All states</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "On · enabled",   checked: true,  disabled: false },
            { label: "Off · enabled",  checked: false, disabled: false },
            { label: "On · disabled",  checked: true,  disabled: true  },
            { label: "Off · disabled", checked: false, disabled: true  },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center gap-3">
              <HumaxSwitch checked={s.checked} disabled={s.disabled} onChange={() => {}} />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HumaxSwitch({ checked, disabled = false, onChange }: { checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shrink-0",
        checked ? "bg-indigo-600 dark:bg-indigo-500" : "bg-gray-200 dark:bg-gray-700",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
        checked ? "translate-x-6" : "translate-x-1"
      )} />
    </button>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

function CheckboxPreview() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(true);
  const [agreeAll, setAgreeAll] = useState<boolean | "indeterminate">("indeterminate");

  return (
    <div className="space-y-6">
      {/* Interactive use-case */}
      <div>
        <SectionLabel>Interactive — terms acceptance</SectionLabel>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
          <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <HumaxCheckbox
              checked={agreeAll === true}
              indeterminate={agreeAll === "indeterminate"}
              onChange={v => {
                setAgreeAll(v);
                setAgreeTerms(v as boolean);
                setAgreeMarketing(v as boolean);
              }}
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Select all</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3.5 pl-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <HumaxCheckbox checked={agreeTerms} onChange={v => { setAgreeTerms(v); setAgreeAll(v && agreeMarketing ? true : !v && !agreeMarketing ? false : "indeterminate"); }} />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">I agree to the <span className="text-indigo-600 dark:text-indigo-400 underline">Terms of Service</span></p>
            </div>
          </label>
          <label className="flex items-center gap-3 px-4 py-3.5 pl-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <HumaxCheckbox checked={agreeMarketing} onChange={v => { setAgreeMarketing(v); setAgreeAll(agreeTerms && v ? true : !agreeTerms && !v ? false : "indeterminate"); }} />
            <p className="text-sm text-gray-700 dark:text-gray-300">Receive marketing emails</p>
          </label>
        </div>
      </div>

      {/* State matrix */}
      <div>
        <SectionLabel>All states</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: "Unchecked",     checked: false, indeterminate: false, disabled: false },
            { label: "Checked",       checked: true,  indeterminate: false, disabled: false },
            { label: "Indeterminate", checked: false, indeterminate: true,  disabled: false },
            { label: "Dis. checked",  checked: true,  indeterminate: false, disabled: true  },
            { label: "Error",         checked: false, indeterminate: false, disabled: false, error: true },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center gap-3">
              <HumaxCheckbox checked={s.checked} indeterminate={s.indeterminate} disabled={s.disabled} error={s.error} onChange={() => {}} />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HumaxCheckbox({
  checked, indeterminate = false, disabled = false, error = false, onChange,
}: { checked: boolean; indeterminate?: boolean; disabled?: boolean; error?: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "w-5 h-5 rounded flex items-center justify-center border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 shrink-0",
        disabled && "opacity-50 cursor-not-allowed",
        error
          ? "border-red-500 dark:border-red-400 bg-transparent focus:ring-red-400"
          : checked || indeterminate
            ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500 text-white focus:ring-indigo-500"
            : "border-gray-300 dark:border-gray-600 bg-transparent focus:ring-indigo-500"
      )}
    >
      {indeterminate
        ? <Minus className="w-3 h-3" />
        : checked
          ? <Check className="w-3 h-3" strokeWidth={3} />
          : null}
    </button>
  );
}

// ── Radio ─────────────────────────────────────────────────────────────────────

function RadioPreview() {
  const [plan, setPlan] = useState("standard");
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Interactive — delivery options</SectionLabel>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {[
            { id: "standard", label: "Standard Delivery", desc: "3–5 business days · Free" },
            { id: "express",  label: "Express Delivery",  desc: "1–2 business days · ₩3,000" },
            { id: "same",     label: "Same Day Delivery", desc: "Today by 9 PM · ₩8,000", disabled: true },
          ].map((opt, i) => (
            <label
              key={opt.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 transition-colors",
                i !== 0 && "border-t border-gray-100 dark:border-gray-800",
                opt.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                plan === opt.id && !opt.disabled
                  ? "border-indigo-600 dark:border-indigo-400"
                  : "border-gray-300 dark:border-gray-600"
              )}>
                {plan === opt.id && !opt.disabled && (
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </div>
              <input type="radio" name="delivery" className="sr-only" checked={plan === opt.id} disabled={opt.disabled} onChange={() => !opt.disabled && setPlan(opt.id)} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{opt.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bottom Sheet ──────────────────────────────────────────────────────────────

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl w-full max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            <div className="px-6 pb-8 pt-2">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Share content</h3>
                <button onClick={() => setOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {[
                  { icon: "📋", label: "Copy link",     desc: "Copy to clipboard" },
                  { icon: "✉️", label: "Send via email", desc: "Open email client" },
                  { icon: "💬", label: "Send message",   desc: "Share with a contact" },
                ].map(item => (
                  <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors">
                    <span className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Dialog ────────────────────────────────────────────────────────────────────

type DialogType = "error" | "success" | "warning" | "info";

interface DialogConfig {
  variant: DialogType;
  icon: React.ReactNode;
  titleColor: string;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  triggerLabel: string;
  triggerHover: string;
}

const DIALOG_CONFIG: Record<DialogType, DialogConfig> = {
  error: {
    variant: "error",
    icon: <AlertCircle size={32} color="#DC362E" />,
    titleColor: "#DC362E",
    title: "Sign In Error",
    body: "There are already registered devices. Please delete the existing device and try again.",
    confirmLabel: "OK",
    cancelLabel: "Cancel",
    triggerLabel: "Error",
    triggerHover: "hover:border-red-300 hover:bg-red-50 dark:hover:border-red-700 dark:hover:bg-red-900/10",
  },
  success: {
    variant: "success",
    icon: <CheckCircle2 size={32} color="#6FD94A" />,
    titleColor: "#6FD94A",
    title: "Success",
    body: "Your device has been registered successfully.",
    confirmLabel: "Done",
    triggerLabel: "Success",
    triggerHover: "hover:border-green-300 hover:bg-green-50 dark:hover:border-green-700 dark:hover:bg-green-900/10",
  },
  warning: {
    variant: "warning",
    icon: <AlertTriangle size={32} color="#EAB722" />,
    titleColor: "#EAB722",
    title: "Device Limit Warning",
    body: "You are approaching the maximum device limit. Remove unused devices to avoid disruption.",
    confirmLabel: "OK",
    triggerLabel: "Warning",
    triggerHover: "hover:border-amber-300 hover:bg-amber-50 dark:hover:border-amber-700 dark:hover:bg-amber-900/10",
  },
  info: {
    variant: "info",
    icon: <Info size={32} style={{ color: "var(--color-text-primary)" }} />,
    titleColor: "var(--color-text-primary)",
    title: "Device Registration",
    body: "You can register up to 3 devices on your account. Manage devices in Account Settings.",
    confirmLabel: "OK",
    cancelLabel: "Cancel",
    triggerLabel: "Info",
    triggerHover: "hover:border-gray-400 hover:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-800",
  },
};

/** Moni-spec dialog panel — 300px wide, flat action row */
function MoniDialog({
  cfg, onClose,
}: { cfg: DialogConfig; onClose: () => void }) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="moni-dialog-title"
      style={{ width: 300 }}
      className="rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Content area */}
      <div
        className="px-4 pt-4 pb-4 flex flex-col items-center gap-2"
        style={{ backgroundColor: "var(--color-background-surface)" }}
      >
        {/* Icon — 32×32 */}
        <div style={{ width: 32, height: 32, flexShrink: 0 }}>{cfg.icon}</div>
        {/* Title — colored by variant */}
        <p
          id="moni-dialog-title"
          className="text-center font-bold"
          style={{ fontSize: 18, lineHeight: "26px", color: cfg.titleColor }}
        >
          {cfg.title}
        </p>
        {/* Body */}
        <p
          className="text-center"
          style={{ fontSize: 14, lineHeight: "18px", color: "var(--color-text-primary)", fontWeight: 400 }}
        >
          {cfg.body}
        </p>
      </div>

      {/* Horizontal divider */}
      <div style={{ height: 1, backgroundColor: "var(--color-border-subtle)" }} />

      {/* Action row — 56px */}
      {cfg.cancelLabel ? (
        <div style={{ display: "flex", height: 56, backgroundColor: "var(--color-background-surface)" }}>
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 flex items-center justify-center transition-colors"
            style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-tertiary)", borderBottomLeftRadius: 8 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-background-surfaceHover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {cfg.cancelLabel}
          </button>
          {/* Vertical divider */}
          <div style={{ width: 1, backgroundColor: "var(--color-border-subtle)", alignSelf: "stretch" }} />
          {/* Confirm */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 flex items-center justify-center transition-colors"
            style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", borderBottomRightRadius: 8 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-background-surfaceHover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {cfg.confirmLabel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onClose}
          className="w-full flex items-center justify-center transition-colors"
          style={{ height: 56, fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", backgroundColor: "var(--color-background-surface)", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-background-surfaceHover)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-background-surface)")}
        >
          {cfg.confirmLabel}
        </button>
      )}
    </div>
  );
}

function DialogDemo() {
  const [activeType, setActiveType] = useState<DialogType | null>(null);
  const close = () => setActiveType(null);

  return (
    <div className="space-y-6">
      {/* Static previews — all 4 variants visible at once */}
      <div>
        <SectionLabel>Variants — static preview</SectionLabel>
        <div className="flex flex-wrap gap-4 justify-start">
          {(["error", "success", "warning", "info"] as DialogType[]).map(type => (
            <div key={type} className="flex flex-col items-start gap-1.5">
              <span className="text-[10px] font-semibold font-mono text-gray-400 uppercase tracking-wider">{type}</span>
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700" style={{ width: 240, transform: "scale(1)", transformOrigin: "top left" }}>
                <div className="px-3 pt-3 pb-3 flex flex-col items-center gap-1.5" style={{ backgroundColor: "var(--color-background-surface)" }}>
                  <div style={{ width: 24, height: 24, flexShrink: 0 }}>
                    {type === "error"   && <AlertCircle size={24} color="#DC362E" />}
                    {type === "success" && <CheckCircle2 size={24} color="#6FD94A" />}
                    {type === "warning" && <AlertTriangle size={24} color="#EAB722" />}
                    {type === "info"    && <Info size={24} style={{ color: "var(--color-text-primary)" }} />}
                  </div>
                  <p className="text-center font-bold leading-tight" style={{ fontSize: 13, color: DIALOG_CONFIG[type].titleColor }}>
                    {DIALOG_CONFIG[type].title}
                  </p>
                  <p className="text-center" style={{ fontSize: 10, lineHeight: "14px", color: "var(--color-text-primary)" }}>
                    {DIALOG_CONFIG[type].body}
                  </p>
                </div>
                <div style={{ height: 1, backgroundColor: "var(--color-border-subtle)" }} />
                {DIALOG_CONFIG[type].cancelLabel ? (
                  <div className="flex" style={{ height: 40, backgroundColor: "var(--color-background-surface)" }}>
                    <div className="flex-1 flex items-center justify-center" style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-tertiary)" }}>
                      {DIALOG_CONFIG[type].cancelLabel}
                    </div>
                    <div style={{ width: 1, backgroundColor: "var(--color-border-subtle)" }} />
                    <div className="flex-1 flex items-center justify-center" style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)" }}>
                      {DIALOG_CONFIG[type].confirmLabel}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center" style={{ height: 40, fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", backgroundColor: "var(--color-background-surface)" }}>
                    {DIALOG_CONFIG[type].confirmLabel}
                  </div>
                )}
              </div>
              {/* Action layout label */}
              <span className="text-[9px] text-gray-400 font-mono">
                {DIALOG_CONFIG[type].cancelLabel ? "2-button" : "1-button"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive triggers */}
      <div>
        <SectionLabel>Interactive — click to open</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {(["error", "success", "warning", "info"] as DialogType[]).map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors",
                DIALOG_CONFIG[type].triggerHover
              )}
            >
              <div style={{ width: 28, height: 28 }}>
                {type === "error"   && <AlertCircle size={28} color="#DC362E" />}
                {type === "success" && <CheckCircle2 size={28} color="#6FD94A" />}
                {type === "warning" && <AlertTriangle size={28} color="#EAB722" />}
                {type === "info"    && <Info size={28} style={{ color: "var(--color-text-primary)" }} />}
              </div>
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">{DIALOG_CONFIG[type].triggerLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-spec modal overlay — barrierDismissible: false per Moni spec */}
      {activeType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* No onClick on barrier — matches Flutter barrierDismissible: false */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--color-background-overlay)" }}
          />
          <div className="relative animate-in zoom-in-95 duration-150">
            <MoniDialog cfg={DIALOG_CONFIG[activeType]} onClose={close} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Snack Bar ─────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

interface Toast { type: ToastType; message: string; id: number }

const TOAST_CONFIG: Record<ToastType, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
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

const TOAST_MESSAGES: Record<ToastType, string> = {
  success: "Profile saved successfully.",
  error: "Something went wrong. Please try again.",
  warning: "Storage is almost full (92% used).",
  info: "A new app update is available.",
};

function SnackBarPreview() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const trigger = (type: ToastType) => {
    const id = ++counter * Date.now();
    setToasts(prev => [...prev.slice(-2), { type, message: TOAST_MESSAGES[type], id }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Trigger buttons */}
      <div>
        <SectionLabel>Trigger a snackbar</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {(["success", "error", "warning", "info"] as ToastType[]).map(type => (
            <Button key={type} variant="outlined" size="sm" onClick={() => trigger(type)}>
              <span className="flex items-center gap-1.5">
                {TOAST_CONFIG[type].icon}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Each toast auto-dismisses after 3.5 s.</p>
      </div>

      {/* Static reference */}
      <div>
        <SectionLabel>All variants</SectionLabel>
        <div className="space-y-2">
          {(["success", "error", "warning", "info"] as ToastType[]).map(type => {
            const cfg = TOAST_CONFIG[type];
            return (
              <div key={type} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm", cfg.bg, cfg.border)}>
                {cfg.icon}
                <span className={cn("flex-1 text-sm font-medium", cfg.text)}>{TOAST_MESSAGES[type]}</span>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live toast stack */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[min(360px,calc(100vw-2rem))]">
          {toasts.map(toast => {
            const cfg = TOAST_CONFIG[toast.type];
            return (
              <div
                key={toast.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-bottom-4 duration-300",
                  cfg.bg, cfg.border
                )}
              >
                {cfg.icon}
                <span className={cn("flex-1 text-sm font-medium", cfg.text)}>{toast.message}</span>
                <button
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
