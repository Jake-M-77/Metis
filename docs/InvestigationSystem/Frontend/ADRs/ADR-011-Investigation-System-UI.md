# ADR-011: Investigation System UI

## Status
Accepted

---

# Context

METIS is an RMS application, and the next major stage of its development is the Investigation system. As an Investigation can contain a significant amount of interconnected information, a decision is required regarding how this information should be presented to users without creating an overcrowded or difficult-to-navigate interface.

The Investigation system is expected to become an important part of METIS, with other systems and information eventually interacting with it. Establishing the UI architecture early reduces the risk of unnecessary rework, architectural inconsistencies, and technical debt as additional Investigation functionality is introduced.

METIS must also support different screen sizes. An Investigation containing a small amount of information should remain usable, while an Investigation containing a large amount of information must also scale appropriately without causing the interface to become overcrowded or unusable.

The UI architecture must therefore consider the following METIS priorities:

- Performance
- Responsiveness
- Microservice separation
- Operational resilience
- Decoupling by design
- Compatibility

Two primary layout approaches were considered.

## Option 1 - Three-column layout design

The first option was a three-column layout using a left, middle, and right structure.

The left column would contain core Investigation information and associated entities such as:

Reference number
Status
Officer assigned
People
Vehicles
Organisations

The middle column would provide the primary area for viewing and interacting with the selected information.

The right column would contain additional Investigation information such as:

Documents
Links
Other supporting information

This approach is similar to the layout used by other RMS systems.

### Benefits 

- Allows a large amount of information to remain visible simultaneously.
- Reduces the number of navigation actions required to access commonly used information.
- Provides direct visibility of multiple areas of an Investigation.

### Concerns

- Displaying a large amount of information simultaneously can make it more difficult for users to locate the specific information they require.
- Loading and rendering multiple areas of Investigation information simultaneously could increase the amount of data required during the initial page load.
- The three-column structure becomes increasingly constrained as the available screen width decreases.
- On smaller screens, columns may become compressed, potentially reducing usability.
- Supporting significantly different layouts for different screen sizes could increase implementation complexity and result in users having to learn different interface structures depending on their screen size.

### Option 2 - Two-column layout

The second option was a two-column layout consisting of a persistent Investigation context area and a dynamic primary workspace.

The left-hand area would contain persistent Investigation context and navigation to associated entities, such as:

Investigation information
People
Vehicles
Organisations
Documents

The right-hand area would act as the primary workspace. Its contents would change according to the area selected by the user.

For example:

Investigation → Investigation workspace
People        → People workspace
Vehicles      → Vehicles workspace
Documents     → Documents workspace

This approach is similar to the existing structure used by the METIS Person record, where navigation is provided on the left and the selected content is displayed in the primary workspace.

### Benefits

- Reduces the amount of information that needs to be presented simultaneously.
- Allows Investigation information to be loaded according to the active workspace rather than requiring every area to be displayed at once.
- Supports a more responsive interface by limiting the amount of information being actively displayed.
- Provides a layout that can adapt more effectively to smaller screen sizes.
- Provides a consistent primary workspace for different areas of the Investigation.
Reduces visual clutter while still providing access to the full Investigation.

### Concerns

- Some Investigation information will not be immediately visible and will require navigation to the appropriate workspace.
- Users will need to navigate between different areas to access certain information.
- Users may initially require additional time to become familiar with where different Investigation information is located.
- The dynamic workspace introduces additional navigation and state-management requirements within the frontend.


---

# Decision

The Investigation system will use Option 2: a two-column persistent-context and dynamic-workspace layout.

The left-hand area will provide persistent Investigation context and navigation, while the right-hand area will act as the primary workspace for the currently selected Investigation area.

This approach was selected because it better aligns with the architectural priorities of METIS.

By separating persistent Investigation context from the active workspace, the interface does not need to display all Investigation information simultaneously. This allows information to be resolved and displayed according to the user's current context rather than requiring every area of the Investigation to be presented at once.

The layout also provides greater flexibility across different screen sizes. Rather than compressing multiple information-dense columns into a smaller viewport, the primary workspace can remain the main area of interaction while Investigation context remains accessible through the persistent navigation area.

The three-column approach will therefore not be used for the Investigation system.

---

# Consequences

## Positive

- Performance: The architecture supports loading and rendering Investigation information according to the active workspace rather than requiring all information to be displayed - simultaneously.
- Responsiveness: The reduced information density allows the interface to remain responsive while navigating between Investigation areas.
- Compatibility: The two-column structure can adapt more effectively to different screen sizes than a three-column information-dense layout.
- Cleaner UX: Information is organised into clearly defined workspaces, reducing the amount of information competing for the user's attention.
- Maintainability: The dynamic workspace provides a consistent structure for introducing additional Investigation areas without requiring each area to have its own independent page layout.
- Scalability: Additional Investigation functionality can be introduced as new workspaces while retaining the established overall page architecture.

---

## Negative

- Additional navigation: Users will need to navigate between workspaces to access information that is not currently active.
- Increased frontend complexity: The dynamic workspace requires additional state and navigation handling compared with a static information layout.
- Discoverability: Users may initially need to learn where different types of Investigation information are located.
- Workspace management: Care must be taken to ensure that navigation between workspaces does not introduce unnecessary coupling or create cascading dependencies between components.

---

## Neutral / Future Considerations

The persistent-context and dynamic-workspace model should be reviewed as the Investigation system develops and additional requirements are established.

If future Investigation requirements introduce substantially different information or workflows, the architecture may need to be extended or revised. Any significant change to the underlying UI architecture should be considered separately and documented through an appropriate ADR if necessary.

---

# Related Documents

- `Diagrams/Investigaion-UI-Diagram.mmd`
- `Diagrams/Investigation-UI-Wireframe.md`

