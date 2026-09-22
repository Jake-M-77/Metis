# Investigation Domain Model

## 1. Purpose

This document defines the conceptual domain model of an Investigation within METIS.

The purpose of this document is to establish:

* What constitutes an Investigation
* What information belongs to an Investigation
* Which Investigation components are singular or collections
* Which components are editable, append-only, or automatically generated
* Which components have their own lifecycle
* How Investigation-owned data relates conceptually to wider METIS data

This document does not define database schemas, MongoDB implementation details, API contracts, frontend state management, or validation rules.

---

# 2. Investigation

An Investigation is a self-contained record containing all information recorded as part of that Investigation.

The Investigation owns the information entered into it.

An Investigation may contain references or relationships to wider METIS data, but those relationships do not make the wider METIS record the source of the Investigation's historical state.

The Investigation must therefore retain its own Investigation-specific information.

Conceptually:

```text
Investigation
│
├── Identity
├── Core Information
├── Summary
├── Location
├── Classification
├── Modus Operandi
├── Administration
├── People
├── Vehicles
├── Organisations
├── Tasks
├── Documents
├── Enquiry Log
├── History / Audit Information
└── Optional Sections
```

---

# 3. Investigation Identity

An Investigation has a unique Investigation reference.

The Investigation reference provides the identity of the Investigation across METIS.

The reference is used when retrieving the Investigation from its persistence store and when establishing relationships between the Investigation and wider METIS data.

The Investigation reference does not replace the Investigation's actual data.

---

# 4. Core Information

Core Information contains the fundamental information that identifies and describes the Investigation.

Current core information includes:

* Victim
* Suspect
* Summary
* Classification
* Date/time reported
* Incident date/time from
* Incident date/time to
* Reporting Officer
* Officer in Charge (OIC)
* Investigation Location

Core Information is owned by the Investigation.

Some core information may also participate in relationships with wider METIS records.

---

# 5. Summary

The Summary contains the Investigation's descriptive summary.

The Summary is:

* Investigation-owned
* User-editable
* Singular within the Investigation

The Summary represents what is recorded about the Investigation and does not depend on a separate global record.

---

# 6. Location

An Investigation contains its own location information.

Location information may include:

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

An Investigation Location may be associated with a wider METIS Location record.

This association is deliberate and does not mean that the Investigation dynamically retrieves its historical location information from the wider METIS Location record.

Where a location does not already exist within the wider METIS dataset, it may subsequently be introduced into that dataset through the location workflow.

---

# 7. Classification

Classification represents the classification selected for the Investigation.

Classification information is based on separate classification/reference data maintained outside the Investigation.

The Investigation stores the classification selected for it.

The selected classification may also be associated with wider METIS data to support functionality such as searching for Investigations by classification.

Classification may influence automatic Investigation behaviour, including the generation of Tasks.

The classification reference data itself is not owned by the Investigation.

---

# 8. Modus Operandi

The Modus Operandi (MO) contains the Investigation's recorded description of the method or circumstances involved.

MO is:

* Investigation-owned
* User-editable
* Singular within the Investigation

The MO is currently represented as a free-text Investigation field.

---

# 9. Administration

Administration contains administrative information associated with the Investigation.

Examples include:

* How contact was made
* Who contacted METIS
* Other administrative information
* Information dependent on the method of contact

Administrative information is Investigation-owned and user-editable.

---

# 10. People

People represent individuals associated with an Investigation.

An Investigation may contain multiple People.

People may have Investigation-specific roles including:

* Victim
* Suspect
* Witness

The Investigation contains its own representation of the Person and any information recorded about that Person within the Investigation.

The Investigation-specific representation may contain a reference to a wider METIS Person where an association has been established.

The wider Person record must not be treated as the source of the Investigation's historical state.

Conceptually:

```text
Investigation
│
└── Person
    ├── Investigation role
    ├── Investigation-specific information
    ├── Investigation-specific snapshot
    └── Optional wider METIS association
```

A Person may therefore appear in multiple Investigations with different Investigation-specific information.

---

# 11. Vehicles

Vehicles represent vehicles associated with an Investigation.

An Investigation may contain multiple Vehicles.

Current Investigation vehicle roles include:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

Vehicles also have an Investigation-specific lifecycle which currently includes:

* Found
* Recovered
* Removed

Vehicle information is owned by the Investigation.

A Vehicle may subsequently be associated with wider METIS vehicle data, but the Investigation retains its own Investigation-specific information.

The Vehicle lifecycle is independent of the Investigation lifecycle.

---

# 12. Organisations

Organisations represent businesses or other organisations associated with an Investigation.

An Investigation may contain multiple Organisations.

Current Investigation roles include:

* Victim
* Suspect

Organisation information may include:

* Organisation / business name
* Organisation type
* Primary contact
* Communication details
* Investigation role
* Relationships with People
* Relationships with Locations
* Relationships with Vehicles
* Documents

The Investigation owns the information recorded about the Organisation within the Investigation.

A wider METIS Organisation association may be established separately.

