# ADR-008: Relationship categorisation strategy

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

METIS is an advanced RMS application. However, it employs multiple priorities, one of which is that the frontend is to remain "dumb". This is to reduce the amount of code on the frontend, which not only reduces the load on the frontend but also removes edge cases as the frontend should only be responsible for rendering and the backend should be responsible for everything else. This is the reason that API responses contain alot of data that may at times not be required for certain pages, this is mitigated as much as possible by creating dedicated API endpoints to reduce data that is not required but also to make sure that METIS remains performant and responsive. 

Currently the API endpoint built for the "People Page" does have a relationType flag. However, this only returns the relationType, if kept like this the frontend would have to interpret the category type, this goes against METIS priorities to keep the frontend "dumb" and offload the majority of code to the backend. by not implementing a solution we would have to have the frontend work out what type of relation and then to categorise it correctly, which could cause possible issues like edge cases. 

A key constraint is that the current API contract does not expose relationship categories. Implementing this decision requires modification of the PersonAssociation API response and associated test coverage. Because of this it would require an architectural change to the backend API responsible for the "People Page". 

---

# Decision

The PersonAssociation API will become responsible for determining
relationship categories.

The API response will be extended to return a category value
(e.g. FAMILY, PROFESSIONAL, SOCIAL) alongside the existing relationType.

The frontend will consume the category directly and will not perform
relationship categorisation logic.

Frontend categorisation was explicitly rejected as it introduces business
logic into the presentation layer and conflicts with METIS architectural
principles.

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature

---

# Consequences

## Positive

- maintainability improvements
- scalability improvements
- performant
- responsive
- aligns with METIS priorities
- architectural improvements
- Consistent categorisation across all METIS clients

---

## Negative

- increased complexity
- changes to the backend API which includes modifying the response provided by the API and updating manual and auto tests to make sure that the correct response is provided
- maintenance burden

---

## Neutral / Future Considerations

None at this time

---

# Related Documents

- `people-page-system-architecture.mmd`
- `PeoplePagePlanning.md`
