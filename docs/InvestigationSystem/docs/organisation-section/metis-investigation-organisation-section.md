# METIS Investigation Organisation Section

## 1. Purpose

The Investigation system contains a dedicated **Organisation** section for managing organisations associated with an Investigation.

An Organisation represents a business, company, service, institution, or other organisational entity that is relevant to the Investigation.

The Organisation section is intended to provide investigators with the information required to identify the organisation, understand its relevance to the Investigation, and communicate with an appropriate contact within the organisation.

The purpose of this research is to define:

* What an Organisation represents within an Investigation.
* The information recorded against an Organisation.
* The role an Organisation has within an Investigation.
* The Organisation Workspace.
* The relationship between Organisations and other Investigation entities.
* How Organisations are added.
* The information investigators can edit.
* The actions available for Organisations.
* Potential future Organisation requirements.

The underlying Organisation storage, API and implementation architecture are outside the scope of this research.

---

## 2. Organisation Definition

Within METIS, an **Organisation represents an organisational entity associated with an Investigation**.

An Organisation may represent entities such as:

* A business.
* A company.
* A service provider.
* An institution.
* Another organisation relevant to the Investigation.

The Organisation is associated with the Investigation because the organisation has a relevant role or connection to the investigation.

For the current Investigation design, Organisations are treated as related Investigation entities rather than Investigation dynamic sections.

---

## 3. Organisation Investigation Role

An Organisation must have a defined role within the Investigation.

The initial Organisation roles are:

* **Victim**
* **Suspect**

The Organisation role is selected when the Organisation is added to the Investigation.

Conceptually:

```text
Investigation

    │

    ▼

Add Organisation

    │

    ▼

Organisation Role

    ├── Victim
    │
    └── Suspect

            │

            ▼

       Create Organisation
```

The Organisation role provides the initial investigative context for the Organisation.

Additional Organisation roles may be introduced in the future if operational requirements establish a need for them.

The current implementation should therefore not assume that Victim and Suspect are permanently the only possible Organisation roles.

---

## 4. Adding an Organisation

An Organisation is added to an Investigation through an Organisation modal.

The modal allows the investigator to select the Organisation's Investigation role before creating the Organisation.

Conceptually:

```text
Add Organisation

    Organisation Role

    [ Victim ▼ ]

    [ Create Organisation ]
```

The Organisation's detailed information is then entered within the Organisation Workspace.

The current research does not establish whether Organisations will eventually be created as new records only or whether existing Organisation records can be selected.

Avoiding duplicate Organisation records is recognised as a future requirement.

---

## 5. Organisation Workspace

The Organisation Workspace follows the same fundamental UI pattern established for the Person and Vehicle Workspaces.

Selecting an Organisation changes the primary Investigation working area to the Organisation Workspace.

The Workspace consists of:

```text
Organisation Workspace

    │
    ├── Organisation Navigation
    │
    └── Dynamic Working Area
            │
            └── Selected Organisation Section
```

The Organisation navigation allows the investigator to move between the available Organisation sections.

The initial Organisation Workspace will contain an **Overview** section.

Additional sections may be introduced if future Organisation requirements justify them.

The Organisation Workspace therefore follows the established Person and Vehicle Workspace pattern without requiring the Organisation domain to duplicate their specific sections.

---

## 6. Organisation Overview

The Organisation Overview provides the primary information about the Organisation.

The initial Overview will contain:

### Organisation Information

* Organisation / Business Name.
* Organisation Type.

### Primary Contact

The Organisation will contain information about a person who can be contacted in relation to the Organisation.

The contact information will include:

* First Name.
* Surname.
* Relationship to Organisation.
* Contact details.

The relationship to the Organisation describes the person's position or connection to the Organisation.

Examples may include:

* Employee.
* Store Manager.
* Director.
* Owner.
* Representative.
* Other relevant relationship.

The exact list of relationships may be expanded as required.

---

## 7. Organisation Contact Details

An Organisation may have one or more communication methods associated with its primary contact.

