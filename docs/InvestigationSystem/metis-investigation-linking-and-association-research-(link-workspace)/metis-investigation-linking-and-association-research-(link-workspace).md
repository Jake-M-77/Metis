# METIS Investigation Linking & Association Research

## 1. Purpose

The Investigation system requires a dedicated mechanism for connecting information contained within an Investigation to the wider METIS dataset.

Information entered into an Investigation is initially **Investigation-owned information**.

This means that the information exists within the context of that Investigation and does not automatically become associated with an existing METIS record simply because a matching record may already exist.

For example, an investigator may enter a person's details into an Investigation:

```text
Investigation

    └── Person
          └── John Doe
```

Even if a METIS Person record for John Doe already exists, the Investigation should not automatically assume that the two records are the same.

The investigator must deliberately research the information and establish the association.

The **Links** workspace therefore provides the mechanism through which investigators can:

* Research Investigation-owned information.

* Search for existing METIS records.

* View potential matching records.

* Link Investigation information to an existing METIS record.

* Create a new METIS record where an appropriate record does not already exist.

* Remove an existing association.

* Edit relevant information where appropriate.

* Delete information where appropriate.

The purpose of this research is to define the behaviour and conceptual structure of the Investigation linking system before implementation begins.

This research covers:

* The definition of an Investigation link.

* The distinction between Investigation-owned information and METIS records.

* The Links workspace.

* The Links workspace tree.

* Linkable Investigation information.

* Research and search behaviour.

* Viewing potential records.

* Explicit linking.

* Nested research.

* Tabbed research.

* Reuse of existing METIS research interfaces.

* The Investigation linking lifecycle.

* Removing links.

* Deleting information.

* The distinction between existing METIS records and records created from an Investigation.

The underlying database schema, API design, Prisma models, React components, state management and other implementation details are outside the scope of this research.

---

## 2. Linking Definition

A link represents an **explicit association between an Investigation and an existing METIS record**.

The association allows the Investigation to be discovered through the linked record elsewhere within METIS.

For example:

```text
Investigation
      │
      │ Link
      ▼
METIS Person: John Doe
```

Once the association exists, searching for John Doe elsewhere in METIS can expose the associated Investigation.

The investigator therefore does not need to know the Investigation number.

They may instead discover the Investigation through information they already know.

For example:

```text
Known information:

Phone number
077777775450

        │
        ▼
Search METIS

        │
        ▼
Existing METIS record

        │
        ▼
Associated Investigation
```

This makes Investigation information discoverable throughout METIS rather than requiring investigators to know where the original information was entered.

The association is deliberately created by the investigator.

Researching or viewing a record **does not automatically create a link**.

This distinction is important:

```text
Research ≠ Link
```

Only the explicit **Link** action establishes the association.

---

## 3. Investigation-Owned Information

Investigation-owned information is information that exists within an Investigation but has not yet been associated with a wider METIS record.

For example:

```text
Investigation

    └── Person
          └── John Doe
```

At this stage, John Doe is information belonging to the Investigation.

The information remains isolated to that Investigation until the investigator deliberately:

* Links it to an existing METIS record.

* Or creates a new METIS record from it.

This provides an important separation between information gathered during an Investigation and information that has been deliberately promoted into the wider METIS dataset.

The system should therefore not assume that every piece of information entered into an Investigation already exists elsewhere within METIS.

An investigator may enter information because:

* It has been newly discovered.

* It has not previously existed within METIS.

* The investigator does not yet know whether it exists within METIS.

* It requires research before an association can be established.

This means Investigation information can exist independently before being associated with the wider system.

---

## 4. Linkable Information

The Links workspace should expose information that is considered **link-worthy**.

The system should not restrict linking to only a small predefined group of entity types.

Potential linkable information may include:

* People.

* Phone numbers.

* Email addresses.

* Vehicles.

* Organisations.

* Documents.

* Addresses and locations where applicable.

* Investigation information.

* Information contained within static Investigation sections.

* Information contained within dynamic Investigation sections.

The exact set of linkable information will depend upon the information exposed by each Investigation section.

For example, a Person may contain:

```text
Person
└── Comms
      └── 077777775450
```

The phone number may itself be researchable and linkable.

