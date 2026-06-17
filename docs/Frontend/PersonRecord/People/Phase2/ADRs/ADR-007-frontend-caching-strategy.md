# ADR-007: Frontend caching strategy

## Status
Accepted 

---

# Context

METIS is an advanced RMS application containing a large number of entities such as persons, investigations, custody records, vehicles, and locations.

Users will frequently navigate between related records whilst conducting enquiries. A common navigation pattern may involve moving from Person A to Person B and then returning to Person A multiple times during a single session.

Without a caching mechanism, each revisit to a previously viewed record would trigger an additional request to the backend, despite the data already having been retrieved. This creates unnecessary network traffic, increases backend load, and may negatively impact responsiveness.

This behaviour conflicts with METIS priorities:

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature

Therefore, a caching strategy is required to reduce repeated retrieval of recently viewed records whilst maintaining a lightweight architecture.

This introduces an architectural concern regarding where the cache should reside and how cached records should be managed.

---

# Decision

The decision taken is to make a frontend cache layer, because there is a high possibility that a user of the system will navigate from say Person A to Person B and then back again to not only check already seen data but to also check new data.

By implementing a frontend cache this will remove the need to query the database again for data that has already been retreived and thus when a user navigates to this said data rather then querying the database and causing a performance hit to the database which inturn at a large scale affects all users using the system it will query the cache layer and return the data, this not only as stated removes the performance and responsiveness hit to the server but it also means that the data retrieved from the cahce is extremely fast and responsive. 

A limit will be placed on the cache to prevent unbounded memory growth. The exact cache size will be determined during implementation.

Avoided: 

A server-side distributed caching solution like Redis was explored. However, for what METIS is trying to achieve at this time, a solution like Redis would intoduce additional infrastructure dependancy which would not currently be justified for the people page and also increase costs of running METIS which goes against the METIS priorities. 

METIS priorities: 

- performant
- responsive
- microservice focused for eventual move to this structure
- Operationally resilient
- decoupled by nature


---

# Consequences

## Positive

- architectural improvments
- scalability improvments
- performance improvements
- responsivness improvements
- UX improvments

---

## Negative

- increased complexity
- future risks
- memory concerns
- maintenance burden

---

## Neutral / Future Considerations

- Cache size limits may require adjustment based on real-world usage patterns.
- Cache expiry and invalidation strategies remain undecided and will be evaluated during implementation.

---

# Related Documents


- `people-page-system-architecture.mmd`
- `PeoplePagePlanning.md`
- `ADR-004-batch-image-fetching-strategy.md`
- `ADR-005-progressive-loading-strategy.md`
- `ADR-006-service-failure-handling.md`