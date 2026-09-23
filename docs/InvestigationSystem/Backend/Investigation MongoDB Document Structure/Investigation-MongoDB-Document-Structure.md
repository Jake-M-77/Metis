# Investigation MongoDB Document Structure

## 1. Purpose

This document defines the conceptual structure of the Investigation document stored in MongoDB.

The purpose is to establish how a complete Investigation is represented as a single persisted document, based on the Investigation Domain Model and the PostgreSQL ↔ MongoDB Boundary.

This document does not define implementation-specific database schemas, MongoDB configuration, application models, API contracts, validation rules, or persistence code.

Those concerns will be defined during implementation.

---

## 2. Core Principle

A complete Investigation is represented by a single MongoDB document.

MongoDB is the source of truth for Investigation-owned data.

The Investigation document contains the information required to represent the Investigation independently of the wider METIS dataset.

Where an Investigation is associated with wider METIS records, references to those records may be stored alongside the Investigation data. The Investigation does not become dependent on those records for its own historical state.

Conceptually:

```text
MongoDB
└── Investigation Document
    ├── Investigation identity
    ├── Core
    ├── Summary
    ├── Location
    ├── Classification
    ├── MO
    ├── Admin
    ├── People[]
    ├── Vehicles[]
    ├── Organisations[]
    ├── Tasks[]
    ├── Documents[]
    ├── Enquiry Log[]
    ├── History / Audit Log[]
    └── Optional Sections
```

---

# 3. Investigation Identity

The Investigation document contains the information required to identify the Investigation.

At minimum this includes:

* Investigation Reference

The Investigation Reference is the bridge between MongoDB and PostgreSQL.

It allows wider METIS metadata and relationships held in PostgreSQL to identify and retrieve the corresponding Investigation document from MongoDB.

The Investigation Reference must therefore be unique within the Investigation collection.

---

# 4. Core

Core contains the fundamental information describing the Investigation.

Current Core fields are:

* Date/time reported
* Incident from
* Incident to
* Reporting Officer
* Officer in Charge (OIC)

Core is intentionally limited to information already established as fundamental to the Investigation.

Additional Core fields are not being introduced at this stage.

If implementation identifies a genuine requirement for an additional Core field, the domain/design documentation will be amended rather than expanding this document prematurely.

---

# 5. Summary

The Investigation contains a singular Summary section.

The Summary contains the Investigation's descriptive overview and is Investigation-owned.

The Summary is editable by authorised users according to later-defined business rules.

The Summary does not retrieve its content from another METIS record.

---

# 6. Location

The Investigation contains its own Location data.

The Investigation Location includes the information required to represent the location associated with the Investigation.

Current information includes:

* Door number / house name
* Street
* Town / city
* County
* Postcode
* Police force
* Managing team
* Ward
* Parish
* District
* Latitude
* Longitude
* Easting
* Northing
* OS Grid Reference
* UPRN
* Other relevant location information

The Investigation retains this information as Investigation-owned data.

A wider METIS Location record may also be associated with the Investigation.

That association does not make the wider Location record the source of truth for the Investigation's historical location information.

---

# 7. Classification

Classification is stored within the Investigation as Investigation-owned data.

The selected classification represents the classification of that particular Investigation.

Reference classification information is maintained outside the Investigation document.

Classification is also represented within PostgreSQL where required for wider METIS searching and organisation.

This represents deliberate duplication with different responsibilities:

```text
MongoDB
└── Investigation Classification
    └── Part of the Investigation

PostgreSQL
└── Classification
    └── Wider METIS search / organisation
```

The PostgreSQL representation does not replace the Investigation's classification.

Classification may also be responsible for triggering automatically generated Investigation Tasks.

---

# 8. MO

The Investigation contains a singular MO (Modus Operandi) section.

The MO is Investigation-owned free-text information.

It is editable according to later-defined business rules.

---

# 9. Admin

The Investigation contains administrative information associated with the Investigation.

This may include:

* How contact was made
* Who contacted METIS
* Other applicable contact information

The Admin section is Investigation-owned.

---

# 10. People

An Investigation may contain multiple People.