Similarly, a Vehicle may contain information which can be researched against existing METIS records.

The Links workspace should therefore be based around **linkable information**, rather than simply reproducing every field within an Investigation.

Information that cannot be linked should not appear within the Links workspace.

The Links workspace is therefore not intended to replace the main Investigation workspace.

Its purpose is specifically to expose information which can be researched, associated or promoted into the wider METIS dataset.

---

## 5. Links Workspace

The Investigation contains a dedicated **Links** workspace.

The workspace provides investigators with a single location from which they can research and manage associations between Investigation information and METIS records.

The initial structure is:

```text
Links
│
├── Investigation
├── People
├── Vehicles
├── Organisations
└── Documents
```

Each entry represents a persistent Investigation area containing information that may be available for linking.

The exact contents beneath each area depend upon the information contained within the Investigation.

The Links workspace therefore provides a structured representation of the Investigation's linkable information.

The primary purpose of the workspace is to allow an investigator to:

1. Select Investigation information.

2. Research that information.

3. Find an appropriate METIS record.

4. View the potential record.

5. Explicitly link the record.

6. Remove the link later if required.

Where an appropriate record does not exist, the investigator may instead create a new METIS record.

This means the Links workspace is not simply an association viewer.

It is also the controlled point at which Investigation-owned information can be deliberately connected to the wider METIS dataset.

---

## 6. Links Workspace Structure

The Links workspace uses a tree-based structure.

Conceptually:

```text
Links
│
├── Investigation
│
├── People
│   │
│   └── John Doe
│       └── Comms
│           └── 077777775450
│
├── Vehicles
│   │
│   └── AB12 CDE
│
├── Organisations
│   │
│   └── Example Organisation
│
└── Documents
```

Each persistent area is expandable.

Expanding an area reveals the linkable information contained within that area.

Dynamic Investigation sections are represented in the same way as static sections.

For example:

```text
Person
│
├── Personal Information
├── Comms
│   ├── 077777775450
│   └── example@email.com
├── Statements
└── Notes
```

Only information which can actually be researched or linked should be exposed.

The exact tree depth will therefore depend on the structure of the underlying Investigation section.

---

## 7. Nested Linkable Information

Linkable information should be grouped into meaningful subtrees where appropriate.

This avoids presenting a large number of unrelated values directly underneath an entity.

For example, the following would be unnecessarily flat:

```text
John Doe
├── 077777775450
├── example@email.com
├── 21 Example Street
└── AB12 CDE
```

Instead, related information should be grouped:

```text
John Doe
├── Comms
│   ├── 077777775450
│   └── example@email.com
├── Address
│   └── 21 Example Street
└── Vehicle
    └── AB12 CDE
```

This grouping should be applied wherever it improves the structure of the Links workspace.

The purpose is not to reproduce every detail of the main Investigation workspace.

The purpose is to provide a clear hierarchy of information which can actually be researched and linked.

---

## 8. Dynamic Investigation Sections

Dynamic Investigation sections should be treated in the same way as static sections when represented within Links.

If a dynamic section contains information which can be linked, that information should appear within the relevant tree.

For example:

```text
Investigation
│
├── Summary
├── Classification
├── MO
├── Admin
└── Dynamic Section
    ├── Item A
    ├── Item B
    └── Item C
```

If Item A is linkable, it can be selected and researched in exactly the same conceptual manner as information from a static section.

The Links workspace therefore does not require a fundamentally different model for dynamic sections.

Dynamic sections simply contribute additional linkable information to the appropriate tree.

---

## 9. Tree Selection Behaviour

The investigator selects an item within the Links tree before performing an action.

Selecting an item should visually highlight it.

Once an item is selected, the relevant action becomes available.

For example:

```text
John Doe
└── Comms
    └── 077777775450   ← Selected
```

The **Research** button can then become enabled.

There is no requirement for the action button to dynamically change its wording to something such as:

```text
Research 077777775450
```

The selected item itself provides the context.

The interface can therefore use generic actions such as:

* Research.

* Edit.

* Remove Link.

* Delete.

The selected item provides the target for the action.

---

## 10. Linked and Unlinked State

The Links workspace should visually distinguish between information which has an existing association and information which has not.

Conceptually:

