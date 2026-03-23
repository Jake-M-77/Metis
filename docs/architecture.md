# 🧠 METIS — RMS System Architecture

## 🏷️ 1. Project Overview

Metis is a modular, investigative Records Management System (RMS) designed to unify fragmented person-centric data into a single searchable platform.

The system is designed with future scalability in mind, supporting a transition from a monolithic database approach to a microservice-based architecture.

It prioritises:
- Fast and scalable search
- Modular backend design
- Clean separation of domains
- Future extensibility for complex investigative workflows

---

## 🏗️ 2. High-Level System Architecture

Metis follows a modular, microservice-ready architecture.

### Core Stack:
- Frontend: React (TypeScript)
- Backend: Multiple Express APIs (Node.js + TypeScript)
- Database: PostgreSQL (shared initially)
- ORM: Prisma
- Containerisation: Docker (entire system)

---

## 🧩 3. System Design Overview

The system is structured into domain-based services:

- Person Service (core identity data)
- Search Service (query orchestration layer)
- Custody Service (custody-related records)
- Investigation Service (case management)

### High-Level Flow:

Frontend → Backend Services → PostgreSQL Database

---

## 🔄 4. Architecture Philosophy

Metis is built on the principle of:

> "Microservice-shaped architecture running as a monolith (initially)"

### This means:
- Services are separated by domain from day one
- All services share a single database initially
- Services communicate via HTTP
- The system is designed to support future separation into independent microservices

---

## 🗄️ 5. Database Strategy (High-Level)

- Single shared PostgreSQL database (MVP phase)
- Relational design with strict ID-based relationships
- Data is structured to allow future migration to service-owned databases

### Key Principles:
- No embedded data duplication
- All relationships use IDs
- Schema designed for future service separation

---

## 🐳 6. Infrastructure (Docker)

The entire system is containerised using Docker.

### Planned Containers:
- Frontend (React application)
- Multiple backend services (Express APIs)
- PostgreSQL database

### Benefits:
- Environment consistency
- Easy local development setup
- Future cloud deployment readiness (Azure-ready architecture)
- Scalable service isolation

---

## 🎯 7. MVP Scope

### MVP Goal:
Deliver a functional person-record management system.

### MVP Capabilities:
- Search for a person
- View search results
- Open a person record
- Display basic personal information
- Navigate between core UI sections

### Not included in MVP:
- Advanced search system
- Descriptor/tattoo analysis
- Custody system (fully developed)
- Investigation system (fully developed)
- Microservice database separation

---

## 🚀 8. Future Vision

After MVP completion, the system will evolve into:

### Advanced Features:
- Complex multi-field search system
- Descriptor-based search (tattoos, scars, marks)
- Caching and performance optimisation
- Full-text search capabilities
- External data ingestion systems

### Architecture Evolution:
- Transition from shared database → service-owned databases
- Introduction of event-driven architecture (future)
- Independent deployment per service

---

## 🧠 9. Core Design Principles

- Modular-first architecture
- Domain-driven service separation
- Shared database during MVP phase
- ID-based relational design
- Performance-aware structure
- Scalable for future distributed systems

---

## 📌 10. Summary

Metis is a modular, microservice-ready RMS system built using React, Node.js, PostgreSQL, and Docker.

It is designed to:
- Start simple (shared DB monolith)
- Scale cleanly into microservices
- Support complex investigative workflows in the future