# ADR-017: Investigation Reference Generation

## Status

Accepted

---

# Context

Every Investigation requires both a technical identity and a human-readable reference.

The technical identity needs to be suitable for database and application use, while the human-readable reference needs to be suitable for investigators, searching, communication, and operational use.

Using a UUID as the only visible identifier would make normal Investigation use unnecessarily difficult for users.

The human-readable Investigation Reference also needs to be sequential and must not produce duplicate numbers when multiple Investigations are created concurrently.

The reference number must not be consumed when Investigation creation fails.

The Investigation Reference is not required to create the initial MongoDB Investigation document because the UUID provides the technical identity.

A separate mechanism is therefore required to maintain sequential human-readable reference counters.

---

# Decision

Each Investigation will have:

* A UUID as its technical identity.
* A human-readable Investigation Reference for user-facing and operational use.

The Investigation Reference will conceptually follow:

```text
Force Number / Investigation Number / Year
```

For example:

```text
1234/0042/2026
```

Reference counters will be maintained in a dedicated SQLite database.

Reference generation will occur server-side and will use locking/serialisation to prevent race conditions and duplicate numbers.

Investigation creation will follow this conceptual process:

```text
Generate UUID
      ↓
Create MongoDB Investigation
Reference = placeholder
      ↓
MongoDB succeeds
      ↓
Generate Investigation Reference
      ↓
Update MongoDB with actual Reference
      ↓
Create PostgreSQL representation
```

The MongoDB document is therefore intentionally written twice during initial creation.

This approach avoids reserving or rolling back human-readable reference numbers.

A failed MongoDB creation does not consume an Investigation Reference number.

Once a number has been successfully allocated, that number will never be reused.

The approach of generating and reserving a reference before MongoDB creation, followed by rollback if creation fails, will be avoided.

---

# Consequences

## Positive

* Investigations have a reliable technical identity through UUIDs.
* Users have a human-readable Investigation Reference.
* References remain sequential.
* Concurrent requests cannot generate duplicate references.
* Failed Investigation creation does not consume a reference number.
* Reference generation is independent of PostgreSQL.
* SQLite can potentially support counters for other METIS reference types.
* No reference reservation or rollback mechanism is required.

---

## Negative

* Initial Investigation creation requires two MongoDB writes.
* SQLite becomes an additional operational dependency.
* Reference generation requires locking/serialisation.
* The reference-generation process adds another step to Investigation creation.

---

## Neutral / Future Considerations

* Exact SQLite counter schema is an implementation decision.
* Exact locking mechanism is an implementation decision.
* Exact Force Number configuration remains to be defined.
* Exact formatting and padding rules remain to be defined.
* SQLite deployment, backup, and recovery requirements remain to be defined.
* Other METIS entities may use the same reference-counter mechanism.

---

# Related Documents

None at this time