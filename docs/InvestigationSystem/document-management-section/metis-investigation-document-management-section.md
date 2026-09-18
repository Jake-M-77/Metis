# METIS Investigation Document Management Section

## 1. Purpose

The Investigation system contains a dedicated **Document Management** section for managing every file associated with an investigation.

A Document represents any file or media associated with an Investigation, regardless of its file format or investigative purpose.

Examples include:

* PDF documents.
* DOC / DOCX documents.
* Spreadsheets.
* Photographs and other images.
* CCTV footage.
* Audio recordings.
* Video recordings.
* Witness statements.
* Reports.
* Correspondence.
* Forms.
* Other investigative material.

The Document Management section acts as the central location from which all investigation Documents can be accessed and managed.

Documents may be added either directly through Document Management or through another Investigation section where the Document is being created in a specific investigative context.

For example:

```text
Evidence Section
    │
    ▼
Add CCTV Evidence
    │
    ▼
Document Created
    │
    └──────────────► Document Management
```

Alternatively:

```text
Document Management
    │
    ▼
Add Document
    │
    ▼
Associate with Victim
    │
    ├──────────────► Document Management
    │
    └──────────────► Victim-related Investigation Section
```

The purpose of this research is to define:

* What a Document represents within an Investigation.
* The information recorded against a Document.
* The categories used to organise Documents.
* The file and media types supported by METIS.
* The relationships between Documents and Investigation entities.
* How Documents are added.
* How Documents are viewed.
* The actions available for Documents.
* Document history and auditing.
* How Documents are searched and organised.
* The relationship between Documents and other Investigation sections.
* Potential external document sources and future integrations.

The underlying file-storage architecture is outside the scope of this research.

---

## 2. Document Definition

Within METIS, a **Document is any file or media associated with an Investigation**.

The term Document therefore does not refer exclusively to traditional text documents.

A Document may represent investigative material such as:

```text
Investigation
    │
    └── Document Management
          │
          ├── Witness Statement
          ├── Officer Report
          ├── Photograph
          ├── CCTV
          ├── Audio Recording
          ├── Video Recording
          ├── Correspondence
          ├── Form
          └── Other Investigative Material
```

The Document Management section therefore provides a single centralised view of the files associated with an Investigation.

A Document may or may not represent evidence in a formal evidential sense. However, because Documents represent the files and media associated with an Investigation, investigative material stored within Document Management will commonly be relevant to the investigation or its evidential record.

Document Management and Evidence are therefore not treated as separate file repositories.

---

## 3. Document Management Workspace

Document Management is one of the persistent Investigation sections alongside:

* People.
* Vehicles.
* Organisations.
* Document Management.

Selecting Document Management changes the primary Investigation workspace to the Document Management Workspace.

The Document Management Workspace differs slightly from the Person and Vehicle workspaces.

Rather than presenting Documents primarily as individual entity records, Documents are organised through categories representing their relationship or investigative context.

Conceptually:

```text
Investigation

    │
    └── Document Management Workspace
            │
            ├── Victim
            │
            ├── Suspect
            │
            ├── Other
            │
            ├── Missing Documents
            │
            └── Additional Categories
```

The category-based organisation is intended to allow investigators to quickly identify Documents associated with particular parts of the Investigation.

The Document Management Workspace will use the same underlying category-based organisational concept currently used by Person Associations.

The exact implementation of the category system will be determined separately.

Due to the JavaScript environment version used by METIS, the existing Person Associations tooling may either be adapted for reuse by both systems or a separate Document Management-specific implementation may be created.

This implementation decision is outside the scope of the current domain research.

---

## 4. Document Metadata

Every Document will have associated metadata used to identify, describe and manage the file.

The Document metadata will include:

| Information             | Purpose                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------- |
| **Title / Name**        | Identify the Document.                                                                 |
| **Type**                | Identify the type or classification of the Document.                                   |
| **Description**         | Provide additional information about the Document.                                     |
| **Dates**               | Record relevant dates associated with the Document.                                    |
| **Author / Creator**    | Identify the person or organisation responsible for creating the Document where known. |
| **Added / Uploaded By** | Identify the user who added the Document to METIS.                                     |
| **Source**              | Record where the Document originated.                                                  |
| **Reference Number**    | Record an associated reference number where applicable.                                |
| **Version**             | Identify the current Document version.                                                 |
| **Status**              | Record the current Document status where applicable.                                   |
| **Classification**      | Record the applicable Document classification.                                         |
| **Other Metadata**      | Record additional information required by the specific Document or investigation.      |

Not all metadata will necessarily be entered manually by the investigator.

Where information can be determined by METIS, the system should generate or populate the relevant metadata automatically.

For example:

* Date added.
* User who uploaded the file.
* File information.
* Version information.
* Other system-generated audit information.

The exact metadata generated automatically will be determined during implementation.

---

## 5. Document Types and Classification

Documents will contain information identifying the type of material being stored.

The Document type will be selected when adding a Document.

For example, a Document may represent a:

* Witness statement.
* Report.
* Photograph.
* CCTV recording.
* Audio recording.
* Correspondence.
* Form.
* Other investigative material.

The Document type is separate from the file format.

For example:

```text
Document Type: Witness Statement
File Type: PDF
```

or:

```text
Document Type: CCTV
File Type: MP4
```

The Document will also have a classification.

For example, a witness statement may contain an operational classification or reference such as:

```text
MG11
```

The classification system will therefore provide additional context beyond the underlying file format.

The exact complete list of Document types and classifications will be established as the Investigation system develops.

---

## 6. Supported File and Media Types

METIS will support all file and media types that may be associated with an Investigation.

Potential examples include:

* PDF.
* DOC.
* DOCX.
* XLS.
* XLSX.
* TXT.
* Images.
* Audio.
* Video.
* CCTV.
* Other file formats.

The Document domain is therefore not restricted to a predefined collection of file extensions.

The actual file content will be stored outside of the METIS frontend.

The underlying file-storage mechanism is intentionally outside the scope of this research.

The Document Management domain is concerned with managing the Document and its associated metadata while allowing METIS to access the underlying file.

---

## 7. Document Relationships

A Document can be associated with other entities within the Investigation.

Potential relationships include:

* Investigation.
* Person.
* Vehicle.
* Organisation.
* Location.
* Task.
* Other Investigation entities.

Documents may have relationships with multiple entities where required.

For example:

```text
Investigation
    │
    └── Document
          │
          ├── Victim
          ├── Vehicle
          └── Task
```

A witness statement could therefore be associated with:

```text
Document
    │
    ├── Investigation
    ├── Person: Witness
    └── Task: Obtain Witness Statement
```

The relationship between the Document and the associated entity will also influence the category in which the Document is displayed within Document Management.

---

## 8. Category Organisation

Documents will be organised into categories within the Document Management Workspace.

Categories provide investigators with a contextual view of the Documents associated with the Investigation.

Initial categories include:

* Victim.
* Suspect.
* Other.
* Missing Documents.

Additional categories may be introduced where required by the Investigation domain.

Categories are primarily intended to represent the context or relationship of the Document rather than simply its file format.

For example:

```text
Victim
    │
    ├── Witness Statement
    ├── Photograph
    └── Correspondence

Suspect
    │
    ├── CCTV
    ├── Photograph
    └── Report

Other
    │
    └── General Investigation Document
```

The category system should therefore work alongside Document types and metadata rather than replacing them.

---

## 9. Missing Documents

Document Management will contain a **Missing Documents** category.

Unlike normal Document categories, Missing Documents represents Documents or investigative material that are expected or required but have not yet been supplied.

The Missing Documents category may be populated based on the requirements of the Investigation.

For example, an Investigation involving a theft from a shop may identify CCTV as required investigative material.

The Document Management Workspace may display:

```text
Missing Documents

    └── CCTV
```

