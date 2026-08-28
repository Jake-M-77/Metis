# ADR-012: Investigation System Dynamic UI

## Status
Accepted

---

# Context

METIS is an RMS application, and the next major stage of its development is the Investigation system.

The overall Investigation UI layout was established in ADR-011, which defines a persistent context area alongside a dynamic primary workspace. The dynamic workspace is responsible for displaying and interacting with the information contained within an Investigation.

An Investigation can contain a wide range of information depending on the circumstances of the Investigation. While some information is common to every Investigation, other information may only be relevant to specific types of crime or individual circumstances.

Displaying every possible Investigation section by default would result in a large number of sections being presented regardless of whether they contain relevant information. This would increase visual clutter, make relevant information harder to locate, and introduce unnecessary data and UI complexity.

The Investigation workspace must therefore provide a structure that can support a growing number of Investigation information types without requiring every Investigation to display every possible section.

This decision must also align with the wider architectural priorities of METIS:

- Performance
- Responsiveness
- Microservice separation
- Operational resilience
- Decoupling by design
- Compatibility

Two important concepts are established by this architecture:

Available section types are sections that METIS supports and makes available for use.

Enabled sections are sections that have actually been added to a particular Investigation.

Not every available section should automatically be enabled for every Investigation.

---

# Decision

The Investigation workspace will use a modular section architecture.

Each Investigation will contain a set of core sections that are always available:

- Summary
- Task List
- Create Task
- Classification
- MO
- History

Additional Investigation-specific sections will be optional and can be added to an Investigation when relevant.

Examples of optional sections include:

- Property
- Injuries
- Financial
- Evidence
- Other crime-specific information

The Investigation section navigation will display the core sections alongside any optional sections that have been enabled for the current Investigation.

An Add Section mechanism will allow users to select from available optional section types and add the relevant section to the Investigation.

For example, a theft Investigation may contain:

Summary
Task List
Create Task
Classification
MO
History
Property

while an assault Investigation may contain:

Summary
Task List
Create Task
Classification
MO
History
Injuries

The system will therefore distinguish between the sections that METIS supports and the sections that are enabled for a specific Investigation.

The Investigation workspace will not display every possible Investigation section by default.

The exact backend and database representation of optional sections is outside the scope of this ADR and will be determined through the appropriate backend/database research.

---

# Consequences

## Positive

- Performance: The workspace does not need to load or render every possible Investigation section when an Investigation does not require them.

- Responsiveness: Reducing the number of active sections and associated information improves the amount of information that needs to be handled by the workspace at any given time.

- Cleaner UX: Users are presented primarily with information relevant to the Investigation rather than a large collection of empty or irrelevant sections.

- Scalability: New Investigation section types can be introduced without requiring every existing Investigation to display them.

- Maintainability: Investigation functionality can be separated into individual sections, reducing the impact that problems within one section have on unrelated areas of the Investigation workspace.

- Decoupling: Sections can be developed and evolved independently while remaining part of the wider Investigation workspace.

- Compatibility: Limiting the number of simultaneously displayed sections helps the workspace remain usable on smaller screens. Section navigation can be adapted to available screen space, including horizontal scrolling where required.

- Crime-specific flexibility: Different Investigations can contain different information without requiring the overall Investigation architecture to be redesigned for each type of crime.
---

## Negative

- Additional navigation: Users may need to add or navigate to optional sections to access information that is not part of the Investigation's core sections.

- Discoverability: Users may not immediately know which optional sections are available or which sections are relevant to a particular Investigation.

- Frontend complexity: The dynamic section system introduces additional navigation, state management, and component complexity compared with a fixed set of Investigation sections.

- Section consistency: Although sections can share common patterns and components, individual sections may require specific behaviour or UI adaptations, preventing every section from being implemented as an identical component.

- Backend complexity: The backend will need to support the concept of available section types and enabled sections without unnecessarily coupling the Investigation to every possible section.

- Additional development effort: A modular architecture requires additional infrastructure compared with implementing a single fixed Investigation workspace.


---

## Neutral / Future Considerations

The number and types of optional Investigation sections are expected to grow as additional Investigation requirements are established.

The exact mechanism used to persist and resolve enabled sections is intentionally not defined by this ADR. This should be established through the appropriate backend and database architecture research.

The section navigation may require horizontal scrolling or another responsive navigation mechanism as the number of enabled sections increases.

Future Investigation requirements may also identify additional core sections. Any change to what constitutes a core section should be evaluated against the established Investigation architecture.

---

# Related Documents

- `ADR-011-Investigation-System-UI.md`
- `Diagrams/Investigation-System-Dynamic-Section.md`
- `Diagrams/Investigation-System-Dynamic-Add-Section-UI`