```text
John Doe
│
├── Comms
│   ├── 077777775450     ✓ Linked
│   └── example@email.com ✕ Unlinked
```

A possible visual representation is:

* Linked information displayed using a distinct colour, such as blue, with a tick.

* Unlinked information displayed using grey text with a cross.

The exact colours and visual styling are implementation details.

The important requirement is that an investigator can quickly determine whether information is already associated with a METIS record.

The visual state should not require the investigator to open each item individually simply to determine whether a link exists.

---

## 11. Links Workspace Actions

The primary actions within the Links workspace are:

* **Research**

* **Edit**

* **Remove Link**

* **Delete**

These actions should remain deliberately explicit.

In particular, an action labelled simply **Remove** should not be used because it is ambiguous.

An investigator needs to understand whether an action:

* Removes the association.

* Removes the information from the Investigation.

* Deletes the underlying METIS record.

The explicit **Remove Link** and **Delete** actions prevent this ambiguity.

No additional actions should be introduced unless a genuine requirement for them is identified.

---

## 12. Research Workflow

Research begins when the investigator selects a linkable item and chooses **Research**.

The research process should allow the investigator to search METIS for a matching record.

Conceptually:

```text
Investigation Information
        │
        ▼
     Research
        │
        ▼
   Search METIS
        │
        ▼
  Search Results
        │
        ▼
   Select Record
        │
        ▼
    View Record
        │
        ├── Link
        │
        └── Back
```

Researching information does not itself create a relationship.

The investigator must explicitly choose **Link** after confirming that the selected METIS record is the correct record.

---

## 13. Reuse of Existing Research Interfaces

Where METIS already contains a suitable research or search interface, the Links workspace should reuse it.

This is preferred over creating a second implementation of an existing research system.

For example, if a Location research interface already exists, the Links workspace should use the same Location research interface.

Conceptually:

```text
Main Investigation
        │
        └── Location Research
                │
                ▼
          Existing Interface


Links Workspace
        │
        └── Location Research
                │
                ▼
          Existing Interface
```

This provides a single source of truth for the research experience.

If the existing interface changes in the future, the Links workspace can benefit from those changes without requiring an entirely separate research implementation.

A bespoke research interface should only be introduced when:

* An appropriate existing interface does not exist.

* The existing interface is not suitable for the linking workflow.

* The requirements of the linkable information genuinely differ from the existing research process.

The same principle applies to search result displays.

---

## 14. Search Behaviour

Search behaviour should follow the existing METIS research model wherever possible.

The investigator provides the relevant information and searches for potential matches.

For example, a phone number could be researched:

```text
Research:

077777775450
```

The system then returns any matching records.

The investigator is responsible for providing sufficient information to narrow the search.

The system should not impose arbitrary restrictions on how many potential results may be returned.

For example, a Location search may allow a large number of fields to be entered.

If the investigator only provides:

```text
Door Number: 21
```

the result set may contain many addresses.

Adding:

```text
Street: Example Street
```

may narrow the result set considerably.

The investigator is responsible for interpreting the results and providing additional search information when required.

METIS is therefore a tool for supporting investigation activity rather than the system making the final determination of which record is correct.

---

## 15. Search Results

Search results should use the existing METIS result interface where that interface is suitable.

For example, if the Location system already provides a result window, the Links workspace should reuse that result window.

The investigator should be able to identify a potential record and inspect it before establishing the association.

Conceptually:

```text
Search Results

Record A
    [ View ]

Record B
    [ View ]

Record C
    [ View ]
```

There should be no arbitrary result limiter intended to force the investigator to choose from a predetermined number of records.

The investigator may instead refine the search using additional information where appropriate.

---

## 16. Viewing Potential Records

Search results may contain multiple potential matches.

Each result should therefore be capable of being viewed before linking.

The **View** action should display the record using the normal METIS viewing experience.

The record should appear as though it had been found through the main METIS search system.

Conceptually:

```text
Search Results
│
├── Record A
│     └── View
│           ├── Link
│           └── Back
│
├── Record B
│     └── View
│           ├── Link
│           └── Back
│
└── Record C
      └── View
            ├── Link
            └── Back
```

This allows the investigator to inspect the record before deciding whether it is the correct association.

