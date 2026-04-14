# UX Writing Principles — Humax Networks

> English is the Single Source of Truth for all UI strings.
> Korean and other locale files are translations derived from this document.
> See `strings/en.json` for the authoritative key-value registry.

---

## 1. Voice & Tone

### Voice (consistent — who we are)

Humax speaks like a **knowledgeable colleague**: clear, direct, and confident — but never cold or corporate. We respect the user's intelligence without using jargon they didn't ask for.

| Attribute | We are… | We are not… |
|---|---|---|
| Clear | Plain language, active voice | Vague, passive, or hedging |
| Helpful | Guide the user toward success | Preachy or condescending |
| Concise | Say only what matters | Wordy or padded with filler |
| Reliable | Consistent terminology | Switching synonyms mid-product |
| Human | Warm and approachable | Robotic or overly formal |

### Tone (adjusts to context)

| Situation | Tone | Example |
|---|---|---|
| Normal flow | Neutral, efficient | "Save changes" |
| Success | Warm, affirming | "Changes saved" |
| Error | Calm, solution-focused | "Couldn't save. Check your connection and try again." |
| Destructive action | Direct, serious | "Delete account? This can't be undone." |
| Empty state | Encouraging | "No messages yet. Start a conversation." |
| Loading | Brief, neutral | "Loading…" |

---

## 2. Button Labels

### Core rule
Buttons describe the **action that happens when clicked**, not the screen state. Use a verb phrase. Never "OK", "Yes", or "No" alone.

### Priority order for label choice

1. **Specific verb + object** (best) — `Save changes`, `Delete account`, `Add device`
2. **Verb alone** (acceptable when object is clear from context) — `Save`, `Delete`, `Add`
3. **Noun phrase** (avoid unless convention demands) — Never: "Confirmation", "Submission"

### Canonical labels

| Action | Label | Avoid |
|---|---|---|
| Persist user data | `Save` | "Submit", "OK", "Confirm" |
| Finish a multi-step flow | `Done` | "Finish", "Complete", "OK" |
| Apply without closing | `Apply` | "OK", "Set" |
| Dismiss without saving | `Cancel` | "No", "Back", "Discard" |
| Remove permanently | `Delete` | "Remove", "Erase" (unless platform convention) |
| Remove from a collection (not delete) | `Remove` | "Delete" |
| Navigate forward | `Next` | "Continue", "Proceed" |
| Navigate back | `Back` | "Previous", "Go back" |
| Redo a failed action | `Try again` | "Retry", "Reload", "Refresh" |
| Go to home / root | `Go home` | "Home", "Back to home" |
| Create a new item | `Add [item]` | "Create", "New", "+" alone |
| Open a modal/sheet | `View [item]` | "See", "Check", "Open" |

### Confirmation dialogs

Pair primary + secondary labels that clearly describe the two outcomes:

```
❌  "Are you sure?"   [OK]  [Cancel]
✅  "Delete message?" [Delete]  [Keep]
✅  "Leave without saving?" [Leave]  [Keep editing]
```

---

## 3. Error Messages

### Structure: What + Why + Fix

Every error message should answer:
1. **What** happened (in plain language, not a code)
2. **Why** it happened (only if it helps the user)
3. **How to fix** it (concrete next step)

```
❌  "Error 503"
❌  "Something went wrong."
✅  "Couldn't load your devices. Check your connection and try again."
✅  "Password must be at least 8 characters."
```

### Tone rules for errors

- **Never blame the user.** Say "Invalid email" not "You entered an invalid email."
- **Never use technical terms** users didn't choose. No "null pointer", "403 forbidden", "timeout".
- **Never use ALL CAPS** or exclamation marks for errors.
- **Never say "please"** — it sounds sycophantic and wastes space.
- **Do** give a specific action when possible (`Try again`, `Check your email`, `Update your app`).

### Error message patterns by type

| Type | Headline (≤ 5 words) | Body | Action |
|---|---|---|---|
| No connectivity | "No internet connection" | "Check your connection and try again." | Try again |
| Server error | "Something went wrong" | "We're having trouble on our end. Try again in a moment." | Try again |
| Not found | "Page not found" | "This page doesn't exist or has been moved." | Go home |
| Permission denied | "Access restricted" | "You don't have permission to view this." | Go back |
| Session expired | "You've been signed out" | "Sign in again to continue." | Sign in |
| Form validation | *(inline, no headline)* | "Enter a valid email address." | *(fix inline)* |
| File too large | *(inline)* | "File must be under 10 MB." | *(fix inline)* |

---

## 4. Empty State Copy

### Pattern: Situation → Encouragement → Action

```
Situation:   What's missing and why it's okay
Encouragement: Imply progress is possible
Action:      What to do next (if actionable)
```

### Examples by screen type

