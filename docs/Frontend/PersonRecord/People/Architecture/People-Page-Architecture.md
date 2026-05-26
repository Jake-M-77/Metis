# METIS — People Page Architecture (PersonAssociation System)
**Version:** v0.1 (Research + Planning Summary)

## 1. Core Context
The METIS backend already handles:
* Person entities
* PersonAssociation relationships
* Bi-directional relationship resolution (e.g., `CHILD_OF` → `PARENT_OF`)
* Direction metadata (`INCOMING`, `OUTGOING`) for debugging/internal use

### Key Principle
The frontend **MUST NOT** compute relationship logic.

* **Frontend responsibility is strictly:**
    * rendering
    * UX
    * layout
    * interaction
    * performance
* **Backend responsibility:**
    * all relationship logic
    * all transformations
    * all data interpretation

---

## 2. Current Problem Areas Identified

### 2.1 Custody Image Problem
* **Issue:** `PersonAssociation` API does **NOT** include custody image.
* **Custody image API does NOT provide:**
    * `ACTIVE` flag
    * “latest image” indicator
* **Resulting challenge:** Frontend cannot reliably determine which image is current, whether an image exists, or how to prioritise images.

### 2.2 Architectural Tension
Two possible approaches:

#### Option A — Backend includes image in PersonAssociation response
* **Pros:** Fewer frontend requests, simpler UI rendering, faster initial load.
* **Cons:** Tight coupling between services, harder microservice separation later, custody image service becomes a dependency of `PersonAssociation`.

#### Option B — Card-level image fetch (preferred direction)
Each `PersonCard` independently fetches its custody image.
* **Pros:** Service decoupling, fault isolation (image service can fail safely), aligns with future microservices architecture, avoids tightly coupled API responses.
* **Cons:** Increased API calls, potential performance concerns, requires fallback handling.

##### Key concern identified
If the image service fails, only the image fails, **NOT** the entire People page. This is desirable resilience behaviour.

### 2.3 Scalability Concern
* **Risk:** 100 associated people → 100 image requests.
* **Mitigation (future phase):** Batching endpoint, caching layer, and lazy loading (viewport-based fetch).

### 2.4 Missing Backend Capability
Need to consider adding an `ACTIVE` custody image flag **OR** a backend “latest image resolver”. Otherwise, the frontend becomes forced to guess the “latest” file.

---

## 3. UI/UX Architecture Direction
**Chosen direction:** Card-based layout

* **Why cards instead of tables:**
    * relationship-based data (not tabular)
    * identity-focused entities
    * better visual grouping
    * more responsive layout control
    * better dark-mode aesthetics
    * supports multi-column layout
* **Layout philosophy:** Laptop-first design, half-screen efficiency, minimal vertical scrolling, and a dense but readable UI.
* **Grid behaviour concept:** Multiple cards per row, responsive wrapping, and avoids vertical scroll dependency.

### Example Concept

[ PersonCard ][ PersonCard ][ PersonCard ]
[ PersonCard ][ PersonCard ]

---

## 4. Interaction Model

### Core Principle
No deep nesting UI.

* **Avoid:** Recursive expansion trees and nested relationship drilling inside cards.
* **Preferred flow:** `Person Card` → **click** → `Full Person Record Page`

### Expand-on-demand discussion
Rejected for Phase 1 because it adds UI complexity, risks nested UX, and conflicts with the “single focus view” philosophy. However, the architecture will allow future enablement via components.

---

## 5. Data Flow Model (Current Understanding)

PersonAssociation API
↓
Frontend Card Renderer
↓
Per-card async calls (custody image, etc.)
↓
UI render completion

---

### Key Design Principle
The frontend does **NOT** resolve relationships, determine image logic, or compute the “latest” record. 

The frontend **ONLY** requests data, displays data, and handles fallback states.

---

## 6. Risk: Scope Creep (Confirmed High)
This page expands into:
* People
* Associations
* Custody images
* Filtering logic
* Relationship grouping
* Backend schema evolution

**Conclusion:** The People page is a “hub system”, not a simple UI page.

---

## 7. Phased Implementation Plan

### Phase 1 — Core Functional (MVP UI)
* **Focus:** Render `PersonAssociation` cards, basic grid layout, click-to-navigate functionality to the full person record, and minimal API calls required for display.
* **EXCLUDES:** Grouping, filtering, lazy loading optimisation, image batching, and advanced UX logic.

### Phase 2 — Service Optimisation
* **Focus:** Custody image resolution strategy, caching layer (frontend or backend), batching endpoints (if needed), loading states / fallback handling, and resilience improvements.

### Phase 3 — UX Enhancement
* **Focus:** Grouping (family, professional, etc.), filtering by `relationType`, category sections, improved layout density control, and advanced responsiveness tuning.

---

## 8. Backend Considerations Identified
Required potential changes:
* Custody image `ACTIVE` or “latest” flag **OR** a backend resolver for “primary image”.
* Potential image aggregation endpoint (future Phase 2).

---

## 9. Key Architectural Principles (METIS People Page)
* Backend is authoritative; frontend is render-only.
* Services should be independently fail-safe.
* Avoid tight coupling in API composition.
* Optimise for scalability before convenience.
* Design for future microservice separation.
* Laptop-first UI design using high density layouts with minimal scrolling.

---

### End Summary
What you now have is a clean architecture baseline, a phased roadmap, identified risks, a clear separation of concerns, a documentation strategy, and future extension points.