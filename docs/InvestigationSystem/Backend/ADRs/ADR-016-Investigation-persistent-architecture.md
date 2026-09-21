# ADR-016: Investigation Persistence Architecture

## Status

Accepted

---

# Context

METIS Investigations contain a large and variable amount of information. An Investigation is composed of multiple sections and associated data, including:

* Core Investigation information
* Summary
* Classification
* Modus Operandi (MO)
* Administration
* History
* Enquiry Log
* Tasks
* People
* Vehicles
* Organisations
* Documents
* Links
* Optional Investigation sections such as Property, Financial and Injuries

The structure of an Investigation is not necessarily identical between Investigations. Optional sections may exist only when required, and some areas contain variable structures, such as different task types and Investigation-specific representations of People, Vehicles and Organisations.

A further requirement is that an Investigation must preserve its own historical state.

Information recorded within an Investigation must not depend on the current state of a wider METIS record. For example, if a Person's address changes after an Investigation has been completed or while another Investigation is being created, the original Investigation must retain the address that was recorded within that Investigation.

Therefore, an Investigation-specific representation or snapshot of relevant information may exist alongside a reference to the wider METIS entity.

Three persistence approaches were considered:

### 1. Traditional PostgreSQL relational model

The Investigation would be distributed across multiple relational tables, potentially including separate tables for:

* Investigations
* Investigation People
* Investigation Vehicles
* Investigation Organisations
* Tasks
* Documents
* Enquiry Log entries
* History
* Optional Investigation sections
* Other Investigation-specific data

This provides strong relational integrity and querying capabilities, but results in the complete Investigation being distributed across multiple database structures.

### 2. PostgreSQL with JSONB

The Investigation would remain stored in PostgreSQL, with a substantial portion of its variable structure represented using PostgreSQL JSONB.

This would allow the Investigation to retain a document-like structure while continuing to use PostgreSQL as the database technology.

### 3. MongoDB / NoSQL document storage

Each Investigation would be represented as a single MongoDB document.

The document would contain the complete persisted state of the Investigation, including its nested sections and Investigation-specific representations of associated entities.

The wider METIS PostgreSQL database would remain responsible for relationships and data that need to exist outside the Investigation itself.

For example, PostgreSQL may contain:

* Investigation references
* Person-to-Investigation relationships
* Location-to-Investigation relationships
* Vehicle-to-Investigation relationships
* Organisation-to-Investigation relationships
* Other wider METIS references and searchable relationships

MongoDB would therefore not be responsible for acting as the primary query system for the wider METIS application.

When an Investigation is opened, the Investigation reference can be used to retrieve the corresponding MongoDB document.

The Investigation reference therefore acts as the connection between the wider METIS PostgreSQL database and the persisted Investigation document.

The frontend will maintain the current working state of an Investigation while the user moves between Investigation sections. Changes made before the user saves do not need to be persisted to the database individually. Persistence occurs when the user saves the Investigation.

Actual document and media files will not be stored inside the MongoDB Investigation document. The Investigation will contain appropriate metadata and references to externally stored files.

---

# Decision

METIS will use **MongoDB as the persistence store for Investigation data**, with each Investigation represented as a single MongoDB document.

The MongoDB Investigation document will contain the complete persisted state of that Investigation, including its nested sections, associated Investigation-specific data and optional sections.

The wider METIS PostgreSQL database will remain responsible for information and relationships that exist outside the Investigation document.

The architectural separation will therefore be:

```text
PostgreSQL
    │
    ├── Investigation reference
    ├── Person relationships
    ├── Location relationships
    ├── Vehicle relationships
    ├── Organisation relationships
    └── Wider METIS data
              │
              │ Investigation reference
              ▼
MongoDB
    │
    └── Complete Investigation document
          ├── Core
          ├── Summary
          ├── Classification
          ├── MO
          ├── Admin
          ├── People
          ├── Vehicles
          ├── Organisations
          ├── Tasks
          ├── Documents
          ├── Enquiry Log
          ├── History
          └── Optional sections
```

MongoDB is preferred because the Investigation is fundamentally a document-shaped domain object with a large nested and variable structure.

The Investigation will be treated as a self-contained historical record. References to wider METIS entities may exist, but the Investigation must not depend on those entities to reconstruct its historical state.

Investigation-specific snapshots will therefore be stored where required.

The following approaches are not selected as the primary Investigation persistence model:

* A fully relational PostgreSQL Investigation model distributed across numerous tables.
* PostgreSQL JSONB as the primary Investigation document store.

PostgreSQL will nevertheless remain an important part of the Investigation architecture for wider METIS relationships, references and searchable data.

---

# Consequences

## Positive

* An Investigation can be represented as a single coherent document.
* The persisted structure closely matches the conceptual structure of the Investigation.
* Nested and optional Investigation sections can be represented naturally.
* New optional Investigation sections can be introduced without requiring every Investigation to contain the same structure.
* Investigation-specific snapshots can preserve historical state without depending on current global entity data.
* The complete persisted Investigation can be retrieved using its Investigation reference.
* The frontend can work with a coherent Investigation state while users move between sections.
* MongoDB is responsible only for Investigation persistence rather than becoming the database for the entire METIS application.
* PostgreSQL can continue to provide relational relationships and wider METIS search functionality.
* Actual files and media remain outside the Investigation document, avoiding unnecessary document-size growth.
* Investigation data and wider METIS data have clearly separated responsibilities.

---

## Negative

* METIS will use both PostgreSQL and MongoDB, increasing infrastructure and operational complexity.
* Developers will need to understand and maintain two database technologies.
* Relationships between PostgreSQL records and MongoDB Investigations must be maintained correctly.
* Referential integrity between the two databases cannot be enforced by a single database foreign-key constraint.
* Some information may intentionally exist in both PostgreSQL and MongoDB because the two representations serve different purposes.
* Changes affecting both PostgreSQL and MongoDB may require application-level coordination.
* MongoDB-specific indexing and query patterns will need to be designed for Investigation retrieval and modification.
* The MongoDB document structure must be designed carefully to avoid unnecessary document growth or deeply problematic nesting.

---

## Neutral / Future Considerations

* The exact MongoDB Investigation document structure will be defined during the Investigation domain-model and schema-design phases.
* The exact boundary between data stored in PostgreSQL and data stored in MongoDB will be defined before implementation.
* The Investigation reference will be indexed in MongoDB to allow efficient Investigation retrieval.
* The required MongoDB indexes will be determined from actual Investigation access patterns rather than indexing every field by default.
* Investigation save behaviour and concurrency handling will be defined during backend implementation.
* Enquiry Log entries are append-only and must not be removable once persisted.
* Investigation History and the wider METIS audit architecture will need to be reconciled during implementation so that responsibilities do not overlap unnecessarily.
* The maximum realistic Investigation document size should be tested using a representative worst-case Investigation before production implementation.
* The architecture may be revisited if future Investigation requirements introduce access patterns or consistency requirements that are not well suited to the document model.

---

# Related Documents

None at this time