The investigator can select the CCTV requirement directly from Document Management.

This opens the same Document addition workflow used elsewhere in METIS.

Once the required file has been supplied:

```text
Missing CCTV
    │
    ▼
Add Document
    │
    ▼
Upload CCTV
    │
    ├── Missing requirement removed
    │
    ├── Document created
    │
    ├── Document moved to appropriate category
    │
    └── Related task completed
```

Where a Missing Document is associated with an existing task, satisfying the Document requirement can automatically mark the associated task as completed.

The exact rules determining which Missing Documents are created will be established by the relevant Investigation workflows.

---

## 10. Adding Documents

Documents can be added to an Investigation through two primary routes.

### 10.1 Adding Through Document Management

An investigator can select an Add Document action within Document Management.

A Document modal will then be displayed.

The modal will allow the investigator to provide information including:

* Title.
* Description.
* Document type.
* Classification.
* Relationship / association.
* File.

Conceptually:

```text
Document Management
    │
    ▼
Add Document
    │
    ▼
Document Modal
    │
    ├── Title
    ├── Description
    ├── Type
    ├── Classification
    ├── Relationship
    └── File
            │
            ▼
       Add Document
```

The investigator can associate the Document with relevant Investigation entities.

For example:

```text
Relationship:

    Victim
    Suspect
    Witness
    Vehicle
    Organisation
    Other
```

The available relationship options will depend on the entities present within the Investigation.

### 10.2 Adding Through Another Investigation Section

Documents can also be added through another Investigation section.

For example:

```text
Victim
    │
    ▼
Statement
    │
    ▼
Add Statement
    │
    ▼
Document Created
    │
    └──────────────► Document Management
```

or:

```text
Evidence
    │
    ▼
Add CCTV
    │
    ▼
Document Created
    │
    └──────────────► Document Management
```

Documents created through contextual Investigation sections will therefore automatically become available within Document Management.

Where a Document is added through Document Management and associated with a specific Investigation entity, the appropriate contextual Investigation section should also become available where required.

---

## 11. Document Viewing

Documents can be viewed from either their contextual Investigation section or from Document Management.

Within Document Management, hovering over a Document will display actions including:

* View.
* Download.

The View action will display the Document within a Document Viewer modal where the file type can be rendered or played by METIS.

Conceptually:

```text
Document
    │
    ▼
Hover
    │
    ├── View
    │
    └── Download
```

Selecting View:

```text
View
    │
    ▼
Document Viewer
    │
    ├── Document Content
    │
    └── Document Actions
```

The Document Viewer should attempt to display or play supported file types directly within METIS.

Where a file type cannot be rendered or played within the viewer, the View action will instead provide an appropriate download/open behaviour.

The exact viewer implementation will be determined during implementation.

---

## 12. Document Viewer Actions

The Document Viewer will provide actions for managing or interacting with the currently displayed Document.

Potential actions include:

* Download.
* Open separately.
* View Document information.
* Access Document history.
* Other applicable Document actions.

The exact actions available will depend on the Document and the capabilities of the underlying file type.

The Document information action will provide access to the Document's metadata and audit information.

---

## 13. Document Actions

Investigators will be able to perform actions against Documents.

The Document Management system will support actions including:

* View.
* Open.
* Download.
* Rename.
* Edit metadata.
* Replace.
* Version.
* Delete.
* Archive.
* Link / unlink.
* Share / export.
* Mark as relevant.
* Mark as reviewed.

The exact behaviour and availability of each action will depend on the Document's state and the relevant Investigation requirements.

Document actions will be recorded through the Document audit system where appropriate.

---

## 14. Document History and Auditing

Document activity will be auditable.

The system will maintain a history of relevant activity associated with the Document.

An information (`i`) action will allow the investigator to access Document information and history.

The information action will be available:

* From the Document Management Workspace.
* From the Document Viewer.

Conceptually:

