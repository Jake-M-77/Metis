# Investigation PostgreSQL ↔ MongoDB Consistency and Save Behaviour

## 1. Purpose

This document defines the conceptual save, update, and consistency behaviour between MongoDB and PostgreSQL for Investigations.

It establishes the order in which an Investigation is persisted, how subsequent changes are handled, and how failures between the two databases are treated.

This document does not define the implementation of change detection, transactions, retry mechanisms, failure queues, reconciliation jobs, or other backend infrastructure.

Those decisions will be made during implementation where required.

---

# 2. Core Principle

MongoDB is the source of truth for the complete Investigation.

PostgreSQL contains the Investigation metadata and relationships required by wider METIS.

Therefore, persistence follows this principle:

```text id="t8g9qm"
MongoDB
└── Complete Investigation
        ↓
PostgreSQL
└── Wider METIS representation
```

MongoDB must be successfully created before the PostgreSQL Investigation record can be created.

PostgreSQL must never be treated as the source of truth for the Investigation itself.

---

# 3. New Investigation Creation

A new Investigation is not persisted when the user first opens or begins filling out the Investigation.

The Investigation exists as working state until the user provides the required information and performs the first successful Save.

The first Save follows this conceptual process:

```text id="t0pf2r"
User completes required Investigation information
                  ↓
                Save
                  ↓
       Generate Investigation Reference
                  ↓
        Create MongoDB Investigation
                  ↓
              Success?
             /        \
           No          Yes
           ↓            ↓
      Notify user   Extract required
      of failure    PostgreSQL data
                         ↓
                Create PostgreSQL record
                         ↓
                     Success?
                    /       \
                  No         Yes
                  ↓           ↓
             Handle/record    Creation
                failure       complete
```

The exact Investigation Reference generation mechanism is an implementation concern.

The Investigation Reference must be established before the PostgreSQL record is created.

---

# 4. MongoDB Creation

MongoDB is created first during the initial persistence of an Investigation.

The MongoDB document contains the complete Investigation as defined by the Investigation MongoDB Document Structure.

MongoDB creation must succeed before PostgreSQL creation begins.

This establishes a clear dependency:

```text id="n7y7fk"
MongoDB
   ↓
PostgreSQL
```

The reverse dependency does not exist during initial creation.

---

# 5. PostgreSQL Creation

Once the MongoDB Investigation has been successfully created, the system extracts the information required by PostgreSQL.

Only the fields already defined as relevant to the PostgreSQL Investigation representation are persisted there.

The PostgreSQL record is therefore created from the successfully persisted Investigation rather than being created independently first.

Conceptually:

```text id="2t9qga"
MongoDB Investigation
        │
        ├── Complete Investigation
        │
        └── Relevant PostgreSQL fields
                    ↓
             PostgreSQL record
```

PostgreSQL does not receive a second complete copy of the Investigation.

---

# 6. Existing Investigation Save

Once an Investigation already exists, subsequent Saves update the existing Investigation.

The conceptual process is:

```text id="xpxxsk"
User edits Investigation
        ↓
      Save
        ↓
Determine changes
        ↓
Update MongoDB
        ↓
Were PostgreSQL-relevant fields changed?
        ↓
     ┌───┴───┐
     │       │
    No      Yes
     │       │
     ↓       ↓
   Done   Update PostgreSQL
```

The Investigation remains persisted in MongoDB as the complete source of truth.

If changes affect information represented in PostgreSQL, the corresponding PostgreSQL representation is also updated.

If the changes do not affect PostgreSQL-relevant information, PostgreSQL does not require an update.

---

# 7. Change Detection

The system will need to determine whether changes made during an existing Investigation require a PostgreSQL update.

The exact mechanism is intentionally not defined at this stage.

Possible implementation approaches may include comparing the previous and current state or tracking changes during editing.

The implementation must consider the potential size of an Investigation document.

Downloading the complete server-side MongoDB document solely to compare every field may introduce unnecessary:

* Network traffic
* Server processing
* Database load
* Latency

Therefore, the mechanism used to determine relevant changes will be decided during backend implementation.

This document establishes only the requirement:

> If a PostgreSQL-relevant Investigation value changes, the PostgreSQL representation must also be updated.

---

# 8. PostgreSQL Update Scope

Only information already defined as relevant to the PostgreSQL Investigation representation requires PostgreSQL updates.

The PostgreSQL fields have already been defined by the Investigation PostgreSQL ↔ MongoDB Boundary documentation.