| Screen | Headline | Body | Action label |
|---|---|---|---|
| Inbox (first use) | "No messages yet" | "When you receive messages, they'll appear here." | — |
| Search with no results | "No results for "[query]"" | "Try a different search term." | — |
| Saved items (empty) | "Nothing saved yet" | "Tap the bookmark icon on any item to save it here." | — |
| Notifications (cleared) | "You're all caught up" | — | — |
| Devices (none paired) | "No devices connected" | "Add your first device to get started." | Add device |
| Filter with no results | "No matches" | "Try removing some filters." | Clear filters |

### Rules

- Headline: ≤ 5 words, no punctuation unless a question.
- Body: optional, ≤ 2 sentences.
- Never say "Oops", "Uh oh", "Whoops" — they're flippant and don't help.
- Never say "There are no [items]" — too formal. Prefer "No [items] yet."

---

## 5. Loading & Progress Copy

| State | Label | Notes |
|---|---|---|
| Generic load | "Loading…" | Always include ellipsis (…), not three dots (...) |
| Saving | "Saving…" | Only if the operation takes > 500 ms |
| Uploading | "Uploading… [n]%" | Show percentage when available |
| Processing | "Processing…" | For backend operations without a percentage |
| Completing | "Almost done…" | Only for operations > 5 s |
| Refreshing | "Updating…" | For pull-to-refresh |
| Done | "Saved" / "Done" | Flash briefly (≤ 2 s) then dismiss |

**Do not** say "Please wait…" or "Loading, please wait." — redundant.

---

## 6. Navigation & Page Titles

- Page titles: **noun phrase**, Title Case, ≤ 3 words. `Device Settings`, `My Profile`, `Notifications`
- Tab labels: **noun**, no verbs. `Home`, `Devices`, `Settings` (not "Go Home")
- Back button: just `Back` — the destination is shown in the title.
- Section headers: **noun phrase**, Sentence case. `Connected devices`, `Recent activity`

---

## 7. Placeholders & Helper Text

### Placeholder text (inside input fields)

- Describes the **format** or **example**, not the label. The label already tells them what to enter.
- Use example values: `you@example.com`, `+1 (555) 000-0000`, `e.g., Living Room TV`
- Never repeat the label: if label is "Email", placeholder should NOT be "Enter your email".
- Placeholder text disappears on focus — it is **not** a substitute for a label.

### Helper text (below input fields)

- Explains constraints **before** an error occurs: `Must be at least 8 characters`
- Explains format: `Include country code, e.g., +82 10-0000-0000`
- Maximum 1 sentence.

---

## 8. Notifications & Alerts

### Push notification copy

```
Title:  ≤ 5 words, action-oriented or status-focused
Body:   ≤ 10 words, specific and actionable
```

Examples:
```
❌  Title: "Notification"          Body: "You have a new notification."
✅  Title: "Device offline"        Body: "Living Room TV lost connection."
✅  Title: "Update available"      Body: "Tap to install firmware 3.2.1."
```

### In-app banners / toasts

| Type | Max length | Tone |
|---|---|---|
| Success | ≤ 8 words | Affirming. "Changes saved." "Device added." |
| Info | ≤ 12 words | Neutral. "New firmware available for Living Room TV." |
| Warning | ≤ 12 words | Calm urgency. "Your session expires in 5 minutes." |
| Error | ≤ 12 words + action | Solution-first. "Couldn't save. Try again." |

---

## 9. Accessibility Copy

- **Alt text**: describe the function, not the appearance. An icon button that opens settings: `Settings`, not "gear icon".
- **Screen reader labels**: every interactive element needs a label. If a label is visually hidden, provide `semanticsLabel`.
- **Live regions**: dynamic content (errors, status changes) must be announced. Use `liveRegion: true` in Flutter Semantics.
- **Avoid directional instructions**: don't write "tap the icon on the right" — positions change with layout.

---

## 10. Terminology Consistency

These terms are canonical across all Humax products. Never use synonyms in UI copy.

| Concept | Use | Avoid |
|---|---|---|
| The app | "the app" | "the application", "the system", "the platform" |
| Connected hardware | "device" | "unit", "box", "equipment" |
| User account | "account" | "profile" (unless referring to the profile page) |
| Authentication | "sign in" / "sign out" | "log in" / "log out", "login" |
| Registration | "create an account" | "register", "sign up" |
| Notifications | "notifications" | "alerts", "messages" (unless literally messages) |
| Settings | "Settings" (Title Case when referring to the page) | "Preferences", "Options", "Configuration" |
| Internet connection | "connection" | "network", "Wi-Fi" (unless specifically Wi-Fi) |

---

## Appendix: Quick checklist before shipping copy

- [ ] Active voice, present tense
- [ ] No jargon or error codes visible to users
- [ ] Button labels are verb phrases (or clear verbs)
- [ ] Error messages have a next step
- [ ] Empty states have a headline (≤ 5 words)
- [ ] No "please", "OK", "Yes/No" alone as button labels
- [ ] Terminology matches the canonical list above
- [ ] All interactive elements have accessibility labels