---

# 13. Tasks

Tasks represent work associated with an Investigation.

An Investigation may contain multiple Tasks.

Tasks may:

* Be manually created
* Be automatically generated
* Have different Task types
* Contain different information depending on Task type
* Be assigned to users
* Have an outstanding or completed state
* Have their own lifecycle

Some Tasks may be automatically generated based on the Investigation's Classification.

Other Tasks may be automatically generated independently of Classification.

Tasks are Investigation-owned.

---

# 14. Documents

Documents represent files and media associated with an Investigation.

An Investigation may contain multiple Documents.

Documents may include:

* PDF documents
* DOCX documents
* Images
* CCTV
* Audio
* Video
* Statements
* Reports
* Other Investigation-related files and media

The Investigation stores document metadata and references to the associated files.

The actual file contents are stored outside the Investigation persistence document.

Documents may be associated with other Investigation components, including:

* People
* Vehicles
* Organisations
* Tasks
* Locations
* Other Investigation data

There is no separate Investigation-level Evidence repository. Evidence files and other Investigation files are managed through Document Management.

---

# 15. Enquiry Log

The Enquiry Log records chronological activity carried out during an Investigation.

An Investigation may contain multiple Enquiry Log entries.

Examples include:

* Completed interview with a suspect
* Contacted a witness
* Requested CCTV
* Reviewed evidence

Enquiry Log entries are **append-only**.

Once an Enquiry Log entry has been created, it cannot be removed.

The Enquiry Log is therefore distinct from ordinary editable Investigation information.

---

# 16. History and Audit Information

History records automatically generated Investigation events.

Examples include:

* Investigation Created
* Person Linked
* Classification Changed
* Task Created
* Task Completed
* Investigation QA'd

History entries are generated by the system rather than manually created by investigators.

History is therefore distinct from the Enquiry Log:

```text
History
└── System-generated Investigation events

Enquiry Log
└── Investigator-created chronological activity
```

The exact relationship between Investigation History and the wider METIS audit architecture will be defined separately.

---

# 17. Optional Investigation Sections

An Investigation may contain optional sections.

Potential sections include:

* Property
* Financial
* Injuries
* Future Investigation-specific sections

Optional sections are owned by the Investigation.

Not every Investigation is required to contain every optional section.

The domain model therefore supports Investigations having different sets of sections while remaining the same Investigation type.

---

# 18. Investigation Data Ownership

The Investigation is the owner of information entered into the Investigation.

A relationship with wider METIS data does not transfer ownership of the Investigation's information to the wider record.

Conceptually:

```text
Investigation
│
├── Owns Investigation data
│
├── May reference wider METIS records
│
└── May establish relationships with wider METIS records
```

For example:

```text
Investigation INV-001
│
├── Person
│   ├── Investigation-specific information
│   └── association → METIS Person P-123
│
└── Location
    ├── Investigation-specific location information
    └── association → METIS Location LOC-123
```

The wider METIS record does not replace the Investigation's own data.

---

# 19. Editing and Mutability

Investigation information is generally user-editable.

The following exceptions currently apply:

### Enquiry Log

Enquiry Log entries are append-only and cannot be removed once created.

### Locked Information

Certain Investigation fields may become non-editable after specific relationships or actions occur.

The exact locking rules will be defined during implementation and business-rule design.

---

# 20. Automatically Generated Information

Some Investigation information may be generated by the system.

Currently identified automatically generated information includes:

* Classification-dependent Tasks
* Other mandatory/generated Tasks
* Investigation History
* Other future audit information

Automatically generated information remains part of the Investigation once created.

The exact generation rules will be defined separately.

---

# 21. Investigation Structure

At the domain level, an Investigation can therefore be represented as:

```text
Investigation
│
├── Identity
│
├── Core Information
│   ├── Victim
│   ├── Suspect
│   ├── Summary
│   ├── Classification
│   ├── Reported Date/Time
│   ├── Incident Date/Time
│   ├── Reporting Officer
│   └── OIC
│
├── Location
│
├── Summary
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
├── History[]
│
└── Optional Sections
    ├── Property
    ├── Financial
    ├── Injuries
    └── Future Sections
```

This represents the conceptual Investigation domain and does not prescribe the eventual MongoDB document schema.

---

# 22. Domain Principles

The following principles apply to the Investigation domain:

1. **The Investigation owns the information recorded within it.**
2. **An Investigation must preserve its own historical state.**
3. **Wider METIS records do not replace Investigation-specific information.**
4. **Relationships with wider METIS records are deliberate associations.**
5. **Optional sections are supported as part of the Investigation domain.**
6. **Enquiry Log entries are append-only.**
7. **Vehicles have their own Investigation-specific lifecycle.**
8. **Tasks may be manually or automatically generated.**
9. **History and audit information may be automatically generated.**
10. **Actual document/media files are external to the Investigation persistence document.**
11. **Validation and mandatory-field rules are implementation/business-rule concerns and are not defined by this document.**
12. **The domain model does not prescribe the physical database schema.**