If it is not the correct record, the investigator can return to the search results and inspect another result.

---

## 17. Explicit Linking

Once the investigator has confirmed that a METIS record is the correct record, they explicitly select **Link**.

Linking is therefore a deliberate user action.

The system should not automatically link records based on search results.

The workflow is:

```text
Search
  ↓
Search Results
  ↓
View
  ↓
Confirm Correct Record
  ↓
Link
```

Once the Link action has been completed, the association between the Investigation and the METIS record exists.

This distinction is important because a search result represents only a potential match.

Only the investigator's explicit Link action establishes the association.

---

## 18. Creating a New METIS Record

The Links workspace should also support the creation of a new METIS record where no appropriate existing record can be found.

The conceptual workflow is therefore:

```text
Research
   │
   ▼
Search METIS
   │
   ├── Existing Record
   │       │
   │       ▼
   │      Link
   │
   └── No Existing Record
           │
           ▼
      Create Record
           │
           ▼
         Link
```

The purpose of this behaviour is to prevent useful Investigation information from remaining permanently isolated simply because the information did not previously exist within METIS.

When a new record is created from Investigation information, that information becomes part of the wider METIS dataset.

The exact creation forms and validation requirements are outside the scope of this research.

---

## 19. Tab-Based Research Workspace

The Links workspace should use a tab-based system for research activities.

The root Links workspace acts as the main context, while individual research, viewing or editing operations can open their own tabs.

Conceptually:

```text
┌─────────────────────────────────────────────────────────────┐
│ Links │ John Doe │ Comms:077777775450 │ Vehicle AB12 CDE │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Active Tab Content                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

This allows multiple research operations to remain available without forcing the investigator to repeatedly lose their place within the Links tree.

---

## 20. Tab Creation

A tab can be created when the investigator:

* Researches an item.

* Views a record.

* Edits an item.

The exact content of the tab depends upon the operation being performed.

For example:

```text
Research 077777775450
        ↓
Tab: Comms:077777775450
```

Or:

```text
View John Doe
        ↓
Tab: John Doe
```

The tab therefore represents the current operation rather than simply representing an arbitrary screen.

---

## 21. Tab Naming

Tabs should use the name of the thing being researched, viewed or edited.

Examples include:

```text
John Doe
Vehicle AB12 CDE
Comms:077777775450
example@email.com
```

For information which requires additional context, a descriptive format can be used.

For example:

```text
Comms:077777775450
```

This allows the investigator to identify the purpose of a tab quickly when multiple research operations are open.

---

## 22. Tab Navigation

Tabs are displayed across the top of the Links workspace.

The investigator can switch between open tabs by selecting the relevant tab.

Conceptually:

```text
[ Links ] [ John Doe ] [ Comms:077777775450 ] [ AB12 CDE ]
```

The selected tab represents the active operation.

The root **Links** tab provides the main Links workspace and acts as the primary navigation context.

---

## 23. Closing Tabs

Individual tabs can be manually closed using an **X** displayed at the end of the tab.

For example:

```text
[ Links ] [ John Doe X ] [ Comms:077777775450 X ]
```

A research tab may also close automatically once the relevant linking operation has been completed.

The investigator should not be required to remain inside the research tab after the link has been established.

The exact automatic tab lifecycle can be refined during implementation, but the important requirement is that completed research should not unnecessarily force the investigator to remain inside the previous research context.

View tabs can also be manually closed.

---

## 24. Closing Warnings

Closing a research tab before completing an outstanding action should produce a warning.

For example:

```text
You have an outstanding research action.

Are you sure you want to close this tab?
```

The same principle applies when closing the entire Links workspace.

If there are outstanding link actions, the system should warn the investigator before closing the workspace.

Depending on the final implementation, the warning may identify the outstanding actions or tabs.

The purpose of the warning is to prevent an investigator from accidentally abandoning active research.

---

## 25. Root Links Tab

The root **Links** tab represents the main Links workspace.

It should not be independently closable in the same way as research or viewing tabs.

Closing the root Links context is effectively equivalent to closing the entire Links workspace.

Therefore:

```text
[ Links ] [ John Doe X ] [ Vehicle AB12 CDE X ]
```

The individual research tabs can be closed, while the root Links tab remains the persistent workspace context.

If the investigator attempts to close the entire Links workspace while outstanding actions exist, the outstanding-action warning should be displayed.

---

## 26. Nested Research

The Links workspace should support research at different levels of the Investigation information hierarchy.

For example:

```text
People
└── John Doe
    └── Comms
        └── 077777775450
