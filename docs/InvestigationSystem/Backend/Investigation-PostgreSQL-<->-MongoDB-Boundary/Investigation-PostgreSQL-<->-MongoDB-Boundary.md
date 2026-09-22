# Investigation PostgreSQL ↔ MongoDB Boundary

## 1. Purpose

This document defines the boundary between the PostgreSQL and MongoDB data stores used by METIS Investigations.

The purpose is to establish:

* Which Investigation information is persisted in MongoDB
* Which Investigation metadata is maintained in PostgreSQL
* Which relationships are maintained in PostgreSQL
* How PostgreSQL and MongoDB identify the same Investigation
* How Investigation creation interacts with both databases
* How linking and unlinking Investigation data affects the wider METIS dataset
* How Investigation-specific historical state is maintained

This document does not define the MongoDB document schema, PostgreSQL schema, API implementation, or frontend implementation.

---

# 2. Database Responsibilities

METIS will use two databases with separate responsibilities.

## MongoDB

MongoDB is responsible for the **complete Investigation**.

The MongoDB Investigation document is the source of truth for the Investigation's own data.

This includes:

* Core Investigation information
* Summary
* Location information
* Classification information
* Modus Operandi
* Administration
* People
* Vehicles
* Organisations
* Tasks
* Documents and document metadata
* Enquiry Log
* Investigation History
* Optional Investigation sections

MongoDB therefore represents the Investigation as a complete, self-contained document.

---

## PostgreSQL

PostgreSQL remains the wider METIS relational database.

PostgreSQL does not contain a second copy of the Investigation.

It stores only the Investigation information required by the wider METIS system and relationships required to discover or organise Investigations.

Current Investigation-level metadata identified for PostgreSQL is:

* Investigation Reference
* Status
* Current OIC
* Created By
* Classification

Additional metadata may be added if a future requirement demonstrates that it is needed by the wider METIS system.

The principle is:

> **PostgreSQL should contain the minimum amount of Investigation information necessary for the wider METIS system.**

---

# 3. Source of Truth

MongoDB is the source of truth for the Investigation itself.

PostgreSQL is the source of truth for the wider METIS relationships and Investigation metadata that it owns.

This prevents the Investigation from being represented as two separate complete records.

The system should avoid storing the same Investigation information in both databases where there is no independent requirement for that information to exist in PostgreSQL.

Conceptually:

```text
MongoDB
    │
    └── Complete Investigation
            │
            │ Investigation-owned data
            │
            ▼
       Source of truth
       for Investigation


PostgreSQL
    │
    └── Investigation metadata + relationships
            │
            │ Wider METIS responsibilities
            │
            ▼
       Source of truth
       for wider METIS
```

---

# 4. Investigation Reference

Every Investigation has a unique Investigation Reference.

The Investigation Reference is the common identifier used to associate the MongoDB Investigation document with its corresponding PostgreSQL record.

Conceptually:

```text
PostgreSQL
────────────────
Investigation
INV-000001
      │
      │ Investigation Reference
      │
      ▼
MongoDB
────────────────
Investigation
INV-000001
```

The Investigation Reference is required in PostgreSQL so that Investigations can be searched and identified by their reference.

The Investigation Reference is also indexed in MongoDB to allow efficient retrieval of the corresponding Investigation document.

---

# 5. PostgreSQL Investigation Metadata

The current PostgreSQL Investigation record contains only the metadata required by the wider METIS system.

## Investigation Reference

Used to:

* Identify the Investigation
* Search for the Investigation
* Associate the PostgreSQL record with the MongoDB document
* Create relationships to wider METIS data

## Status

Represents the current Investigation lifecycle state.

Potential lifecycle states include:

* Awaiting QA
* Awaiting Links Processing
* Awaiting Officer Allocation
* Allocated
* Closed

The exact lifecycle states will be defined separately.

Status is stored in PostgreSQL because the wider METIS system needs to organise and retrieve Investigations based on their current lifecycle state.

For example:

```text
QA Team
│
└── Awaiting QA
    ├── INV-000001
    ├── INV-000014
    └── INV-000027
```

---

## Current OIC

The current Officer in Charge is stored in PostgreSQL because it is required by the wider METIS workflow.

This allows Investigations to be:

* Allocated to an OIC
* Displayed in an OIC's Investigation workspace
* Searched by current OIC

The Investigation itself continues to contain its own Investigation information relating to the OIC.

---

## Created By

The creator of the Investigation is stored in PostgreSQL.

This represents the person who initially created/reported the Investigation, such as the first person to receive the relevant call, report or job.

This allows the wider METIS system to identify and search for Investigations by their creator.

---

## Classification

The Investigation's selected classification is represented in PostgreSQL so that the wider METIS system can search and organise Investigations by crime type/classification.

The classification information also exists within the MongoDB Investigation because it is part of the Investigation itself.

This is an intentional duplication caused by two separate responsibilities:

```text
MongoDB
    ↓
Classification recorded on Investigation

PostgreSQL
    ↓
Classification used for wider METIS searching/relationships
```

The classification reference data itself is maintained separately from both systems.

---

# 6. Wider METIS Relationships

PostgreSQL is responsible for relationships between Investigations and wider METIS entities.

Current relationships include:

* Investigation ↔ Person
* Investigation ↔ Location
* Investigation ↔ Vehicle
* Investigation ↔ Organisation
* Investigation ↔ Classification

Additional relationships may be introduced where a demonstrated wider METIS requirement exists.

