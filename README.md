# METIS

## Overview

METIS is a full-stack **Record Management System (RMS)** designed to manage and display structured records through a scalable, domain-based architecture.

The system is currently in an **MVP+ (Post-MVP)** stage, with a working end-to-end flow focused on **person records**. It forms the foundation for a broader multi-domain RMS platform.

---

## Current Functionality (MVP+)

At this stage, METIS supports:

* Viewing a structured **person record**
* Navigating organised record sections within the UI
* Full data flow: database → API → frontend
* Basic search and retrieval of person data

The current system represents a complete vertical slice of the core architecture.

---

## Planned Expansion

METIS is designed to evolve into a full RMS platform covering multiple domains, including:

* Known associates (linked people)
* Locations
* Communications (phone, email, landline, social media, etc.)
* Vehicles
* Custody records
* Intelligence reports
* Investigations
* Missing person records

Each domain will eventually be separated into its own service.

---

## Tech Stack

* **Frontend:** React (Vite + TypeScript), Tailwind CSS
* **Backend:** Node.js (Express + TypeScript)
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Containerisation:** Docker (database only at present)
* **Validation:** Zod
* **Testing:** Jest, React Testing Library, Supertest
* **API Testing:** Postman (development use)

---

## Architecture

METIS follows a **domain-based monolithic architecture**, intentionally structured to evolve into a multi-service system over time.

### Current Structure:

* `frontend/` → React application (UI layer)
* `services/person-service/` → Person domain API
* `infra/` → Docker configuration (PostgreSQL)
* `docs/` → architecture and planning

### Design Approach:

* Domain separation from the start
* Services are isolated in structure, even if temporarily sharing responsibilities
* Built with future service extraction in mind

---

## Current Architectural Trade-offs

During the MVP phase, the **person-service** temporarily handles responsibilities that will later be split into dedicated domain services.

This is a deliberate decision to:

* Avoid early-stage scope creep
* Maintain focus on completing a working vertical slice
* Reduce unnecessary service fragmentation before core stability

As new domains are introduced, functionality will be extracted into dedicated services. The current structure ensures this can be done incrementally without rewriting the system.

---

## Design Principles

METIS is built around the following principles:

* **Separation of concerns:** Each domain is isolated by structure
* **Loose coupling:** Services are designed to evolve independently
* **Incremental complexity:** Only introduce architecture when needed
* **Resilience thinking:** Systems should tolerate failure without full breakdown
* **Scalability by design:** Architecture supports future service decomposition

---

## Running the Project

### 1. Start the database

```bash id="metis_db"
docker compose -f infra/docker-compose.yml up -d
```

### 2. Start backend (person-service)

```bash id="metis_backend"
cd services/person-service
npm install
npm run dev
```

### 3. Start frontend

```bash id="metis_frontend"
cd frontend
npm install
npm run dev
```

---

## Testing

* **Backend:** Jest + Supertest
* **Frontend:** React Testing Library

Run tests:

```bash id="metis_tests"
npm test
```

---

## Purpose

METIS was built to consolidate knowledge gained from previous projects into a single, cohesive system, while also expanding into more complex areas such as testing, architecture design, and scalable backend systems.

It explores how real-world record systems can be structured more effectively by reducing fragmentation and centralising access to information through a domain-based approach.

The system is intentionally designed to be **modular and resilient**, where services operate independently and can be restarted or replaced without impacting the wider system.

This reflects a real-world approach to building systems that evolve over time rather than being fully defined upfront.

---

## Future Architecture Considerations

As the system evolves, additional technologies and infrastructure may be introduced to support different types of data and scaling requirements.

Planned directions include:

* Cloud infrastructure (e.g. Azure) for hosting and scaling services
* Object storage for unstructured data (e.g. images, media files)
* Separation of storage strategies based on domain requirements

Relational data will remain in PostgreSQL, while non-relational or large-scale data will be handled using more appropriate storage solutions.

These changes will be introduced gradually as new domains are developed.

---

## Current Status

**MVP+ (Post-MVP)**

* Core person record system is complete
* Frontend ↔ backend integration is working
* System is now positioned for domain expansion

---

## Notes

* Configured for local development
* Docker currently used for database only
* Some values (e.g. localhost endpoints) are intentionally hardcoded for simplicity
* Architecture is intentionally evolving, not final

---