Each communication method will contain:

| Information            | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| **Communication Type** | Identifies the type of contact information. |
| **Contact Detail**     | Stores the actual contact information.      |

Communication Type will be selected from a dropdown.

Potential communication types include:

* Phone.
* Email.
* Other applicable communication methods.

Conceptually:

```text
Communication

    ├── Type
    │     └── Phone
    │
    └── Contact Detail
          └── 01234 567890
```

Multiple communication methods may be recorded where required.

The exact communication types will be established during implementation.

---

## 8. Organisation Contact Classification

The Organisation will contain a Contact classification associated with its Investigation role.

The initial classification will be automatically populated based on the Organisation role.

For example:

```text
Organisation Role: Victim

Contact:
Business Victim
```

or:

```text
Organisation Role: Suspect

Contact:
Business Suspect
```

This provides an immediate indication of the Organisation's investigative context.

The exact wording and behaviour of the automatically populated Contact classification may be refined during implementation.

The requirement established by this research is that the Organisation's Investigation role should provide the initial contextual classification for the Organisation contact.

---

## 9. Organisation and People

Organisations may have relationships with People within an Investigation.

For example:

```text
Organisation

    │
    └── Person
          │
          ├── Employee
          ├── Manager
          ├── Director
          ├── Owner
          └── Representative
```

The primary Organisation contact is therefore a Person associated with the Organisation.

The relationship between the Person and Organisation should identify the nature of the person's connection to the Organisation.

The exact underlying relationship model is outside the scope of this research.

Future requirements may also allow multiple People to be associated with an Organisation rather than limiting the Organisation to a single contact.

---

## 10. Organisation and Locations

An Organisation may be associated with one or more Locations.

For example:

```text
Organisation

    │
    ├── Main Location
    │
    ├── Branch
    │
    └── Other Relevant Location
```

An Organisation may therefore be relevant to a Location within an Investigation.

Where an Organisation is associated with a Location, the existing METIS Location domain should be used.

The Organisation research does not redesign the Location domain.

The exact rules governing multiple Organisation locations will be established if the requirement becomes necessary.

---

## 11. Organisation and Vehicles

An Organisation may have a relationship with a Vehicle where relevant to an Investigation.

For example:

```text
Organisation
      │
      └── Vehicle
```

Potential relationships could include ownership, operation, use, or another relevant connection.

The existing Vehicle domain remains responsible for Vehicle information.

The Organisation domain only needs to represent the relevant relationship between the Organisation and Vehicle.

The exact relationship types will be established if required by future Investigation workflows.

---

## 12. Organisation and Documents

Organisations may be associated with Documents within an Investigation.

Examples include:

* Documents supplied by the Organisation.
* Business records.
* Correspondence.
* Reports.
* CCTV supplied by the Organisation.
* Other Organisation-related investigative material.

Documents remain managed through the central **Document Management** section.

The Organisation Workspace should therefore provide access to relevant Organisation-related Documents where required, without creating a separate Document repository.

Conceptually:

```text
Organisation

    │
    └── Document

            │
            └── Document Management
```

Document Management remains responsible for the Document itself.

The Organisation domain is responsible only for the relationship between the Organisation and the Document.

---

## 13. Organisation Actions

Investigators will require the ability to manage the Organisation within the Investigation.

Initial Organisation actions include:

* View Organisation.
* Edit Organisation information.
* Edit Organisation contact information.
* Add communication method.
* Remove communication method.
* Add or modify relevant relationships.
* Access associated Documents.
* Access associated Investigation information.

The exact available actions may be expanded as the Organisation domain develops.

---

## 14. Organisation Editing

Organisation information entered by investigators should be editable where it represents current Organisation information.

Potential editable information includes:

* Organisation / Business Name.
* Organisation Type.
* Contact First Name.
* Contact Surname.
* Contact relationship.
* Communication type.
* Contact details.
* Other Organisation information introduced in future.

The Organisation's Investigation role may require additional rules if changing a role after creation becomes necessary.