People may have Investigation-specific roles including:

* Victim
* Suspect
* Witness

The Investigation stores the information associated with each Person required for the Investigation.

This information represents the Person as recorded within that Investigation.

A Person may also be associated with a wider METIS Person record.

Where such an association exists, the Investigation may store the relevant wider METIS reference.

The wider Person record does not replace the Investigation's stored Person information.

Conceptually:

```text
Investigation
└── People[]
    └── Person
        ├── Investigation information
        ├── Investigation role
        └── optional wider METIS Person reference
```

This allows the Investigation to retain its own historical state.

For example, if the wider Person record changes after the Investigation was created, the Investigation's existing information does not automatically change as a result.

Where linking to a wider METIS Person record provides additional information that is not currently populated within the Investigation, the system may use that wider information to populate appropriate empty Investigation fields.

Once populated, that information becomes part of the Investigation's own stored data.

---

# 11. Vehicles

An Investigation may contain multiple Vehicles.

Investigation-specific vehicle roles/statuses include:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

Vehicle information includes:

* Registration
* Registration knowledge
* Make
* Model
* Type
* Colour
* Distinguishing features

Vehicles also have an Investigation-specific lifecycle which may include:

* Found
* Recovered
* Removed

The Investigation stores its own Vehicle information and lifecycle state.

A Vehicle may also be associated with a wider METIS Vehicle record.

Where linked, the wider METIS reference provides an association rather than replacing the Investigation's stored information.

---

# 12. Organisations

An Investigation may contain multiple Organisations.

Organisation roles include:

* Victim
* Suspect

The Investigation stores the Organisation information required for the Investigation.

This may include:

* Organisation / business name
* Organisation type
* Primary contact
* Communication details
* Investigation role
* Relationships with People
* Relationships with Locations
* Relationships with Vehicles
* Documents associated with the Organisation

An Organisation may also be associated with a wider METIS Organisation record.

As with People and Vehicles, the wider record does not replace the Investigation's own information.

---

# 13. Tasks

An Investigation may contain multiple Tasks.

Tasks may be:

* Manually created
* Automatically generated
* Generated based on Classification
* Generated independently of Classification

Tasks contain their own information and lifecycle.

A Task may contain information such as:

* Task type
* Task details
* Assignment
* Status
* Completion information
* Other Task-type-specific information

Different Task types may require different information.

The exact structure of individual Task types is an implementation concern and is not defined by this document.

---

# 14. Documents

An Investigation may contain multiple Documents.

Document Management is responsible for the files and media associated with the Investigation.

Examples include:

* PDF
* DOCX
* Images
* CCTV
* Audio
* Video
* Statements
* Reports
* Other files/media

Documents may be associated with other Investigation data, including:

* People
* Vehicles
* Organisations
* Tasks
* Locations
* Other Investigation information

The MongoDB Investigation document stores Document metadata and references.

The actual file or media content is stored externally.

MongoDB therefore does not contain the binary contents of Investigation files.

There is currently no requirement for a separate central Evidence repository.

---

# 15. Enquiry Log

An Investigation contains an Enquiry Log.

The Enquiry Log records additional investigative information and activity entered by users.

Examples include:

* Further information
* Witness contact
* CCTV requests
* Interviews
* Evidence reviews
* Investigative activity
* Other relevant updates

The Enquiry Log is append-only.

Once an Enquiry Log entry has been saved, it cannot be removed.

This makes the Enquiry Log different from normal Investigation data, which may generally be edited according to later-defined business rules.

Conceptually:

```text
Investigation
└── Enquiry Log[]
    ├── Entry
    ├── Entry
    ├── Entry
    └── ...
```

---

# 16. History / Audit Log

The Investigation contains a system-generated History / Audit Log.

The Audit Log records significant system events affecting the Investigation.

Examples include:

* Investigation Created
* Classification Changed
* Person Linked
* Task Created
* Task Completed
* Investigation QA'd
* Investigation Status Changed
* Other system-generated events

Users do not manually create Audit Log entries.

The distinction is:

```text
Enquiry Log
└── Investigator activity / information

History / Audit Log
└── System-generated Investigation events
```

