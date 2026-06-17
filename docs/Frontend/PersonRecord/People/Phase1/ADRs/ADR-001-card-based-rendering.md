# ADR-001: People page uses card-based rendering instead of tables

## Status
Accepted 

---

# Context

The "People" page displays people associated with the currently viewed person. 

Two rendering approaches were considered: 

- table-based rendering
- component/card-based rendering

METIS prioritises:

- minimal scrolling
- responsive layouts 
- laptop-first workflows
- dark-mode-first UI
- efficient space usage
- decoupled by nature

Tables rendering was considered less suitable due to: 

- horizontal compression
- poor responsiveness
- limited layout flexibility


---

# Decision

For the "People" page, card-based layout was chosen this is because it meets METIS priorities, but also because it allows the possibility of multiple cards per row and also allows the clicking of a card to navigate directly to the selected person's full record.

---

# Consequences

## Positive

- Improved responsive behaviour
- better dark-mode presentation
- minimal scrolling
- efficinet space usage
- improved flexibility for future UI enhancements
- easier future component reuse

---

## Negative

- more complex frontend implementation
- increased styling complexity
- possible future performance concerns with large association counts

---

## Neutral / Future Considerations

Optional section.

- virtualisations
- lazy rendering
- grouping/categorisation
- viewport-based loading

---

# Related Documents

- `PeoplePagePlanning.md`
- `people-page-architecture.md`
- `people-page-system-architecture.mmd`
- `ADR-002-custody-image-fetching.md`
