# ADR-003: Card layout

## Status
Accepted 

---

# Context

When People page loads and PersonAssociation API is called, it will load person association card. However, what data is displayed is key as this will return the entire person.

Two approaches were considered for the Person association card layout: 

- Render only: Firstname, Lastname, DOB, Relation
- Render full person response

METIS priorities: 

- performant
- responsive
- microservice focused
- operationally resilient
- decoupled by nature

Loading the full person response was deemed less suitable due to: 

- Extra space needed
- METIS prioritises performance and responsiveness
- Only requiring the necessary information at glance

---

# Decision

For the loading of the person association card it was decided to only load the firstname, lastname, DOB, relation. This is due to it meeting METIS priorities.

---

# Consequences

## Positive

- performant
- responsive
- loading only the necessary data 

---

## Negative

- to obtain further information, the user will need to load that persons full record

---

## Neutral / Future Considerations

Optional section.

- possible update to the card layout later on to allow more information to be shown at a glance

---

# Related Documents

- `people-page-architecture.md`
- `ADR-001-card-based-rendering.md`
- `PeoplePagePlanning.md`
