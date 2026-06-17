# ADR-006: Service failure handling

## Status
Accepted

---

# Context

METIS is an advanced RMS application and the people page shows all the known relations of the person in question, it also displays the custody images of people known to the person in question. However, at this moment we have only covered a successful (200) response, but there are two outstanding responses: No image (404) and timeout / network issue (500). If these two remaining issues are not covered then this does not follow and therefore breaks METIS priorities

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature

Currently when the people page loads and the person data is retrieved it will currently display placeholder images this was covered in ADR-005. However we also need to decide what will be done in the event of either a 404 or 500 as these are both possible. 

---

# Decision

The decision taken is to make two placeholder images one for 404 and one for 500, these will be used in situations where either a custody image does not exist on the system, or an issue has occurred on the backend. 

the 404 image placeholder can be used for many reasons; one of which is that the person has never been arrested which is highly possible.

The 500 image placeholder indicates that an unexpected error occurred while attempting to retrieve the image.

by implementing this decision we are keeping within the METIS priorities, but also improving UI and UX by making the user aware of situations rather than it being just a generic response and this also means that an image failure does not break the page. 

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature

---

# Consequences

## Positive

- UX improvements
- UI improvments
- maintainability improvements
- service failures remain isolated
- image retrieval failures do not impact People Page functionality

---

## Negative

- additional UI states must be maintained
- maintenance burden
- Slight increase in component complexity
- Placeholder assets must be maintained

---

## Neutral / Future Considerations

None found at this time

---

# Related Documents

- `people-page-architecture.md`
- `PeoplePagePlanning.md`
- `ADR-001-card-based-rendering.md`
- `ADR-004-batch-image-fetching-strategy.md`
- `ADR-005-progressive-loading-strategy.md`
