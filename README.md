# 🛠 Improvements Made

## 📌 Approach
The redesign focused on modularizing the page into discrete components to improve maintainability, readability, and user experience (UX). Each component was reviewed individually to identify inefficiencies and enhance UI/UX consistency.

### 🔼 Topbar

**Problem:**  
The original topbar failed to indicate the active page clearly. On mobile, the topbar rendered the full menu, creating a navbar with a visible scrollbar.

**Solution:**

- Implemented context-aware rendering to display only the current page title and icon on mobile.
- Added a Back button to enable navigation to the previous screen (using browser history or route stack).
- Introduced a Filter button to improve discoverability and interaction with filtering logic.


### 🔽 SkipSection

**Problem:**  
All sections were stacked inside a single scrollable block. The header disappeared on scroll, leading to a disorienting experience, especially on data-heavy pages.

**Solution:**

- Decoupled the topbar from the scrollable content to improve user experience when moving through pages.
- Introduced a dedicated sidebar filter panel (desktop-first, collapsible on mobile) to reduce vertical scrolling and improve data accessibility.
- Applied component composition principles to enforce single-responsibility and reusable UI logic.

### 🧩 SkipCards

**Problem:**

- Redundant size tags cluttered the UI.
- Important warnings were buried in the bottom left of the card.
- The card selection indicator (blue tick) lacked visibility.
- CTA contained unnecessary duplication of tick icon.

**Solution:**

- Removed size tags since card metadata already communicated this info effectively.
- Moved warning badges to the top-right corner of each card for better visibility and consistent UX hierarchy.
- Replaced the blue tick indicator with a more prominent border highlight using conditional styling (`border-blue-500` for active).
- Removed tick from CTA to streamline call-to-action clarity.
- Implemented a modal sheet (`<Sheet />`) to display extended skip details (including warning and hidden metadata), enhancing the decision-making process.
- As a result, the previous Bottom Info Sheet was deprecated, its functionality now integrated contextually within each card’s info sheet.

## 🚀 Result

- Improved responsiveness.
- Cleaned up visual clutter, reducing cognitive load.
- Enhanced component reusability and layout scalability.
- Shifted to a more user-centric design, prioritizing clarity and interaction flow.