The exact edit behaviour will be determined during implementation.

---

## 15. Organisation History and Activity

Organisation activity may require auditing where significant changes occur.

Potential Organisation activity includes:

* Organisation created.
* Organisation role established.
* Organisation information changed.
* Contact information changed.
* Person relationship added or removed.
* Organisation relationship changed.
* Document associated with Organisation.

The current research does not establish a requirement for a dedicated Organisation-specific History section.

Where existing Investigation or system audit mechanisms can provide the required history, a separate Organisation History section may not be necessary.

A dedicated Organisation activity system should therefore only be introduced if future operational requirements establish a need.

---

## 16. Organisation Types

Organisations will contain an **Organisation Type**.

The Organisation Type provides additional information about the nature of the Organisation.

Potential examples include:

* Business.
* Company.
* Charity.
* School.
* Hospital.
* Government organisation.
* Police organisation.
* Financial institution.
* Other.

These examples are not intended to establish the final Organisation Type list.

The Organisation Type should provide meaningful classification without unnecessarily creating different Organisation models for each type.

At the current stage, different Organisation types do not require separate Organisation Workspaces.

If a specific Organisation type later requires substantially different information or workflows, this can be researched separately.

---

## 17. Existing Organisations

METIS may eventually contain Organisation records that already exist outside the current Investigation.

A future Organisation workflow may therefore allow investigators to:

* Search for an existing Organisation.
* Associate an existing Organisation with an Investigation.
* Create a new Organisation.
* Avoid creating duplicate Organisation records.

The requirement to support existing Organisations is recognised but the underlying Organisation storage and association architecture is outside the scope of this research.

---

## 18. External Organisation Information

External or authoritative Organisation information may eventually be useful to METIS.

Potential sources could include:

* Companies House.
* Charity registers.
* Government organisation directories.
* Other authoritative Organisation datasets.

External sources may eventually assist investigators with identifying or verifying Organisation information.

No external integrations are established by this research.

Any external Organisation integration should be researched separately before implementation.

---

## 19. Organisation Security

METIS currently does not provide a dedicated Investigation access-restriction system.

The Organisation research therefore does not assume that Organisations have independent access permissions.

Organisation information will form part of the Investigation and will therefore initially be considered within the wider Investigation security boundary.

If Organisation-specific security requirements are identified in the future, they should be treated as a separate architectural requirement.

---

## 20. Organisation Lifecycle

The initial Organisation lifecycle is:

```text
Add Organisation

        │
        ▼

Select Investigation Role

        │
        ├── Victim
        └── Suspect

        │
        ▼

Create Organisation

        │
        ▼

Organisation Workspace

        │
        ▼

Organisation Overview

        │
        ├── Organisation Information
        │
        ├── Primary Contact
        │
        ├── Communication Details
        │
        └── Related Information
```

The Organisation can then be updated throughout the Investigation as additional information becomes available.

---

## 21. Neutral / Future Considerations

* Additional Organisation Investigation roles may be introduced.
* Existing Organisation records may eventually be searchable and reusable.
* Multiple Organisation contacts may eventually be supported.
* Additional Organisation contact relationships may be introduced.
* Additional communication methods may be supported.
* Organisations may eventually support multiple Locations.
* Organisations may eventually have richer relationships with People.
* Organisations may eventually have richer relationships with Vehicles.
* Additional Organisation-specific sections may be introduced.
* Organisation-specific activity/history may be introduced if required.
* Organisation Type classifications may be expanded.
* External Organisation reference data may eventually be integrated.
* Duplicate Organisation detection may eventually be required.
* Organisation information may eventually be populated or verified using authoritative external sources.
* Organisation-specific access restrictions may be considered if future security requirements establish a need.
* Amendments identified during implementation will be documented separately from this initial Organisation Section research.

---

# Related Documents

* [ADR-011-Investigation-System-UI](ADR-011-Investigation-System-UI.md)

# Related Research

* Investigation Person Section Research.
* Investigation Vehicle Section Research.
* Investigation Document Management Section Research.