```

The investigator may select the phone number and research it independently.

The same principle can apply to information within:

* People.

* Vehicles.

* Organisations.

* Documents.

* Investigation information.

* Dynamic sections.

Nested information should therefore not be treated as secondary or inaccessible simply because it is contained beneath another entity.

If it is linkable, it should be available for research.

---

## 27. Linking Lifecycle

The Investigation-to-METIS linking lifecycle is:

```text
Unlinked
   ↓
Research
   ↓
Search Results
   ↓
Select Record
   ↓
View Record
   ↓
Link
   ↓
Linked
   ↓
Remove Link
   ↓
Unlinked
```

This represents the normal lifecycle of an Investigation association.

The important characteristics are:

* Information begins as unlinked Investigation-owned information.

* Research is performed deliberately.

* Search results represent potential records.

* A record can be viewed before linking.

* The investigator explicitly establishes the association.

* A linked record can later have its association removed.

The lifecycle does not require automatic association based on search results.

---

## 28. State After Linking

After a record has been linked, the record should remain visible within the research results where applicable.

The linked record should **not** be moved into a separate `Linked` area.

The original tree structure should remain unchanged.

For example:

```text
People
└── John Doe
    └── Comms
        └── 077777775450
```

The item remains in the same location after it has been linked.

Its linked/unlinked visual state provides the indication that the association now exists.

Linking does not automatically trigger further research.

The investigator is also not required to remain within the current research tab after linking.

The association is established and the investigator can continue working elsewhere.

---

## 29. Remove Link

The **Remove Link** action removes the association between the Investigation and the METIS record.

For an existing METIS record, this means:

```text
Investigation
      │
      │ Remove Link
      ▼
Association removed
```

The underlying METIS record remains available elsewhere within METIS.

The information is simply no longer associated with the Investigation.

Within the Investigation, the linked item is removed from the Investigation's linked context.

This is fundamentally different from deleting the underlying METIS record.

Therefore:

```text
Remove Link
    =
Remove the association
```

It does not mean:

```text
Delete the METIS record
```

---

## 30. Delete

The **Delete** action represents deletion of the underlying information or record where appropriate.

Because deletion has potentially significant consequences, it must remain explicitly distinct from **Remove Link**.

For example:

```text
Remove Link
    ↓
Remove association only
```

Whereas:

```text
Delete
    ↓
Delete underlying information / record
```

If an investigator attempts to delete something which is already linked, the system should clearly explain the distinction.

For example:

```text
This record is currently linked to the Investigation.

If you only want to remove the association,
use "Remove Link".

Deleting this record will delete the underlying
METIS record.
```

The exact wording can be refined during implementation.

The important requirement is that the investigator is clearly informed of the consequences before deletion occurs.

---

## 31. Existing METIS Records vs Investigation-Created Records

The consequences of deletion depend upon whether the METIS record already existed independently of the Investigation.

### Existing METIS Record

If the record already existed within METIS before the Investigation was linked to it:

```text
Existing METIS Record
        │
        ▼
Investigation Link
```

Removing the link should only remove the association.

The underlying METIS record remains.

For example:

```text
METIS Person
John Doe

        │
        ├── Investigation A
        └── Investigation B
```

If Investigation A removes its link:

```text
METIS Person
John Doe

        │
        └── Investigation B
```

John Doe still exists within METIS.

### Investigation-Created Record

If no existing METIS record was found and the investigator creates a new record from the Investigation:

```text
Investigation Information
        │
        ▼
Create METIS Record
        │
        ▼
Link to Investigation
```

The new record becomes part of the METIS dataset.

If that newly created record is subsequently deleted, the underlying METIS record can also be deleted because it was created specifically from the Investigation and did not previously exist independently within METIS.

This distinction prevents the system from accidentally deleting established METIS information simply because one Investigation no longer requires its association.

---

## 32. Research Does Not Equal Linking

The system must maintain a clear distinction between researching a record and linking a record.

For example:

```text
Research John Doe
        │
        ▼
