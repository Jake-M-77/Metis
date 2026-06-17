# ADR-009: Relationship presentation strategy

## Status
Accepted

---

# Context

Describe:

- what problem exists
- why this decision is needed
- what constraints affect the decision
- any important architectural concerns

Example topics:
- scalability
- frontend complexity
- backend ownership
- microservice separation
- performance
- UX requirements

METIS is an advanced RMS application and due to the type of system that METIS is, the system can contain alot of information. This is dependant on the record, but this poses an issue as for example in this case a person record that only has two known associates doesnt pose much of an issue interms of layout. However, when this expands to more person associations and being of different relations like family, social, professional, poses an issue. Although the cards will display their relation to the selected person record, this is not enough and causes friction for the user. Therefore, a way to quickly see the relation by category is required.

This allows a person record to have hundreds of person associations and still allow the user to filter down to the required associates quickly and efficiently, this becomes extremely important when certain information is required as quickly as possible. 

---

# Decision

There were two options to implement relationship presentation within the "People Page":

The first one was a bar at the top of the "People Page" this would allow the user to click between "All", "Family", "Social", "Professional". Although this option is a good fit, it poses an issue as the "All" page would be all the relations muddled up which would cause friction, but ontop of that, having to click for example the Family button and then the record required is one-to-many clicks and also causes friction.

The second option is to implement a categorised section layout, this does not use a bar at the top of the page but rather has a box for each section. This would also allow the user to collapse the sections down, removing the need to scroll if wanted. However, this solves the issue of an "All" page which the other option has and which would become redundant immediately other then records that contain 10 or less associations, as all associations would be contained in their relevant sections. 

The decision taken is to implement a categorised section layout. Sections may be collapsed or expanded by the user to reduce visual clutter and improve navigation of large association lists.

---

# Consequences

## Positive

- better discoverability
- Less navigation
- more information visible
- UX improvments
- UI improvements
- scalability improvements


---

## Negative

- potentially longer page
- Additional grouping UI required

---

## Neutral / Future Considerations

None at this time

---

# Related Documents

- `ADR-008-relationship-categorisation-strategy.md`
- `people-page-system-architecture.mmd`
- `PeoplePagePlanning.md`