This document does not redefine those fields.

If additional PostgreSQL information is identified during implementation, the existing design documentation should be amended rather than silently expanding the boundary.

---

# 9. MongoDB Failure During Creation

If MongoDB fails to create the Investigation during the initial Save:

```text id="o7twc0"
User
 ↓
Save
 ↓
MongoDB
 ↓
Failure
```

The PostgreSQL Investigation record is not created.

The user is informed that the Investigation could not be saved.

Because PostgreSQL creation depends on successful MongoDB creation, a PostgreSQL record should not exist for an Investigation that was never successfully persisted to MongoDB.

This also provides a clear diagnostic direction:

> If a new Investigation does not have its PostgreSQL record, the MongoDB creation process must be considered first.

The exact error reporting and retry behaviour will be defined during implementation.

---

# 10. MongoDB Success / PostgreSQL Failure

The more significant failure scenario is:

```text id="p1n0hh"
MongoDB
   ↓
Success
   ↓
PostgreSQL
   ↓
Failure
```

In this situation, the complete Investigation exists in MongoDB but the wider METIS PostgreSQL representation does not.

This represents an incomplete persistence operation.

The system must therefore provide a mechanism for identifying and recovering from this state.

Potential approaches include:

### MongoDB persistence state

The Investigation could contain information indicating whether its PostgreSQL representation has been successfully persisted.

### Separate persistence/failure record

A separate operational record could identify:

* Investigation Reference
* Failure type
* Time of failure
* Processing state
* Relevant diagnostic information

This could allow the system to alert the team responsible for METIS and provide a mechanism for correction or retry.

The final approach is intentionally deferred to implementation.

---

# 11. User Notification

The user should be made aware when an Investigation Save does not complete successfully.

This is particularly important when:

```text id="y5o6ca"
MongoDB = Success
PostgreSQL = Failure
```

because the Investigation exists but its wider METIS representation has not been completed.

The user-facing behaviour should clearly communicate that the Save encountered an issue.

The exact wording and UI behaviour are implementation concerns.

---

# 12. PostgreSQL Success Before MongoDB

The architecture does not permit PostgreSQL Investigation creation to occur before MongoDB creation during initial Investigation persistence.

The Investigation Reference and PostgreSQL creation depend upon successful MongoDB persistence.

Therefore, the following state should not occur as part of the normal creation process:

```text id="xj4x7y"
PostgreSQL = Success
MongoDB = Not Created
```

The dependency is:

```text id="z6td0u"
MongoDB Creation
      ↓
PostgreSQL Creation
```

This reduces the possible failure states during initial creation.

---

# 13. Existing Investigation Update Failure

For an existing Investigation, MongoDB remains the primary persistence operation.

If a Save modifies Investigation-owned information, that information must be successfully persisted to MongoDB.

Where the changes also affect PostgreSQL-relevant information, the PostgreSQL representation must subsequently be updated.

If PostgreSQL fails after the MongoDB update, the same incomplete persistence condition exists:

```text id="2b5r3r"
MongoDB
└── Updated

PostgreSQL
└── Previous state
```

This situation must be identifiable and recoverable.

The exact retry/recovery mechanism remains an implementation decision.

---

# 14. Preventing Uncontrolled Data Drift

Complete prevention of database divergence cannot be guaranteed purely through the database boundary.

The primary mechanism for maintaining consistency is therefore the defined persistence workflow:

```text id="42p7q4"
Investigation change
        ↓
MongoDB update
        ↓
Determine PostgreSQL impact
        ↓
PostgreSQL update where required
```

If the PostgreSQL operation fails, the failure must be detectable rather than silently ignored.

This allows the system to identify Investigations requiring correction.

---

# 15. Reconciliation

A future reconciliation mechanism may be used to identify cases where MongoDB and PostgreSQL representations have become inconsistent.

A reconciliation process could compare a limited set of PostgreSQL-relevant information, rather than comparing every field within every Investigation.

Potential candidates include:

* Investigation Reference
* Status
* Current OIC
* Classification
* Other PostgreSQL projection fields

The exact reconciliation frequency and scope are intentionally deferred.

Potential approaches include:

* Startup checks
* Scheduled checks
* Recent Investigation checks
* Targeted checks after persistence failures
* Dedicated operational reconciliation

There is currently no requirement to continuously compare every Investigation field.

A future implementation should balance consistency checking against:

* Database load
* Server processing
* Network traffic
* Investigation document size
* Application latency

---

# 16. Existing Investigation Editing

When an existing Investigation is edited:

1. The user changes the Investigation's working state.
2. The user selects Save.
3. The changes are persisted to MongoDB.
4. The system determines whether PostgreSQL-relevant information changed.
5. PostgreSQL is updated where required.
6. The Save operation is considered complete once the required persistence operations have succeeded.

The exact change-detection mechanism is an implementation concern.

---

# 17. Data Enrichment

Data enrichment does not operate as unrestricted synchronisation.

When a wider METIS record is linked, information from that record may be considered for populating empty Investigation fields.

Existing Investigation information is not overwritten by enrichment.

For example:

```text id="9l8w6r"
Investigation
Occupation: Police Officer

Wider METIS record
Occupation: Teacher
```

The existing Investigation value remains unchanged.

If the Investigation field is empty:

```text id="qj2h9x"
Investigation
Occupation: [empty]

Wider METIS record
Occupation: Teacher
```

the system may offer the value for enrichment.

For information where multiple values may be appropriate, such as email addresses, additional information may be appended rather than replacing existing information.

---

# 18. User Confirmation of Enrichment

Potential enrichment must be presented to the user before it is applied.

When linking a wider METIS record, the system may display a confirmation modal containing the information that could be added.

The user can select which information should be added.

Conceptually:

```text id="2l6i4r"
Link wider record
       ↓
Identify possible enrichment
       ↓
Display proposed changes
       ↓
User selects permitted additions
       ↓
Apply selected additions
       ↓
Save Investigation
```

This ensures that the system does not silently introduce information into an Investigation that the investigator does not want included.

This is particularly important where information may have security, sensitivity, or operational implications.

---

# 19. Enrichment Rules

The following principles apply:

1. Existing Investigation values are not overwritten by enrichment.
2. Empty fields may be eligible for enrichment.
3. Some fields may permit multiple values to be appended.
4. The user must be informed of proposed enrichment.
5. The user controls which proposed information is added.
6. Once accepted, enriched information becomes Investigation-owned data.
7. The Investigation does not dynamically synchronise with the wider METIS record.

The exact list of enrichable fields and their individual behaviours will be defined separately.

---

# 20. Consistency Model

The resulting consistency model is:

```text id="6v0x2a"
                 Investigation
                      │
                      ↓
                  MongoDB
               Source of Truth
                      │
          ┌───────────┴───────────┐
          │                       │
       Success                  Failure
          │                       │
          ↓                       ↓
 Extract relevant             Notify user /
 PostgreSQL data              handle failure
          │
          ↓
      PostgreSQL
   Wider METIS representation
          │
      ┌───┴───┐
      │       │
   Success   Failure
      │       │
      ↓       ↓
    Done    Detect + recover
```

The architecture therefore favours:

* MongoDB-first persistence
* Explicit PostgreSQL projection
* Detectable failure
* Controlled recovery
* No silent divergence
* Investigation-owned historical state

---

# 21. Deferred Decisions

The following decisions remain intentionally open:

* Exact Investigation Reference generation mechanism
* Exact MongoDB change-detection mechanism
* Whether persistence state is stored within MongoDB
* Whether a separate persistence/failure table or collection is required
* Retry behaviour
* Automatic recovery behaviour
* Reconciliation implementation
* Reconciliation frequency
* Reconciliation age/window
* Exact user-facing failure messages
* Transaction/session implementation
* Concurrency handling
* Optimistic/pessimistic update strategy
* Exact enrichment field rules

These will be decided during backend implementation where the actual requirements and performance characteristics are known.

---

# 22. Summary

Investigation persistence follows a MongoDB-first model.

For a new Investigation:

```text id="c0i2v9"
Create Investigation Reference
        ↓
Create MongoDB Investigation
        ↓
Extract PostgreSQL-relevant information
        ↓
Create PostgreSQL representation
```

For an existing Investigation:

```text id="k2g1rb"
Edit Investigation
        ↓
Save
        ↓
Update MongoDB
        ↓
Update PostgreSQL if required
```

MongoDB remains the source of truth for the complete Investigation.

PostgreSQL remains the wider METIS representation used for metadata, searching, organisation, and relationships.

If PostgreSQL persistence fails after MongoDB succeeds, the failure must be identifiable and recoverable.

The exact mechanisms for detecting, recording, retrying, and reconciling such failures remain implementation decisions.
