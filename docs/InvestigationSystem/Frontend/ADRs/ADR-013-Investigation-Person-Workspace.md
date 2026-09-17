# ADR-013: Investigation Person Workspace

## Status
Accepted 

---

# Context

The Investigation system requires a dedicated Person section where investigators can create and view people associated with an Investigation.

The Person section must support multiple person types, such as:

- Victim
- Suspect
- Witness
- Other person types that may be introduced in the future

Different person types may require different information and functionality. Therefore, the Person section cannot be treated as a single static view containing the same functionality for every person type.

When an investigator adds a person, they must first select the person's type. The selected type determines the Person Overview Component that is loaded into the Investigation workspace.

The Person Overview Component must provide a consistent workspace structure while allowing the available sections and functionality to differ between person types.

---

# Decision

The Investigation Person section will use a Person Overview Component as the primary workspace for an individual person.

The Person Overview Component will consist of two areas:

1. Person Navigation
2. Dynamic Working Area

The Person Navigation will be displayed at the top of the **Person Overview Component** and will contain the sections available for the selected person type.

The Dynamic Working Area will be displayed below the navigation and will load the component corresponding to the currently selected navigation section.

## Person creation

When the investigator selects Add Person (or the + action), a modal will be displayed allowing the investigator to select the type of person being added.

For the initial implementation, example types include:

- Victim
- Suspect
- Witness

The selected type determines which Person Overview Component is loaded.

Conceptually:

```text
Investigation
      │
      ▼
People
      │
      ▼
Add Person
      │
      ▼
Person Type Selection
      │
      ▼
Victim / Suspect / Witness / ...
      │
      ▼
Person Overview Component
      │
      ▼
Person Navigation
      │
      ▼
Dynamic Working Area
```

## Person selection

When an investigator selects a person already displayed within the Investigation's People section, the corresponding Person Overview Component will be loaded into the dynamic Investigation workspace.

The Person Overview will therefore always provide the following structure:

```text
Person Overview
      │
      ├── Person Navigation
      │
      └── Dynamic Working Area
            │
            └── Component determined by selected navigation section

```

## Person-type-specific functionality

All person types will follow the same fundamental Person Overview structure.

However, the sections available within the Person Navigation may differ between person types.

For example, a Victim may have sections that are not applicable to a Suspect, while a Suspect may have sections that are not applicable to a Witness.

The exact navigation sections and their functionality will be established through further research.

The implementation mechanism used to provide different navigation structures is intentionally not defined by this ADR.

---

# Consequences

## Positive

- Provides a consistent workspace structure for all Investigation person types.
- Allows person types to have functionality specific to their role within the Investigation.
- Provides a clear separation between navigation and the dynamic working area.
- Allows additional person types to be introduced without changing the fundamental Person Overview structure.
- Allows additional person-specific sections to be introduced as the Investigation system develops.

---

## Negative

- Different person types may require different navigation structures and therefore increase frontend complexity.
- Additional person types may require additional research and functionality.
- The exact navigation structure cannot be finalised until the requirements for each person type have been researched.

---

## Neutral / Future Considerations

Optional section.

Use for:
- future improvements
- unresolved concerns
- things that may change later
- planned optimisations

---

# Related Documents

- [ADR-011-Investigation-System-UI](ADR-011-Investigation-System-UI.md)


