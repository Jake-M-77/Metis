# ADR-015: Investigation Document Management Workspace

## Status

Accepted

---

# Context

The Investigation requires a central **Document Management** area for managing all files and media associated with an investigation.

A Document represents any file or media associated with an Investigation, including documents, images, CCTV, audio, video, statements, reports, evidence files, and other supported file types.

Documents can be added either directly through Document Management or contextually through other Investigation sections. For example, a statement may be added through a Person/Victim section, while CCTV may be added through an Evidence-related area. Documents added contextually must also become immediately available within Document Management.

Conversely, a document added through Document Management may be associated with an Investigation entity such as a victim, suspect, vehicle, organisation, task, or other relevant entity. These relationships can determine where the document is surfaced within the Investigation.

The Document Management area therefore needs to provide:

* a central repository and access point for Investigation documents
* category-based organisation of documents
* contextual relationships between documents and Investigation entities
* document searching
* document viewing and downloading
* document metadata management
* document history and auditing
* document versioning
* support for missing or expected documents

The Investigation UI also separates persistent Investigation areas from dynamic working areas. Selecting Document Management from the Investigation navigation should change the primary working area to the Document Management Workspace.

The workspace must organise documents into categories such as Victim, Suspect, Other, and Missing Documents.

The current JavaScript environment does not provide the `Object.groupBy()` method required for straightforward category grouping. The implementation therefore needs either to adapt the existing grouping algorithm/tool used by Person Associations or introduce a separate grouping algorithm/tool for Document Management.

The solution must remain consistent with the existing Investigation UI architecture while avoiding unnecessary duplication or complexity.

---

# Decision

The Investigation will implement a dedicated **Document Management Workspace** as the primary working area displayed when Document Management is selected from the persistent Investigation navigation.

The Document Management Workspace will provide a central location for all documents associated with the Investigation.

The workspace will organise documents into investigative categories rather than by file format. Initial categories will include:

* Victim
* Suspect
* Other
* Missing Documents

Documents may be associated with multiple Investigation entities, including:

* People
* Vehicles
* Organisations
* Tasks
* Locations
* Other relevant Investigation entities

Document relationships will determine the contextual category in which a document is displayed.

Documents may enter the system through either of two routes:

1. **Document Management → Add Document**

   * A document is added directly to the central repository.
   * The user can associate the document with relevant Investigation entities.

2. **Contextual Investigation Section → Add Document**

   * A document is added from a relevant contextual section.
   * The document is automatically available within Document Management.
   * The contextual relationship is retained.

The Add Document workflow will support relevant metadata including:

* Title
* Description
* Document Type
* Classification
* File
* Investigation relationship/association

Document Type and Classification will remain distinct from the underlying file format.

The Document Management Workspace will provide document actions including:

* View
* Open separately
* Download
* Rename
* Edit metadata
* Replace
* Version
* Delete
* Archive
* Link
* Unlink
* Share/Export
* Mark as relevant
* Mark as reviewed

Hovering over a document will expose appropriate actions, including viewing and downloading.

Selecting View will open a Document Viewer modal. The viewer will attempt to render or play the relevant file type. Where a file type cannot be rendered within METIS, the system will provide an appropriate fallback such as downloading or opening the file externally.

Document information and history will be accessible through an information/history action. This will be available both from the Document Management Workspace and from the Document Viewer.

Document history will form part of the Investigation auditing system and will record relevant document lifecycle activity, including creation, upload, metadata changes, relationship changes, replacement, versioning, and other significant actions.

Document versioning will retain historical versions rather than treating replacement as the destruction of the previous document state.

The **Missing Documents** category will represent documents that are expected or required but have not yet been supplied.

When a missing document is fulfilled:

* the missing requirement is removed
* the uploaded file becomes a Document
* the Document is placed into its appropriate category
* any associated workflow or task may be completed where appropriate

Document Management will provide a search mechanism allowing users to search across all categories or restrict the search to a selected category.

For document grouping, the implementation will either:

* adapt and reuse the existing grouping algorithm/tool used by Person Associations, where practical; or
* create a dedicated grouping algorithm/tool for Document Management.

The implementation must not depend on `Object.groupBy()` because it is unavailable in the current JavaScript environment.

Document Management will remain the central file repository for Investigation documents. Documents and evidence files will not be maintained as separate file repositories.

External-system integration, importing documents from shared links, and generated Investigation documents will remain future considerations and will not form part of the current workspace architecture decision.

---

# Consequences

## Positive

* Provides a single central location for all Investigation documents and media.
* Allows documents to be accessed both centrally and contextually.
* Keeps contextual document relationships connected to the central repository.
* Provides a consistent category-based workspace for navigating large numbers of documents.
* Supports document lifecycle management, including replacement and versioning.
* Provides document auditing through the existing Investigation auditing approach.
* Allows expected documents to be represented through the Missing Documents category.
* Provides a consistent viewing and downloading experience across supported file types.
* Keeps Document Management aligned with the existing Investigation workspace architecture.
* Allows the existing Person Associations grouping approach to potentially be reused.
* Avoids reliance on unavailable JavaScript functionality.
* Prevents duplication between Document Management and contextual Investigation sections.

---

## Negative

* Category-based document organisation introduces additional frontend grouping logic.
* Reusing or adapting the Person Associations grouping algorithm may require changes to ensure it supports Document Management requirements.
* A separate grouping algorithm may increase maintenance overhead if the Person Associations and Document Management implementations diverge.
* Supporting many different document and media types may increase complexity within the Document Viewer.
* Document versioning and auditing introduce additional data and lifecycle management requirements.
* Large investigations may contain significant numbers of documents, requiring efficient searching and rendering.

---

# Neutral / Future Considerations

* The underlying physical file storage mechanism is outside the scope of this ADR.
* External systems may later provide documents through integrations or shared links.
* Documents may later be imported directly from external systems such as CCTV platforms.
* METIS may later generate Investigation documents such as Investigation printouts or handover packages.
* A future Evidence domain may introduce workflows around evidential material, while Document Management remains the central file repository.
* The document category structure may expand as additional Investigation relationships are introduced.
* The grouping implementation may be replaced with native `Object.groupBy()` if the JavaScript target/environment is later updated.
* Document-level permissions may be reconsidered if future requirements require access restrictions beyond Investigation-level permissions.

---

# Related Documents

* `ADR-011-Investigation-System-UI.md`