```text
Document
    │
    ├── View
    │
    ├── Download
    │
    └── Information
            │
            ▼
       Document History
```

Document history may contain information such as:

* Document creation.
* Document upload.
* Metadata changes.
* Document replacement.
* Version changes.
* Relationship changes.
* Other relevant Document activity.

The audit system is intended to provide an accurate record of how a Document has been managed throughout its lifecycle.

The exact audit events recorded will be determined during implementation.

---

## 15. Document Versioning

Documents will support version information.

Where a Document is replaced or updated, the system should retain the relevant version history rather than treating the updated file as an entirely unrelated Document.

Conceptually:

```text
Document
    │
    ├── Version 1
    │
    ├── Version 2
    │
    └── Version 3
```

Version information will form part of the Document history and audit record.

The exact rules governing:

* Document replacement.
* Creation of new versions.
* Access to previous versions.
* Version numbering.

will be established during implementation.

The underlying requirement is that significant changes to a Document remain auditable.

---

## 16. Document Metadata Editing

Document metadata may be editable after the Document has been added.

Potential editable information includes:

* Title.
* Description.
* Document type.
* Classification.
* Relationships.
* Other applicable metadata.

Information generated automatically by METIS, particularly audit information, should not be directly editable by investigators.

Examples include:

* Original upload date.
* User who uploaded the Document.
* Historical audit events.
* Previous version information.

The exact distinction between editable and system-controlled metadata will be established during implementation.

---

## 17. Document Search

The Document Management Workspace will provide a search facility.

The search system is required because some Investigations may contain a large number of Documents.

The Document Management Workspace will therefore provide:

* A search bar.
* A category selection control.

The category selection control will allow the investigator to search:

* All categories.
* A specific category.

Conceptually:

```text
Document Management

[ Search Documents... ]

[ All Categories ▼ ]

    │
    ├── All
    ├── Victim
    ├── Suspect
    ├── Other
    └── Missing Documents
```

Searching within a specific category will allow investigators to narrow results based on the context of the Document.

For example:

```text
Category: Victim

Search: "statement"
```

The exact search fields and filtering functionality will be determined during implementation.

---

## 18. Document Security and Access

Documents will be subject to the security and access controls applied to the Investigation.

The Investigation itself is expected to provide the primary security boundary.

Where Documents contain sensitive or restricted information, access to the Investigation may therefore be restricted rather than applying an independent permission system to individual Documents.

Conceptually:

```text
Investigation Access
        │
        ▼
Document Management
        │
        ├── Document A
        ├── Document B
        └── Document C
```

Document-specific security requirements may still need to be considered where operational requirements establish that an individual Document requires access restrictions beyond those applied to the Investigation.

The detailed permissions architecture is outside the scope of this research.

---

## 19. External Systems and Document Import

METIS may eventually interact with external systems containing investigation-related files or media.

Potential future functionality includes allowing METIS to access external systems and provide investigators with a view of external material through the METIS interface.

A further potential workflow is importing Documents from externally supplied links.

For example:

```text
External CCTV System
        │
        ▼
Shared Link
        │
        ▼
METIS Add Document
        │
        ▼
Import External File
        │
        ▼
Document Management
```

An example could be a member of the public providing a shared link to home CCTV footage.

The investigator could provide the link within the Add Document workflow, allowing METIS to retrieve the relevant material and create a Document within the Investigation.

This could reduce the risk of investigators forgetting to manually download and attach externally supplied material.

External system access and external Document ingestion are future capabilities.

The external integration architecture and storage mechanisms are outside the scope of the current research.

---

## 20. Generated Documents

METIS may eventually support generating Documents directly from information held within an Investigation.

One potential example is generating an Investigation printout for transfer or handover to another police force.

Potential future generated Documents may include:

* Investigation summaries.
* Investigation printouts.
* Reports.
* Other system-generated documentation.

Generated Documents are recognised as a future requirement but are outside the scope of the current Document Management research.

The specific generation workflows and document formats will be researched separately if this functionality is required.

