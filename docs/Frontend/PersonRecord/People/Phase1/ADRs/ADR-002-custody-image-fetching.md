# ADR-002: Card components uses component level API calling for custody image fetching

## Status
Accepted 

---

# Context

Person association cards renders the most recent custody image for that person

Two approaches were considered for rendering custody images for the person association cards:

- Custody image contained inside the PersonAssociation API response
- API request inside the card component itself

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature

Custody image contained inside the PersonAssociation API response was less suitable due to: 

- Addition to the API response for PersonAssociations (backend changes required)
- Slower response when API response
- Operational response
- Response becomes more rigid and this goes against one of METIS's priorities (de-coupled by nature)

---

# Decision

For the loading of custody images inside the Person Association cards, inline card component API calling was chosen, this is because it meets all of METIS priorities

---

# Consequences

## Positive

- performant 
- responsive
- microservice focused
- easier to maintain as de-coupled by nature

---

## Negative

- Dependant on amount of person associations high API call amount resulting in performance concerns
- introduced complexity with API call inside component

---

## Neutral / Future Considerations

Optional section.

- Optimisation required for possible performance issues relating to high API call amount

---

# Related Documents


- `people-page-architecture.md`
- `custody-image-data-flow.mmd`
- `ADR-001-card-based-rendering.md`
- `PeoplePagePlanning.md`

