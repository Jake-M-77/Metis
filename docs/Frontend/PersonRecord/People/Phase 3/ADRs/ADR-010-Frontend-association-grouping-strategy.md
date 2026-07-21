# ADR-010: Frontend Association Grouping Strategy

## Status
Accepted - Retroactive ADR

---

# Context

METIS is a RMS application currently implementing relationship categorisation on the People Page.

As part of Phase 3, person associations are being enhanced with relationship metadata provided by the backend. The backend is responsible for determining the relationship category, while the frontend is responsible for presenting and organising this data.

To improve usability, the frontend needs to group person associations by their `relationshipCategory` value before rendering relationship sections.

During implementation, it was identified that the planned approach of using the native JavaScript `Object.groupBy()` method was unavailable within the current METIS frontend environment.

This is because METIS currently targets ES2023, while `Object.groupBy()` was introduced as part of ES2024.

Two possible solutions were identified.

## Option 1 — Upgrade METIS frontend environment to ES2024

The first option is to upgrade the frontend environment from ES2023 to ES2024, allowing the native `Object.groupBy()` method to be used.

### Benefits

- Uses a native JavaScript API maintained by the language standard and runtime vendors.
- Reduces the amount of custom application code.
- Provides access to other ES2024 functionality.

### Concerns

However, this introduces several concerns:

- The upgrade would expand the scope of Phase 3 beyond the original requirement.
- The change would primarily exist to support a single utility method.
- Increasing the minimum supported JavaScript environment may impact browser compatibility.
- Additional tooling or dependency changes may be required across METIS, such as build tooling configuration.

METIS prioritises:

- Performance
- Responsiveness
- Microservice separation
- Operational resilience
- Decoupling by design
- Compatibility

Upgrading the environment would introduce a wider compatibility consideration that is disproportionate to the problem being solved.

## Option 2 — Implement an internal grouping helper

The second option is to implement a METIS-owned grouping helper that provides equivalent behaviour to `Object.groupBy()`.

### Benefits

- Avoids increasing the minimum supported JavaScript environment.
- Maintains compatibility with existing browser targets.
- Keeps the implementation controlled within METIS.
- Allows the behaviour to be isolated and tested.

The disadvantage is that METIS becomes responsible for maintaining the implementation rather than relying on the native JavaScript API.

Any security or maintenance concerns introduced by the helper will be addressed through code review, testing, and future vulnerability assessments.

---

# Decision

METIS will implement an internal grouping helper rather than adopting the native JavaScript `Object.groupBy()` method.

The ES2024 environment upgrade has been rejected because the required functionality does not justify the wider compatibility, tooling, and maintenance implications.

This decision keeps the frontend environment stable while maintaining consistency with METIS architectural principles.

---

# Consequences

## Positive

- No runtime dependency on ES2024 APIs.
- Maintains existing browser compatibility targets.
- Keeps architecture consistent with METIS design principles.
- Allows grouping behaviour to be isolated and unit tested.
- Avoids unnecessary environment upgrades.

---

## Negative

- Additional application code is required.
- METIS becomes responsible for maintaining the grouping implementation.
- Introduces a small amount of abstraction compared to using the native API.

---

## Neutral / Future Considerations

Future METIS environment upgrades may make this implementation redundant if ES2024 becomes an adopted standard within the application.

At that point, the internal helper can be reviewed and potentially replaced with the native `Object.groupBy()` implementation.

---

# Related Documents

- `people-page-architecture.md`
- `person-association-data-flow.mmd`
- `ADR-008-Relationship-Categorisation-Strategy.md`
- `ADR-009-Relationship-Presentation-Strategy.md`