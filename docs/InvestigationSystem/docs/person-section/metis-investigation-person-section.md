# METIS Investigation Person Section

## 1. Purpose

The Investigation system contains a dedicated Person section for recording and managing people associated with an investigation.

The Person section supports different person types. The initial person types considered by this research are:

* Victim
* Suspect
* Witness

Different person types may require different information and functionality. However, there is also information and functionality that is relevant to all people associated with an investigation.

The purpose of this research is to define the structure of the Person section, including:

* The sections that should exist for all person types.
* The sections that are specific to individual person types.
* The information and functionality that should be provided within each section.
* Any areas that require further research before a final decision can be made.

The Person section should therefore provide a common structure while allowing person-type-specific functionality to be introduced where required.

---

## 2. Person Types

A person associated with an investigation will have a defined person type.

The initial person types considered by this research are:

* Victim
* Suspect
* Witness

The selected person type determines which Person Overview Component is displayed and which person-type-specific sections are available.

Additional person types may be introduced in the future.

The initial person type selection process is:

```text
People

    │

    ▼

Add Person

    │

    ▼

Select Person Type

    │

    ├── Victim
    │
    ├── Suspect
    │
    └── Witness

            │

            ▼

    Person Overview Component
```

The exact list of person types is not considered final and may be expanded as further requirements are identified.

---

## 3. Person Overview

Each person associated with an investigation will be displayed through a Person Overview Component.

The Person Overview provides the navigation and working area used to manage information relating to that person.

The Person Overview will consist of:

* Person Navigation
* Dynamic Working Area

The Person Navigation will be displayed at the top of the Person Overview.

The Dynamic Working Area will display the component associated with the section selected within the Person Navigation.

```text
Person Overview

    │

    ├── Person Navigation
    │
    └── Dynamic Working Area
            │
            └── Selected Section Component
```

The exact implementation used to provide different navigation structures for different person types is outside the scope of this research.

---

## 4. Common Person Sections

All person types should provide a common set of sections within their Person Overview.

These sections provide the core functionality required when managing any person associated with an investigation.

The current common sections are:

| Section                                | Purpose                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Personal / Identifying Information** | Establish exactly who the person is and provide their identifying and contact information.                          |
| **Statements / Accounts**              | Record and manage statements, interviews, accounts, and narratives provided by the person.                          |
| **Evidence**                           | Record evidence, exhibits, documents, digital material, or other investigative material associated with the person. |
| **Background / History**               | Record relevant historical information about the person within the context of the investigation.                    |
| **Notes**                              | Provide investigators with a place for relevant investigative notes that do not belong elsewhere.                   |
| **Activity / History**                 | Provide an auditable record of activity relating to the person within the investigation.                            |

These sections form the default Person Overview structure and should be available regardless of whether the person is a Victim, Suspect, Witness, or another person type introduced in the future.

The exact information and functionality contained within each common section will be established through further research.

---

## 5. Personal / Identifying Information

The Personal / Identifying Information section establishes exactly who the person is and provides information that can be used to identify and contact them.

The section should support information including:

* Full legal name
* Known aliases / previous names
* Date of birth
* Age
* Sex
* Gender / pronouns where applicable
* Nationality
* Physical description
* Residential address
* Previous / known addresses
* Telephone numbers
* Email addresses
* Employment / occupation
* Employer
* PNC ID
* Passport number
* Driving licence number
* Other relevant identification numbers
* Other identifying information

Information within this section may be populated automatically where appropriate, while investigators should be able to provide or update information where permitted.

The exact rules governing automatic population, external data sources, validation and editing will be established separately.

---

## 6. Person-Type-Specific Sections

In addition to the common Person sections, individual person types may require additional sections containing functionality that is specific to their role within an investigation.

Person-type-specific sections should only be introduced where the requirements of that person type justify additional functionality.

The current person-type-specific sections identified by this research are:

### 6.1 Victim

The Victim currently requires an additional:

**Victim Contact** section.

The section is intended to manage information relating to the investigation's ongoing contact with and support of the victim.

Potential areas include:

* Victim type
* Vulnerability
* Contact requirements
* Contact frequency
* Preferred contact method
* Contact history
* Support requirements
* Safeguarding / special considerations

The exact requirements of the Victim Contact section require further research.

---

### 6.2 Suspect

The Suspect currently requires an additional:

**Relationship to Victim(s)** section.

The section is intended to record the relationship between the suspect and the victim or victims associated with the investigation.

Potential information includes:

* Relationship type
* Nature of the relationship
* The victim or victims the relationship applies to
* Previous relationship
* Current relationship
* Relevant relationship history

The exact requirements of the Relationship to Victim(s) section require further research.

---

### 6.3 Witness

No additional Witness-specific section has currently been identified.

The common Person sections provide the initial structure for the Witness Person Overview.

Further research may identify functionality that warrants a dedicated Witness-specific section.

---

## 7. Common and Person-Type-Specific Structure

The Person Overview should therefore consist of a combination of common and person-type-specific sections.

Conceptually:

```text
Person Overview

    │
    ├── Common Sections
    │   ├── Personal / Identifying Information
    │   ├── Statements / Accounts
    │   ├── Evidence
    │   ├── Background / History
    │   ├── Notes
    │   └── Activity / History
    │
    └── Person-Type-Specific Sections
        │
        ├── Victim
        │   └── Victim Contact
        │
        ├── Suspect
        │   └── Relationship to Victim(s)
        │
        └── Witness
            └── None currently identified
```

The exact navigation presented to an investigator will depend on the person type and the sections applicable to that person.

---

## 8. Section Requirements

Each Person section should be researched independently to establish:

* The information that must be recorded.
* The information that may be recorded.
* The actions available to investigators.
* The information that can be edited.
* The information that should be read-only.
* Any validation requirements.
* Any relationships with other Investigation information.
* Any additional functionality required by the section.

Common sections and person-type-specific sections should be kept conceptually separate so that functionality specific to one person type does not unnecessarily become part of every Person Overview.

---

## 9. Person Section Extensibility

The Person section should support the introduction of additional person types and additional sections in the future.

Adding a new person type should not require the common Person Overview structure to be redesigned.

Similarly, additional sections may be introduced where a person type has requirements that are not adequately represented by the existing common sections.

The exact technical approach used to provide this extensibility will be determined during implementation and architectural design.

---

## 10. Open Questions

The following areas require further research:

* The exact requirements of each common section.
* The exact requirements of the Victim Contact section.
* The exact requirements of the Relationship to Victim(s) section.
* Whether additional Victim-specific sections are required.
* Whether additional Suspect-specific sections are required.
* Whether additional Witness-specific sections are required.
* Whether any additional common sections are required.
* Which information should be editable or read-only.
* Any validation requirements for person information.
* Any additional person types that should be supported.

---

## 11. Neutral / Future Considerations

* Additional person types may be introduced as the Investigation system develops.
* Person-type-specific sections may be expanded as further investigative requirements are identified.
* Common sections may be revised if future research identifies additional functionality that applies to all person types.
* The structure of individual sections may evolve as operational requirements become clearer.
* Future integrations may provide additional person information and reduce the amount of information that investigators need to enter manually.
* The technical implementation of dynamic Person Overview sections may be reviewed as the number of person types and sections increases.

---

# Related Documents

* **ADR-011: Investigation System UI** — Defines the overall Investigation workspace and core Investigation information.
* **ADR-012: Investigation System Dynamic UI** — Defines the Investigation dynamic area and its permanent sections.
* **ADR-013: Investigation Person Workspace** — Defines the structural behaviour of the Person Overview, Person Navigation and Dynamic Working Area.
