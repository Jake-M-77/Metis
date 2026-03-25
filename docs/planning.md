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

- [ ] Create person-service
- [ ] Define initial Prisma schema
- [ ] Implement basic CRUD for persons
- [ ] Connect frontend to API
- [ ] Basic search endpoint (simple query)

---

### 🔵 Phase 3 — MVP Frontend
Goal: Functional UI for person search system

- [ ] Search page UI
- [ ] Person results view
- [ ] Person detail page
- [ ] Routing setup (React Router)
- [ ] API integration layer

---

### 🟣 Phase 4 — System Expansion (Post-MVP)
Goal: Extend functionality

- [ ] Custody service
- [ ] Investigation service
- [ ] Descriptor system (tattoos/scars)
- [ ] Advanced search service

---

### 🔴 Phase 5 — Scaling & Architecture Evolution
Goal: Prepare for microservices transition

- [ ] Split database per service (future)
- [ ] Introduce caching layer
- [ ] Add event-driven architecture (optional)
- [ ] Performance optimisation

---

## 🧠 3. Development Principles

- Build simple first, scale later
- Do not over-engineer MVP features
- Every feature must support the search-first goal
- Maintain clean separation between services
- Keep frontend thin, backend authoritative

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