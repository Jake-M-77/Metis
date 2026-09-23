# ADR-018: Investigation Persistence Failure Recovery

## Status

Accepted

---

# Context

Investigation persistence spans MongoDB and PostgreSQL.

MongoDB stores the complete Investigation and is the source of truth for Investigation-owned data.

PostgreSQL stores the metadata and relationships required by wider METIS.

The normal initial persistence flow therefore involves MongoDB being successfully written before the PostgreSQL representation is created.

This introduces the possibility of partial persistence.

For example:

```text
MongoDB = Success
PostgreSQL = Failure
```

Without a dedicated recovery mechanism, this could leave MongoDB and PostgreSQL inconsistent.

Persistence failures also need to be distinguishable from normal Investigation business data.

The system therefore requires a separate operational mechanism for recording failures, retrying failed operations, and identifying failures that require intervention.

The user must also be made aware when an Investigation Save has not completed successfully, and the appropriate operational team must be able to identify the failure.

---

# Decision

A separate SQLite database will be used to record Investigation persistence failures.

The failure store will contain operational information including:

* Investigation Reference
* Failure Type
* Time of Failure
* Processing State
* Relevant Diagnostic Information
* Data Being Changed, where applicable
* Retry Attempts

When a persistence operation fails, the failure will be recorded and the system will attempt to retry the operation.

Conceptually:

```text
Persistence Failure
       ↓
SQLite Failure Record
       ↓
Retry
       ↓
Success → Resolve
       ↓
Repeated Failure
       ↓
Timeout / Requires Intervention
```

If MongoDB fails during initial creation, the PostgreSQL Investigation representation will not be created.

If MongoDB succeeds but PostgreSQL fails, the failure will be recorded and recovery will be attempted.

The failure store will remain separate from Investigation business data.

The system will notify the user when a Save cannot be completed successfully and provide operational visibility for the responsible team.

The approach of silently ignoring persistence failures will be avoided.

---

# Consequences

## Positive

* Persistence failures become explicitly detectable.
* Failed operations can be retried.
* MongoDB/PostgreSQL inconsistencies can be identified and recovered.
* Operational failure information is kept separate from Investigation data.
* Users are informed when their Save has not completed successfully.
* Operational teams can identify Investigations requiring intervention.
* Diagnostic information can be retained for troubleshooting.

---

## Negative

* A separate SQLite operational database is introduced.
* Persistence requires additional failure-handling logic.
* Retry processing introduces additional backend complexity.
* The failure-handling mechanism itself becomes another operational dependency.
* Partial persistence can still occur temporarily while recovery is in progress.

---

## Neutral / Future Considerations

* Exact retry intervals remain an implementation decision.
* Maximum retry attempts remain an implementation decision.
* Timeout thresholds remain an implementation decision.
* Exact processing states remain to be defined.
* Alerting mechanisms remain to be defined.
* Failure retention and cleanup remain to be defined.
* A reconciliation mechanism may be introduced later.
* Reconciliation should focus on PostgreSQL-relevant Investigation data rather than comparing the complete MongoDB document.

---

# Related Documents

None at this time