---

## 21. Document Management and Evidence

METIS will not maintain separate file repositories for Documents and Evidence.

Documents represent the files and media associated with an Investigation.

A Document may therefore be investigative material, evidential material, or other material relevant to the Investigation.

Conceptually:

```text
Investigation
    │
    └── Document Management
          │
          ├── Witness Statement
          ├── CCTV
          ├── Photograph
          ├── Officer Report
          ├── Correspondence
          └── Other Material
```

Where a Document represents evidence, it remains a Document within Document Management.

Evidence-related Investigation sections can provide contextual workflows for adding and managing those Documents.

For example:

```text
Evidence
    │
    ▼
Add CCTV
    │
    ▼
Document
    │
    └──────────────► Document Management
```

The distinction is therefore between the **investigative context in which a Document is used** and the **Document itself**.

A separate Evidence file repository is not required.

A future Evidence domain may still exist for managing evidential concepts and workflows beyond the file itself, but that is outside the scope of this Document Management research.

---

## 22. Document Management Lifecycle

The general Document lifecycle is:

```text
Document Requirement / Source
            │
            ▼
       Add Document
            │
            ▼
     Document Metadata
            │
            ▼
       File Added
            │
            ▼
     Document Management
            │
      ┌─────┴─────┐
      │           │
      ▼           ▼
  Relationship   Category
      │           │
      └─────┬─────┘
            │
            ▼
       Document Used
            │
            ▼
     Document Actions
            │
            ▼
      Version / History
            │
            ▼
      Archived / Retained
```

Documents may enter this lifecycle through either Document Management or another Investigation section.

Missing Documents provide an additional lifecycle path:

```text
Missing Document
        │
        ▼
Document Supplied
        │
        ▼
Document Created
        │
        ├── Requirement Removed
        ├── Category Updated
        └── Task Completed
```

The exact lifecycle states and retention rules will be determined through later architectural and operational research.

---

## 23. Document Management and Investigation Sections

Document Management is intended to operate as the central file management area while remaining integrated with the rest of the Investigation.

A Document created through another Investigation section will automatically become available within Document Management.

A Document created within Document Management can be associated with an Investigation entity and may consequently activate or populate the relevant contextual Investigation section.

Conceptually:

```text
             Investigation
                   │
        ┌──────────┴──────────┐
        │                     │
Contextual Sections    Document Management
        │                     │
        │                     │
        └──────────┬──────────┘
                   │
                Document
```

This allows investigators to access the same underlying Document from the context most appropriate to their current task.

---

## 24. Neutral / Future Considerations

* Additional Document categories may be introduced as the Investigation system develops.

* Additional Document types and classifications may be introduced where required.

* Additional file and media formats may be supported as required.

* The Missing Documents system may be expanded to support additional investigation-specific requirements.

* Document requirements may automatically generate tasks within relevant Investigation workflows.

* Additional relationships between Documents and Investigation entities may be introduced.

* More advanced Document search and filtering may be introduced for large Investigations.

* Document-specific access restrictions may be introduced if operational requirements establish a need beyond Investigation-level access control.

* METIS may eventually integrate with external document, evidence or digital-media systems.

* External shared links may eventually allow METIS to automatically import investigation-related files.

* METIS may eventually generate Documents directly from Investigation information.

* Investigation printouts may eventually be generated for transfer or handover to another force.

* Document versioning and retention requirements may be expanded as operational requirements are established.

* Additional audit events may be introduced where required.

* The Document Management category tooling may reuse or be adapted from the existing Person Associations tooling.

* Amendments identified during implementation will be documented separately from this initial Document Management Section research.

---

# Related Documents

* [ADR-011-Investigation-System-UI](ADR-011-Investigation-System-UI.md)
* [ADR-015-Investigation-Documentation-Management-Workspace](../Frontend/ADRs/ADR-015-Investigation-Documentation-Management-Workspace.md)


# Related Research

No additional related Document Management research has currently been identified.
