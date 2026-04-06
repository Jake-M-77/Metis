# 🧭 METIS — Planning & Roadmap

## 🎯 1. Current Focus

This section defines what is actively being worked on right now.

### Active Work:
- Initial project setup completed (monorepo structure)
- Docker infrastructure for PostgreSQL completed
- Frontend React app (Vite + TypeScript) initialised
- Documentation structure created

### Next Immediate Step:
- Set up backend service structure (person-service)
- Initialise Prisma and connect to PostgreSQL
- Define initial database schema (MVP)

---

## 🧱 2. Phase Breakdown

### 🟢 Phase 1 — Foundation (Current Phase)
Goal: Establish core system structure

- [x] Monorepo folder structure
- [x] Docker infrastructure (PostgreSQL)
- [x] Frontend React app setup
- [x] Docs structure
- [x] Git repository initialisation (if not done)
- [x] Backend service scaffolding
- [x] Prisma setup + database connection

---

### 🟡 Phase 2 — MVP Backend Core
Goal: Build minimal working backend

- [x] Create person-service
- [x] Define initial Prisma schema
- [x] Implement basic CRUD for persons
- [x] Basic search endpoint (simple query)

---

### 🟠 Phase 2.5 — Backend Testing & Validation

Goal: Ensure backend reliability before frontend integration

- [x] Set up Postman collection for manual testing
- [x] Implement automated tests (Jest + Supertest)
- [ ] Add validation layer (Zod or similar)
- [x] Improve error handling (consistent responses)

---

### 🔵 Phase 3 — MVP Frontend
Goal: Functional UI for person search system

- [x] Search page UI
- [x] Person results view
- [ ] Person detail page
- [x] Routing setup (React Router)
- [x] API integration layer

---

### ⚪️ Phase 3.5 — Frontend ↔ Backend Integration

Goal: Connect UI to live backend

- [x] Connect frontend to API
- [x] Display real data from backend
- [x] Handle loading & error states
- [x] Basic search functionality wired end-to-end

---

### POST MVP ###

## 🎨 🟣 Phase 4 — UI System & Frontend Experience (MVP+)

Goal: Build the full visual and layout system for Metis using Tailwind CSS

---

### 🧱 Phase 4.1 — Core Layout System
Goal: Define global application structure

- [x] Navbar styling (primary navigation)
- [x] App shell layout (header / sidebar / content structure)
- [x] Home page layout structure
- [x] Search page layout structure
- [x] Person page base layout (container + grid foundation)

---

### 🔍 Phase 4.2 — Search Experience UI
Goal: Turn search into a polished UI system

- [ ] Search input styling (focus states, spacing)
- [ ] Results list layout (cards or rows)
- [ ] Hover + active states for results
- [ ] Loading skeleton styling
- [ ] Empty state design (no results)

---

### 👤 Phase 4.3 — PersonRecord UI System
Goal: Build scalable nested record layout

- [x] Main container layout (split panel system)
- [x] Left navigation (overview / custody / etc.)
- [ ] Secondary navigation (sub-sections)
- [x] Content display panel layout
- [x] Nested layout structure support (future-proofing)

---

### 🎨 Phase 4.4 — Design System (Tailwind Usage Rules)
Goal: Ensure UI consistency using Tailwind (NOT a new design system)

- [x] Spacing consistency rules (padding / margin patterns)
- [x] Typography scale (text hierarchy rules)
- [x] Colour usage conventions (primary / muted / danger / success)
- [x] Border + shadow usage patterns
- [x] Define reusable Tailwind patterns (utility combinations)

---

### 🧪 Phase 4.5 — Person Detail Page
Goal: Complete full MVP+ user journey

- [ ] Full person detail page layout
- [ ] Structured data sections (overview, flags, history, etc.)
- [ ] Navigation between subsections
- [ ] Integration with PersonRecord layout system

---

### 🔒 Phase 4.6 — Validation & API Hardening
Goal: Improve backend reliability and data safety

- [ ] Add validation layer (Zod or similar)
- [ ] Standardise request/response schemas
- [ ] Improve backend error handling consistency
- [ ] Ensure API contracts are stable for frontend

---

### 🧪 Phase 4.7 — Frontend Component Testing
Goal: Ensure UI reliability as complexity grows

- [ ] Unit tests for key components
- [ ] React Testing Library setup
- [ ] Component rendering tests
- [ ] UI behaviour validation (props/state changes)

---

## 🧠 Phase 4 Principles

- Build UI using Tailwind utility classes by default
- Layout-first thinking (structure before styling detail)
- Keep UI simple and predictable
- Laptop-first design (no mobile focus yet)
- No custom CSS unless absolutely necessary

---

## 🚫 Phase 4 Non-Goals

- Do NOT introduce UI frameworks (MUI, Chakra, etc.)
- Do NOT build full component libraries too early
- Do NOT focus on mobile optimisation yet
- Do NOT add complex animations
- Do NOT over-engineer reusable UI abstractions

---

## 🟠 Phase 5 — System Expansion (Post-MVP+)

Goal: Extend backend capabilities and domain features

- [ ] Custody service
- [ ] Investigation service
- [ ] Descriptor system (tattoos / scars / marks)
- [ ] Advanced search service
- [ ] Event-driven architecture (future optional step)

---

## 🔴 Phase 6 — Scaling & Architecture Evolution

Goal: Long-term system scalability and optimisation

- [ ] Split database per service (future architecture step)
- [ ] Introduce caching layer
- [ ] Performance optimisation
- [ ] Microservices transition planning
- [ ] Infrastructure scaling considerations

---

## 📌 4. Definition of Done (MVP)

The MVP is complete when:

- A user can search for a person
- View search results
- Open a person record
- View structured person data
- Navigate basic UI layout

---

## 🚧 5. Current Risks / Considerations

- Avoid over-building microservices too early
- Keep database schema flexible during MVP
- Do not introduce complex search logic before core CRUD works
- Ensure API contracts stay stable between frontend/backend

---

## 📅 6. Next Milestone

### Immediate Goal:
> Get first backend service (person-service) running with Prisma connected to PostgreSQL

This is the first point where the system becomes "real".