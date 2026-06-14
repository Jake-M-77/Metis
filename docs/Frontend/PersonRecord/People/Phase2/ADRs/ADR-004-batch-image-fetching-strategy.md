# ADR-004: Batch Image Fetching Strategy

## Status
Accepted

---

# Context

Describe:

- what problem exists
- why this decision is needed
- what constraints affect the decision
- any important architectural concerns

When people page loads, dependent on the amount of people known to the person in question, this could either be 1 or 100+. This causes major issues interms of performance and lag and this is only on the frontend. This does not talk about the stress this puts on the backend, due to ADR-002 we decided to put the API calls for each person inside the components themselves, this was good as it meant a single place for failure. However, when calling anything more then 10 API calls this will start to cause issues interms of performance and responsiveness, this goes directly against METIS priorities.

METIS priorities: 

- performant
- responsive
- microservice focused
- operationally resilient
- decoupled by nature

The current constraints that affect this decision is that ADR-002 has the API calls inside the components so this may need to change. 

Primary architectural concern is preventing N+1 image request scaling issues while maintaining service decoupling.

---

# Decision

The option picked is to batch the image fetching. Therefore this will reduce the performance issues and responsiveness issues aligning with the METIS priorities along with also being operationally resilient. 

This will also allow the use of lighter hardware being used positively improving cost if deployed to the cloud.

This ADR partially supersedes the implementation details of ADR-002 while retaining its core objective of keeping custody image retrieval independent from the PersonAssociation API response.

---

# Consequences

## Positive

- benefits gained
- architectural improvements
- scalability improvements
- UX improvements
- maintainability improvements

- performant
- responsive
- able to scale easily


---

## Negative

- this will require a possible rewrite to the card component as we will need to remove the image fetching and make the image fetching centralised.
- we will also need to figure out how to send the images to the right cards, possible that we will use some sort of dictionary to have the UUID and then the link and then send that back out with the UUID and the URL replaced with the image, but this will be looked further into at dev time. 

---

## Neutral / Future Considerations

None found at this time

---

# Related Documents

- `people-page-architecture.md`
- `PeoplePagePlanning.md`
- `ADR-002-custody-image-fetching.md`