View John Doe
```

At this stage, no association has been created.

The investigator must explicitly select:

```text
Link
```

Only then does the association exist.

This prevents an investigator from accidentally linking the wrong record simply because it appeared in a search result or was opened for inspection.

The system should therefore treat:

```text
Research
View
```

as investigative actions, while:

```text
Link
```

is the action which changes the relationship between the Investigation and the wider METIS dataset.

---

## 33. Links and Investigation Sections

The Links workspace should reflect information available throughout the Investigation.

This includes information originating from:

* Persistent Investigation areas.

* Static Investigation sections.

* Dynamic Investigation sections.

* Nested information contained within those areas.

However, the Links workspace should not become a duplicate of the Investigation workspace.

Only information capable of being researched, associated or otherwise linked should appear.

Conceptually:

```text
Investigation
│
├── Persistent Areas
│   ├── People
│   ├── Vehicles
│   ├── Organisations
│   └── Documents
│
├── Static Sections
│   ├── Summary
│   ├── Classification
│   ├── MO
│   └── Admin
│
└── Dynamic Sections
    ├── ...
    └── ...
```

The Links workspace exposes only the relevant linkable information from these areas.

---

## 34. Investigation Discoverability

One of the primary purposes of linking is to make Investigations discoverable through information already known to investigators.

Without linking:

```text
Phone Number
    │
    └── Investigation-owned information only
```

With linking:

```text
Phone Number
    │
    ├── METIS Record
    │
    └── Associated Investigation
```

This means investigators can discover relevant Investigations through ordinary METIS searches.

For example, an investigator may know:

* A phone number.

* A person's name.

* An email address.

* A vehicle registration.

* An organisation.

* Another known METIS record.

They do not necessarily need to know the Investigation number.

The association therefore provides a wider discovery mechanism across METIS.

---

## 35. Links Workspace as a Promotion Point

The Links workspace represents the point at which Investigation-owned information can deliberately become part of the wider METIS information environment.

The process can be represented as:

```text
Investigation-Owned Information
             │
             ▼
          Research
             │
             ▼
     Existing METIS Record?
          /        \
        Yes         No
         │           │
         ▼           ▼
       Link       Create Record
         │           │
         └─────┬─────┘
               ▼
        Wider METIS Dataset
```

This provides a controlled boundary between information which belongs only to the Investigation and information which has been deliberately introduced into the wider METIS dataset.

The investigator therefore remains responsible for deciding when an association should be established.

---

## 36. No Automatic Linking

The system should not automatically establish links based solely on matching information.

For example, if an Investigation contains:

```text
John Doe
077777775450
```

and METIS contains a record with the same information, the system should not automatically assume that the two are the same.

Instead:

```text
Match Found
     │
     ▼
Research
     │
     ▼
View
     │
     ▼
Investigator Confirms
     │
     ▼
Link
```

This keeps the association explicit and prevents a potential search match from becoming an authoritative relationship without investigator confirmation.

---

## 37. Neutral / Future Considerations

The following areas remain intentionally open for implementation and future design work:

* The exact visual styling of linked and unlinked states.

* The exact layout of the Links modal/workspace.

* The final treatment of the persistent Investigation item.

* The precise tab lifecycle after a successful link.

* The exact warning wording for closing outstanding research actions.

* The exact forms used when creating a new METIS record.

* The exact interfaces used by each individual linkable information type.

* The exact rules governing deletion of Investigation-created METIS records.

* Any future linkable entity types introduced by METIS.

These decisions should be made when the relevant implementation work is undertaken.

The core behavioural principles established by this research should remain unchanged:

* Research does not automatically create a link.

* Linking is an explicit investigator action.

* Existing suitable research interfaces should be reused.

* Linkable information should be represented within a structured tree.

* Linked and unlinked states should be visually distinguishable.

* Existing METIS records should not be deleted simply because an Investigation removes its association.

* Investigation-created records may have different deletion consequences because they were introduced into METIS through the Investigation.

* The Links workspace should provide discoverability without replacing the main Investigation workspace.

---

## Related Documents

None at this time

---

## Related Research

None at this time

---


