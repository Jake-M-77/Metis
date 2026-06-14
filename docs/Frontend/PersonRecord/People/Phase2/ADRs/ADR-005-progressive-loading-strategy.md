# ADR-005: Progressive loading strategy

## Status
Accepted

---

# Context

METIS is an advanced RMS application, and the people page is responsible for loading all the known persons of the person in question. However, although METIS relies on whats called METIS priorities and at this time they are; 

METIS priorities: 

- performant
- responsive
- microservice focused
- operationally resilient
- decoupled by nature

There are gonna be times where loading this page may take longer and one of those highlighted issues is the custody images (if on the system). Therefore, this poses an issue in relation to the percieved performance. 

This ADR exists to improve the percieved performance rather then relying on waiting for the custody image (if on the system) to load, as stated this improves percieved performance but also UI and UX.

---

# Decision

The decision taken is that we will use progressive loading, this means the PersonAssociation cards will be loaded immediately once associated person data has been received. However, this will use placeholder images for the custody images and these will be replaced asynchronously by said custody images (if on the system) once available. 

By also loading placeholder images, the full card component is loaded immediately but also it means that the cards do not later expand when the custody image is loaded, this improves UI and UX for METIS. 

---

# Consequences

## Positive

- UI improvments
- UX improvements
- 

---

## Negative

- Additional frontend state management required
- Slight increase in component complexity
- Placeholder assets must be maintained

---

## Neutral / Future Considerations

None at this time

---

# Related Documents

- `people-page-architecture.md`
- `PeoplePagePlanning.md`
- `ADR-001-card-based-rendering.md`
- `ADR-004-batch-image-fetching-strategy.md`
