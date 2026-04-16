/**
 * Data State Patterns — Empty / Loading / Error / Offline
 *
 * Category A (Tier 🔴): 이 패턴 없이는 표준 화면 구현 불가.
 */
import React, { useState, useEffect } from "react";
import {
  Inbox,
  SearchX,
  FilterX,
  Lock,
  Loader2,
  RefreshCw,
  WifiOff,
  CloudOff,
  AlertCircle,
  ServerCrash,
  ShieldX,
  FileQuestion,
} from "lucide-react";
import {
  Button,
  MobileFrame,
  PatternAccordion,
  PatternSection,
} from "./shared";

// ─── Empty State Preview ──────────────────────────────────────────────────────

function EmptyStatePreview() {
  const [variant, setVariant] = useState<"first-visit" | "no-search" | "no-filter" | "permission">("first-visit");

  const configs = {
    "first-visit": {
      icon: <Inbox className="w-12 h-12 text-gray-300 dark:text-gray-600" />,
      title: "No messages yet",
      description: "Start a conversation or wait for someone to reach out.",
      action: "New Message",
    },
    "no-search": {
      icon: <SearchX className="w-12 h-12 text-gray-300 dark:text-gray-600" />,
      title: "No results found",
      description: "Try adjusting your search terms or check for typos.",
      action: null,
    },
    "no-filter": {
      icon: <FilterX className="w-12 h-12 text-gray-300 dark:text-gray-600" />,
      title: "No matching items",
      description: "Remove some filters to see more results.",
      action: "Clear Filters",
    },
    permission: {
      icon: <Lock className="w-12 h-12 text-gray-300 dark:text-gray-600" />,
      title: "Access restricted",
      description: "You don't have permission to view this content.",
      action: "Request Access",
    },
  };

  const cfg = configs[variant];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Variant selector */}
      <div className="flex gap-1 flex-wrap justify-center">
        {(Object.keys(configs) as Array<keyof typeof configs>).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setVariant(key)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${
              variant === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <MobileFrame>
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8">
          {/* AppBar */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="font-semibold text-gray-900 dark:text-white">Messages</span>
          </div>
          {/* Empty state content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="mb-4">{cfg.icon}</div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {cfg.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              {cfg.description}
            </p>
            {cfg.action && (
              <Button variant="filled" size="sm">
                {cfg.action}
              </Button>
            )}
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}

// ─── Loading State Preview ────────────────────────────────────────────────────

function LoadingStatePreview() {
  const [variant, setVariant] = useState<"spinner" | "skeleton" | "progress">("spinner");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1">
        {(["spinner", "skeleton", "progress"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setVariant(key)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${
              variant === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <MobileFrame>
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="font-semibold text-gray-900 dark:text-white">Feed</span>
          </div>

          {variant === "spinner" && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          )}

          {variant === "skeleton" && (
            <div className="flex-1 p-4 space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {variant === "progress" && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Downloading file...</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: "65%", animation: "pulse 2s infinite" }}
                />
              </div>
              <p className="text-xs text-gray-500">65% complete</p>
            </div>
          )}
        </div>
      </MobileFrame>
    </div>
  );
}

// ─── Error State Preview ──────────────────────────────────────────────────────

function ErrorStatePreview() {
  const [variant, setVariant] = useState<"network" | "page-500" | "page-404" | "permission">("network");
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1 flex-wrap justify-center">
        {(["network", "page-500", "page-404", "permission"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setVariant(key)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${
              variant === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <MobileFrame>
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="font-semibold text-gray-900 dark:text-white">
              {variant === "page-404" ? "Not Found" : "Dashboard"}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            {variant === "network" && (
              <>
                <CloudOff className="w-12 h-12 text-red-400 dark:text-red-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Connection failed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Check your internet connection and try again.</p>
                <Button variant="outlined" size="sm" loading={retrying} onClick={handleRetry}>
                  {retrying ? "Retrying..." : "Retry"}
                </Button>
              </>
            )}

            {variant === "page-500" && (
              <>
                <ServerCrash className="w-12 h-12 text-red-400 dark:text-red-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Something went wrong</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">An unexpected error occurred. Please try again later.</p>
                <Button variant="outlined" size="sm" onClick={handleRetry}>
                  Go Back
                </Button>
              </>
            )}

            {variant === "page-404" && (
              <>
                <FileQuestion className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Page not found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                <Button variant="filled" size="sm">
                  Go Home
                </Button>
              </>
            )}

            {variant === "permission" && (
              <>
                <ShieldX className="w-12 h-12 text-amber-400 dark:text-amber-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Access denied</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You don't have the required permissions to view this resource.</p>
                <Button variant="outlined" size="sm">
                  Request Access
                </Button>
              </>
            )}
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}

// ─── Offline State Preview ────────────────────────────────────────────────────

function OfflineStatePreview() {
  const [isOffline, setIsOffline] = useState(true);
  const [showReconnect, setShowReconnect] = useState(false);

  const handleReconnect = () => {
    setShowReconnect(true);
    setTimeout(() => {
      setIsOffline(false);
      setShowReconnect(false);
    }, 2000);
    setTimeout(() => setIsOffline(true), 6000);
  };

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 pt-8 relative">
        {/* Offline banner */}
        {isOffline && (
          <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800/40 px-4 py-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-xs font-medium text-amber-800 dark:text-amber-300 flex-1">
              You're offline. Showing cached data.
            </span>
            <button
              type="button"
              onClick={handleReconnect}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Reconnecting indicator */}
        {showReconnect && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800/40 px-4 py-2 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Reconnecting...</span>
          </div>
        )}

        {/* Online success */}
        {!isOffline && !showReconnect && (
          <div className="bg-green-50 dark:bg-green-900/30 border-b border-green-200 dark:border-green-800/40 px-4 py-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <RefreshCw className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Back online. Syncing data...</span>
          </div>
        )}

        {/* AppBar */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <span className="font-semibold text-gray-900 dark:text-white">Articles</span>
        </div>

        {/* Cached content (dimmed when offline) */}
        <div className={`flex-1 p-3 space-y-3 transition-opacity ${isOffline ? "opacity-60" : "opacity-100"}`}>
          {[
            { title: "Getting Started with Flutter", time: "2 hours ago" },
            { title: "Design Token Best Practices", time: "5 hours ago" },
            { title: "Accessibility in Mobile Apps", time: "1 day ago" },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                  {isOffline && (
                    <span className="inline-block text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded mt-1">
                      cached
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}

// ─── Export: All Data State Patterns ───────────────────────────────────────────

export default function DataStatePatterns() {
  return (
    <div className="space-y-3">
      {/* ── #1 Empty State ── */}
      <PatternAccordion
        title="Empty State"
        subtitle="첫 방문 · 검색결과 없음 · 필터 없음 · 권한 차단"
      >
        <PatternSection
          whenToUse={[
            "User has no data yet (first-time, empty list)",
            "Search returned zero results",
            "Active filters exclude all items",
            "Feature is blocked due to missing permissions",
          ]}
          components={["EmptyState", "Button", "Icon"]}
          layout={[
            "Center the empty state vertically in the available space.",
            "Icon (48dp) → Title → Description → Optional CTA, all center-aligned.",
            "CTA only when there's a clear next action (e.g., 'Create First Item').",
            "For 'no search results', omit CTA — user adjusts search instead.",
          ]}
          accessibility={[
            "Screen reader should announce the title + description as a live region.",
            "CTA button must have descriptive label (not just 'Click here').",
            "Icon is decorative — mark aria-hidden='true'.",
          ]}
          example={{
            pattern: "Empty State",
            variants: ["first-visit", "no-search", "no-filter", "permission-blocked"],
            flutterWidget: "HumaxEmptyState(icon: ..., title: ..., description: ..., action: ...)",
            tokens: {
              icon: "color.text.tertiary, 48dp",
              title: "typography.titleSmall (16/700)",
              description: "typography.bodyCommon (14/400), color.text.secondary",
              spacing: "space.md between elements",
            },
          }}
        >
          <EmptyStatePreview />
        </PatternSection>
      </PatternAccordion>

      {/* ── #2 Loading State ── */}
      <PatternAccordion
        title="Loading State"
        subtitle="전체 spinner · 인라인 · skeleton · progress bar"
      >
        <PatternSection
          whenToUse={[
            "Fetching data for the first time (full-page spinner)",
            "Loading individual sections or cards (inline spinner)",
            "Showing content shape before data arrives (skeleton)",
            "Long operations with known progress (progress bar)",
          ]}
          components={["LoadingState", "Skeleton", "ProgressIndicator"]}
          layout={[
            "Full-page spinner: centered in the available space, no other content visible.",
            "Skeleton: mirror the layout of the actual content (same heights, widths, spacings).",
            "Progress bar: centered with percentage text below, cancelable if applicable.",
            "Never combine skeleton AND spinner on the same screen.",
          ]}
          accessibility={[
            "Announce 'Loading' via aria-live='polite' when loading begins.",
            "Announce 'Content loaded' when data arrives.",
            "Progress bar needs aria-valuenow, aria-valuemin, aria-valuemax.",
            "Skeleton shimmer should respect prefers-reduced-motion.",
          ]}
          example={{
            pattern: "Loading State",
            variants: ["full-page-spinner", "inline-spinner", "skeleton-list", "skeleton-card", "progress-bar"],
            flutterWidgets: {
              spinner: "Center(child: CircularProgressIndicator())",
              skeleton: "HumaxSkeleton.listTile(count: 4)",
              progress: "HumaxLinearProgress(value: 0.65)",
            },
            decisionTree: {
              "First load, unknown duration": "Full-page spinner",
              "Section load, layout known": "Skeleton",
              "Operation with measurable progress": "Progress bar",
              "Inline action (button tap)": "Button loading state (spinner inside button)",
            },
          }}
        >
          <LoadingStatePreview />
        </PatternSection>
      </PatternAccordion>

      {/* ── #3 Error State ── */}
      <PatternAccordion
        title="Error State"
        subtitle="네트워크 · 서버(500/404) · 권한 거부 · 인라인 검증"
      >
        <PatternSection
          whenToUse={[
            "Network request failed — show retry option",
            "Server returned 500 — generic error with 'Go Back'",
            "Page/resource not found (404) — redirect to home",
            "User lacks permissions — show 'Request Access'",
          ]}
          components={["ErrorState", "Button", "Dialog", "SnackBar"]}
          layout={[
            "Page-level error: centered, replaces all content. Icon → Title → Description → CTA.",
            "Section-level error: inline within the failed section, rest of page still usable.",
            "Inline form error: red border + error text below the field (see Form Validation pattern).",
            "Network retry: include a retry button, consider auto-retry with backoff for transient errors.",
          ]}
          accessibility={[
            "Error messages must be programmatically associated with the failed element.",
            "Page-level errors should auto-focus the heading or CTA.",
            "Use role='alert' for inline errors that appear dynamically.",
            "Retry button should re-announce the result (success or failure).",
          ]}
          example={{
            pattern: "Error State",
            variants: ["network-retry", "page-500", "page-404", "permission-denied", "inline-form"],
            flutterWidgets: {
              pageLevelFull: "HumaxErrorState.page(title: ..., description: ..., onRetry: ...)",
              sectionLevel: "HumaxErrorState.section(title: ..., onRetry: ...)",
              inlineRetry: "HumaxErrorState.inlineRetry(onRetry: ...)",
            },
            retryStrategy: {
              firstRetry: "Immediate on user tap",
              autoRetry: "1s → 2s → 4s → 8s (exponential backoff)",
              maxRetries: 3,
              fallback: "Show persistent error with manual retry only",
            },
          }}
        >
          <ErrorStatePreview />
        </PatternSection>
      </PatternAccordion>

      {/* ── #4 Offline State ── */}
      <PatternAccordion
        title="Offline State"
        subtitle="오프라인 배너 · 캐시 데이터 · 재연결 동기화"
      >
        <PatternSection
          whenToUse={[
            "Device loses network connectivity",
            "App can still display cached/local data",
            "User needs to know which data is stale",
            "Reconnection triggers a data sync",
          ]}
          components={["SnackBar", "Banner", "Button"]}
          layout={[
            "Persistent banner at top of screen (not dismissible until back online).",
            "Cached content shown with reduced opacity (0.6) or 'cached' badge.",
            "Reconnecting: replace offline banner with 'Reconnecting...' + spinner.",
            "Back online: brief green 'Syncing data...' banner → auto-dismiss after 3s.",
          ]}
          accessibility={[
            "Announce 'You are offline' when connectivity drops (aria-live='assertive').",
            "Announce 'Back online' when connectivity restores.",
            "Cached badge must be readable by screen readers.",
            "Retry button in banner must be keyboard-accessible.",
          ]}
          example={{
            pattern: "Offline State",
            states: ["offline-with-cache", "reconnecting", "back-online-syncing"],
            flutterImplementation:
              "StreamBuilder<ConnectivityResult>(stream: Connectivity().onConnectivityChanged, builder: (ctx, snap) => snap.data == ConnectivityResult.none ? OfflineBanner() : SizedBox.shrink())",
            tokens: {
              offlineBanner: "bg: color.feedback.warning.surface, text: color.feedback.warning.text",
              cachedOpacity: "opacity.medium (0.6)",
              reconnectBanner: "bg: color.feedback.info.surface",
              onlineBanner: "bg: color.feedback.success.surface",
            },
          }}
        >
          <OfflineStatePreview />
        </PatternSection>
      </PatternAccordion>
    </div>
  );
}