Relationships exist to allow the wider METIS system to discover an Investigation through associated information.

For example:

```text
Person P-123
    │
    ├── Investigation INV-001
    ├── Investigation INV-014
    └── Investigation INV-029
```

Searching for Person P-123 therefore occurs through PostgreSQL rather than MongoDB.

Opening a resulting Investigation then retrieves the complete Investigation from MongoDB using its Investigation Reference.

---

# 7. Investigation Data and Relationships

The existence of a PostgreSQL relationship does not transfer ownership of Investigation data to PostgreSQL.

For example:

```text
MongoDB
──────────────────────
INV-001

Person:
    Jane Smith
    Role: Victim
    Address: 10 Example Street
```

PostgreSQL:

```text
Person P-123
        │
        └── linked Investigation
                INV-001
```

The PostgreSQL relationship allows METIS to discover that Jane is associated with INV-001.

The Investigation's Person information remains owned by INV-001.

---

# 8. Historical Investigation State

Investigation data must retain the state that was recorded within the Investigation.

A wider METIS entity may change after an Investigation has been created.

For example:

```text
INV-001
Jane Smith
Address: 10 Example Street
```

Later:

```text
Wider METIS Person
Jane Smith
Current Address: 25 Example Road
```

INV-001 must continue to represent:

```text
10 Example Street
```

The wider Person record must not dynamically replace the Investigation's historical information.

This applies particularly to Investigation-specific representations of:

* People
* Vehicles
* Organisations
* Locations
* Other information where historical state is relevant

The exact snapshot and amendment mechanisms will be defined during implementation and domain-detail design.

---

# 9. Investigation Creation

Investigation creation follows the following conceptual sequence:

```text
User creates Investigation
        ↓
Generate Investigation Reference
        ↓
Create Investigation document
in MongoDB
        ↓
MongoDB creation succeeds
        ↓
Create Investigation record
in PostgreSQL
        ↓
Create required PostgreSQL relationships
```

MongoDB is therefore created before the corresponding PostgreSQL Investigation record.

A system mechanism will be responsible for determining the next available Investigation Reference and incrementing the sequence.

The exact implementation of Investigation Reference generation will be defined separately.

Failure handling between the two database operations is not defined by this document and will be addressed as part of backend consistency and failure-handling design.

---

# 10. Linking

Linking establishes an explicit relationship between Investigation-owned data and wider METIS data.

For example:

```text
Investigation
    │
    │ Link
    ▼
METIS Person
```

The purpose of the relationship is to allow the wider METIS system to discover the Investigation through the linked entity.

For example:

```text
Person P-123
    ↓
Associated Investigations
    ↓
INV-001
INV-014
INV-029
```

The link does not replace the Investigation's own data.

---

# 11. Unlinking

Unlinking removes the relationship between the Investigation and the wider METIS record.

The result depends on how the wider record originated.

## Existing Wider METIS Record

If the linked record existed before the Investigation relationship was established:

```text
Existing Person
       │
       └── Investigation link
                ↓
            Unlink
                ↓
Existing Person remains
Investigation relationship removed
```

The wider METIS record is not deleted.

---

## Record Created Through the Investigation

If the wider METIS record was created as a result of the Investigation:

```text
Investigation
       │
       └── Creates wider METIS record
                    ↓
                  Link
                    ↓
                Unlink
                    ↓
      Wider record removed from METIS
```

The exact conditions and safeguards surrounding this behaviour will be defined separately.

---

# 12. Deliberate Data Duplication

Some information will intentionally exist in both MongoDB and PostgreSQL.

This does not represent two competing sources of truth where the information serves different purposes.

For example:

```text
MongoDB
INV-001
    Classification:
        Theft from Shop

PostgreSQL
INV-001
    Classification:
        Theft from Shop
```

MongoDB stores the classification as part of the Investigation.

PostgreSQL stores the classification because the wider METIS system needs to search and organise Investigations by classification.

Likewise, Investigation-specific historical information may exist in MongoDB independently of the current wider METIS representation.

The principle is:

> **Duplicate information is acceptable where each copy has a distinct responsibility and source-of-truth boundary.**

---

# 13. Documents

Documents are currently considered a potential PostgreSQL relationship.

However, a separate PostgreSQL Document relationship will not be introduced without a demonstrated requirement.

The Investigation remains responsible for its own document metadata and references within MongoDB.

Actual file contents remain outside MongoDB.

The requirement for wider METIS document searching or relationships will be evaluated separately before introducing additional PostgreSQL persistence.

---

# 14. Boundary Principles

The following principles define the PostgreSQL ↔ MongoDB boundary:

1. **MongoDB owns the complete Investigation.**
2. **PostgreSQL does not contain a second complete Investigation.**
3. **PostgreSQL stores only Investigation metadata required by wider METIS functionality.**
4. **PostgreSQL owns wider METIS relationships involving Investigations.**
5. **The Investigation Reference connects the PostgreSQL and MongoDB representations.**
6. **Searching wider METIS relationships occurs through PostgreSQL.**
7. **Opening an Investigation retrieves its Investigation data from MongoDB.**
8. **Investigation-owned data remains independent of wider METIS records.**
9. **Historical Investigation state must be preserved.**
10. **Intentional duplication is permitted where the duplicated information serves separate responsibilities.**
11. **Additional PostgreSQL data or relationships must have a demonstrated requirement.**
12. **The exact database schemas and implementation mechanisms are defined separately.**
