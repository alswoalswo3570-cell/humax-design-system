/**
 * /patterns — Mobile-first UX Patterns
 *
 * Index file: imports shared primitives and category sub-files.
 * Existing feedback + user-flow patterns stay inline here for now;
 * they'll migrate to FeedbackPatterns.tsx / UserFlowPatterns.tsx in W1-d/W1-b.
 */
import React, { useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Archive,
  AlertCircle,
} from "lucide-react";

// Shared primitives (extracted to avoid duplication)
import {
  Button,
  Input,
  MobileFrame,
  SnackBar,
  CategoryHeader,
  PatternAccordion,
  PatternSection,
} from "./patterns/shared";

// Category sub-files
import DataStatePatterns from "./patterns/DataStatePatterns";

// ─── Existing Previews (to be migrated to FeedbackPatterns.tsx later) ─────────

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
          <Button
            variant="filled"
            className="w-full"
            onClick={() => {
              setShowSnack(false);
              setTimeout(() => setShowSnack(true), 100);
              setTimeout(() => setShowSnack(false), 3000);
            }}
          >
            Save Changes
          </Button>
        </div>
        {showSnack && <SnackBar type="success" message="Profile updated successfully" />}
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
          <Button
            variant="outlined"
            className="w-full text-red-600 border-red-200 dark:border-red-900/50 dark:text-red-400"
            onClick={() => setShowDialog(true)}
          >
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

function UndoFlowPreview() {
  const [items, setItems] = useState([1, 2, 3]);
  const [showSnack, setShowSnack] = useState(false);

  const handleArchive = (id: number) => {
    setItems(items.filter((i) => i !== id));
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
          {items.map((i) => (
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
          {items.length === 0 && <div className="text-center text-gray-500 text-sm mt-10">All caught up!</div>}
        </div>
        {showSnack && <SnackBar type="info" message="Conversation archived" action={{ label: "Undo", onClick: handleUndo }} />}
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
    setTimeout(() => { setLoading(false); setError(true); }, 1500);
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
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-6">
          <Button variant="filled" size="md" className="w-full" loading={loading} onClick={handleSubmit}>
            {loading ? "Verifying..." : "Save Card"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Patterns() {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Patterns</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Mobile-first Flutter-oriented patterns showing how tokens, layout rules, and components work together.
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          각 섹션은 기본 접힘 상태입니다. 필요한 패턴만 펼쳐서 확인하세요.
        </p>
      </div>

      {/* ═══════════ 데이터 상태 · Data State ═══════════ */}
      <CategoryHeader
        title="데이터 상태 · Data State"
        description="데이터 로딩·빈 화면·에러·오프라인 등 앱의 기본 상태를 처리하는 패턴"
      />
      <DataStatePatterns />

      {/* ═══════════ 피드백 · Feedback ═══════════ */}
      <CategoryHeader
        title="피드백 · Feedback"
        description="사용자 액션의 결과를 즉시·비차단형으로 알리는 패턴"
      />
      <div className="space-y-3">
        <PatternAccordion title="Success Feedback" subtitle="저장·업데이트 완료를 비차단 Snackbar로 알림">
          <PatternSection
            whenToUse={["After saving settings or profile changes", "When an item is successfully created or updated", "After completing a background task (e.g., 'Download complete')"]}
            components={["SnackBar", "Button", "AppBar"]}
            layout={["SnackBar floats above the bottom safe area and any bottom navigation.", "Does not block interaction with the rest of the screen."]}
            accessibility={["Automatically announced by screen readers.", "Duration must be at least 4000ms for readability."]}
            example={{ pattern: "Success Feedback", flutterImplementation: "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Profile updated successfully'), behavior: SnackBarBehavior.floating))" }}
          >
            <SuccessFeedbackPreview />
          </PatternSection>
        </PatternAccordion>

        <PatternAccordion title="Destructive Confirmation" subtitle="되돌릴 수 없는 액션 전 명시적 확인 Dialog">
          <PatternSection
            whenToUse={["Deleting an account or profile", "Removing a critical item from a database", "Discarding unsaved changes in a complex form"]}
            components={["Dialog", "Button (destructive)", "Button (text)"]}
            layout={["Dialog is centered on screen with a backdrop blur to focus attention.", "Actions are stacked vertically on mobile for better touch targets, with the primary destructive action first or clearly highlighted."]}
            accessibility={["Focus is trapped within the dialog until dismissed.", "Can be dismissed via the Escape key or tapping the backdrop."]}
            example={{ pattern: "Destructive Confirmation", flutterImplementation: "showDialog(context: context, builder: (context) => AlertDialog(title: Text('Delete account?'), actions: [...]))" }}
          >
            <DestructiveConfirmationPreview />
          </PatternSection>
        </PatternAccordion>

        <PatternAccordion title="Undo Flow" subtitle="삭제·아카이브 직후 되돌리기 링크 제공">
          <PatternSection
            whenToUse={["Archiving emails or messages", "Removing items from a list or cart", "Dismissing notifications"]}
            components={["SnackBar (with action)", "ListTile/Card"]}
            layout={["SnackBar floats at the bottom.", "List animates the removal of the item smoothly."]}
            accessibility={["SnackBar with an action must remain visible longer (up to 10000ms) to give users time to interact.", "Action must be reachable via keyboard navigation."]}
            example={{ pattern: "Undo Flow", flutterImplementation: "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Conversation archived'), action: SnackBarAction(label: 'Undo', onPressed: () => undoArchive()), duration: Duration(milliseconds: 10000)))" }}
          >
            <UndoFlowPreview />
          </PatternSection>
        </PatternAccordion>
      </div>

      {/* ═══════════ 사용자 플로우 · User Flow ═══════════ */}
      <CategoryHeader
        title="사용자 플로우 · User Flow"
        description="폼·인증·결제 등 사용자가 단계적으로 완료하는 과업"
      />
      <div className="space-y-3">
        <PatternAccordion title="Form Submit + Error" subtitle="스크롤 가능한 폼 + sticky CTA + 인라인 에러">
          <PatternSection
            whenToUse={["Login and registration forms", "Data entry screens (e.g., adding a payment method)", "Checkout flows"]}
            components={["TextField", "Button (loading/disabled)", "AppBar"]}
            layout={["Form content is scrollable (SingleChildScrollView in Flutter).", "Primary CTA is sticky at the bottom, above the safe area, ensuring it's always reachable.", "Keyboard appearance pushes the scrollable content up, but the sticky CTA remains visible."]}
            accessibility={["Error text is programmatically linked to the input field.", "Loading state disables the button to prevent double submission and provides visual feedback."]}
            example={{ pattern: "Form Submit + Error", flutterImplementation: "Column(children: [Expanded(child: SingleChildScrollView(child: Form(...))), SafeArea(child: Padding(...))])" }}
          >
            <FormSubmitErrorPreview />
          </PatternSection>
        </PatternAccordion>
      </div>

      {/* ═══════════ Placeholder for future categories ═══════════ */}
      {/* W1-e: InteractionPatterns — Search, PullRefresh, Gesture, Bulk, DnD, BottomSheet, Share */}
      {/* W1-f: NavigationPatterns — Modal Decision Tree, Deep Link, Notifications Inbox, Onboarding */}
    </div>
  );
}