The user-facing terminology may remain **History**, while the underlying concept is an **Audit Log**.

The exact audit architecture and integration with wider METIS auditing will be defined separately.

---

# 17. Optional Sections

The Investigation document may contain optional sections.

Examples include:

* Property
* Financial
* Injuries
* Future Investigation-specific sections

Optional sections do not need to exist on every Investigation.

The document structure must therefore support Investigations containing different combinations of optional sections.

No optional section is being defined further until its requirements are established.

---

# 18. Investigation-Owned Data

The central rule for the MongoDB document is:

> Data entered into an Investigation belongs to that Investigation.

This applies to:

* People
* Vehicles
* Organisations
* Location
* Classification
* Summary
* Tasks
* Documents
* Enquiry Log
* Other Investigation sections

Association with a wider METIS record does not transfer ownership of the Investigation's data to that wider record.

---

# 19. Wider METIS References

Where an Investigation is linked to a wider METIS record, the Investigation may retain a reference to that record.

The reference provides association between the Investigation and the wider METIS dataset.

It does not mean that the Investigation dynamically retrieves its state from the wider record.

Conceptually:

```text
Investigation
│
├── Investigation-owned data
│
└── Wider METIS reference
          │
          ↓
    Wider METIS record
```

The reference exists to establish the relationship.

It does not make the wider record the source of truth for the Investigation.

---

# 20. Optional Data Enrichment

Linking to a wider METIS record may allow the system to populate Investigation fields that are currently empty.

For example:

```text
Investigation Person
├── Name: Jane Smith
├── Address: 10 Example Street
├── Occupation: [empty]
└── Wider Person Reference: P-123
```

If the wider Person record contains an occupation:

```text
Occupation: Teacher
```

the system may populate the empty Investigation field.

After this occurs:

```text
Investigation Person
├── Name: Jane Smith
├── Address: 10 Example Street
├── Occupation: Teacher
└── Wider Person Reference: P-123
```

The Investigation now contains that information itself.

It is not intended to dynamically retrieve the occupation every time the Investigation is opened.

The exact rules governing which fields may be enriched, when enrichment occurs, and whether existing Investigation values can ever be overwritten are implementation/business-rule concerns.

---

# 21. Historical Independence

The Investigation document must remain historically independent from the current state of wider METIS records.

For example:

```text
Investigation A
└── Person
    ├── Address: 10 Example Street
    └── Occupation: Company A

Investigation B
└── Person
    ├── Address: 25 Example Road
    └── Occupation: Company B
```

Both Investigations retain their own recorded information even if both refer to the same wider Person.

The wider Person record may contain associations with both Investigations, but changing the wider Person record must not automatically rewrite historical Investigation data.

---

# 22. PostgreSQL Representation

Some Investigation information is also represented in PostgreSQL.

This does not create a second complete Investigation.

Instead:

```text
MongoDB
└── Complete Investigation
    └── Source of truth

PostgreSQL
└── Investigation metadata / relationships
    └── Wider METIS search and organisation
```

Where relevant Investigation information is represented in PostgreSQL, PostgreSQL acts as the wider METIS searchable representation of that information.

MongoDB remains the source of truth for the Investigation itself.

---

# 23. Conceptual Document Shape

The resulting Investigation document can therefore be represented conceptually as:

```text
Investigation
│
├── Identity
│   └── Investigation Reference
│
├── Core
│   ├── Date/time reported
│   ├── Incident from
│   ├── Incident to
│   ├── Reporting Officer
│   └── OIC
│
├── Summary
│
├── Location
│
├── Classification
│
├── MO
│
├── Admin
│
├── People[]
│
├── Vehicles[]
│
├── Organisations[]
│
├── Tasks[]
│
├── Documents[]
│
├── Enquiry Log[]
│
├── History / Audit Log[]
│
└── Optional Sections
    ├── Property?
    ├── Financial?
    ├── Injuries?
    └── Future sections?
```

This represents the conceptual structure only.

The exact MongoDB field names, types, nesting decisions, indexes, validation, versioning, and implementation model are intentionally left for the implementation stage.
