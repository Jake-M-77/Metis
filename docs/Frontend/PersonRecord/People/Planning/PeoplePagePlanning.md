# METIS — People Page Implementation Plan
**(PersonAssociation System)**

## 1. Overview
This document defines the phased implementation strategy for the METIS People Page.

### The goal is to ensure:
* Controlled scope
* Predictable development stages
* Separation of concerns
* Scalability without premature optimisation
* Alignment with backend-driven architecture

---

## 2. Core Implementation Philosophy
The People Page is **NOT** treated as a simple UI page. It is treated as a **domain-level relationship surface**.

### Therefore, development follows:
* Incremental delivery
* Strict phase separation
* No feature creep within phases
* Backend-first compatibility
* Performance considerations deferred to appropriate phases

---

## 3. Phase Structure

### Phase 1 — Core Functional (MVP Rendering Layer)

#### Objective
Deliver a working People Page that renders `PersonAssociations` in a usable, navigable format.

#### Scope
* **Included:**
    * Render `PersonAssociation` data
    * Display cards for each associated person
    * Basic responsive grid layout
    * Dark-mode compatible UI
    * Click card → navigate to full person record
    * Basic loading state (optional minimal spinner/skeleton)
* **Explicitly Excluded:**
    * Grouping or categorisation
    * Filtering or search logic
    * Lazy loading or viewport optimisation
    * Image batching or optimisation
    * Advanced UX behaviour
    * Performance tuning

#### Success Criteria
* Page renders correctly with association data
* Cards display consistently across screen sizes
* Navigation to full person record works reliably
* No frontend business logic introduced

---

### Phase 2 — Service Optimisation Layer

#### Objective
Improve performance, resilience, and data-fetching efficiency.

#### Scope
* **Included:**
    * Custody image fetching strategy implementation
    * Batching API (if required)
    * Caching layer (frontend or backend)
    * Improved loading states (skeletons, placeholders)
    * Fallback handling for failed image requests
    * Performance stabilisation for large datasets
* **Key Focus Areas:**
    * Reduce API call overhead
    * Improve perceived performance
    * Isolate service failures (e.g., image service downtime)
    * Ensure scalability for large association lists
* **Explicitly Excluded:**
    * UI grouping logic
    * UX restructuring
    * Category systems
    * Major layout redesign

#### Success Criteria
* Reduced redundant network requests
* Graceful handling of missing or failed images
* Stable performance with large datasets (50–200 associations)
* No UI redesign required

---

### Phase 3 — UX Enhancement Layer

#### Objective
Enhance usability, information density, and user experience.

#### Scope
* **Included:**
    * Grouping by `relationType` (e.g., Family, Professional)
    * Filtering by relationship type
    * Category-based sections
    * Improved card layout density controls
    * Refined responsive behaviour (advanced breakpoints)
    * UX polish and interaction improvements
* **Key Focus Areas:**
    * Information organisation
    * User navigation efficiency
    * Reducing cognitive load
    * Improving discoverability of relationships
* **Explicitly Excluded:**
    * Backend schema changes (unless strictly required)
    * Core rendering changes
    * Service architecture changes

#### Success Criteria
* Users can easily locate relationship types
* UI remains minimal but more structured
* No performance degradation introduced
* Layout remains consistent with METIS design philosophy

---

## 4. Dependency Flow Between Phases

Phase 1 (Render System)
↓
Phase 2 (Performance + Services)
↓
Phase 3 (UX + Structure Enhancements)

Each phase must be completed before the next begins unless explicitly revisited via ADR.

---

## 5. Key Constraints
* Backend remains authoritative for all relationship logic.
* Frontend must not implement inverse relationship computation.
* Service failures must be isolated (no full-page failure due to sub-service failure).
* Design must remain laptop-first and dark-mode native.
* Minimal scrolling is a core UI requirement.

---

## 6. Architectural Alignment
This implementation plan aligns with:
* `PersonAssociation` backend resolver system
* Microservice decomposition strategy
* Card-based UI architecture
* ADR decision tracking system
* Mermaid-based system documentation

---

## 7. Related Documents

* 
*
*

---

## 8. Open Considerations (Tracked Separately)
These are **NOT** part of implementation but will be revisited via ADRs:
* Custody image “latest/active” resolution strategy
* Image batching endpoint design
* Virtualisation requirement for large datasets
* Potential API enrichment layer for `PersonAssociation` responses

---

*End of Document*