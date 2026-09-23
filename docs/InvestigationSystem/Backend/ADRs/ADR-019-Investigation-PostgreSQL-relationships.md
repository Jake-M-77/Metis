# ADR-019: Investigation PostgreSQL Relationships

## Status

Accepted

---

# Context

MongoDB stores the complete Investigation and is the source of truth for Investigation-owned data.

PostgreSQL is responsible for the wider METIS representation of Investigations, including the relationships required to discover Investigations through other METIS records.

Investigations can be associated with wider METIS records such as:

* People
* Vehicles
* Organisations
* Locations

Wider METIS needs to be able to search these relationships.

For example:

```text
Person P-123
      ↓
PostgreSQL
      ↓
Investigation References
      ↓
MongoDB
      ↓
Complete Investigations
```

The PostgreSQL representation must therefore contain enough information to establish these associations without duplicating the complete Investigation.

Classification has a different requirement. Wider METIS needs to search Investigations by classification, but classification does not require a relationship to another METIS entity.

---

# Decision

PostgreSQL will contain minimal Investigation relationship data required for wider METIS discovery.

The relationship will conceptually contain:

```text
Investigation Reference
Related METIS Record ID
Relationship-specific information
```

where applicable.

The following relationships will be represented:

### Investigation ↔ Person

```text
Investigation Reference
Person ID
Role
```

### Investigation ↔ Vehicle

```text
Investigation Reference
Vehicle ID
Role
```

### Investigation ↔ Organisation

```text
Investigation Reference
Organisation ID
Role
```

### Investigation ↔ Location

```text
Investigation Reference
Location ID
```

The complete Investigation-owned data remains in MongoDB.

The PostgreSQL relationships exist only to allow wider METIS to discover and navigate to associated Investigations.

Classification will **not** use a separate Investigation ↔ Classification relationship.

Classification will remain a column on the PostgreSQL Investigation representation so that wider METIS can search Investigations directly by classification.

The approach of duplicating complete Investigation data into PostgreSQL relationships will be avoided.

---

# Consequences

## Positive

* PostgreSQL contains only the minimum data required for wider Investigation discovery.
* Wider METIS can search Investigations through People, Vehicles, Organisations, and Locations.
* Investigation data remains owned by MongoDB.
* Relationship data remains simple and focused.
* Classification can be searched directly without an unnecessary relationship structure.
* The existing Investigation linking architecture is preserved.
* PostgreSQL does not become a second copy of the Investigation.

---

## Negative

* Investigation relationships span PostgreSQL and MongoDB.
* PostgreSQL relationship data must remain consistent with deliberate linking actions.
* Additional PostgreSQL relationship structures are required.
* Searching wider METIS and opening an Investigation involves the two database responsibilities working together.

---

## Neutral / Future Considerations

* Exact PostgreSQL table structure remains an implementation decision.
* Exact primary and foreign key design remains to be defined.
* Exact indexes remain to be defined.
* Exact role representation remains to be defined.
* Relationship creation and update behaviour will be addressed during implementation.
* Document relationships will only be added if a demonstrated wider METIS requirement exists.
* Classification remains a PostgreSQL Investigation column rather than a relationship.

---

# Related Documents

None at this time
