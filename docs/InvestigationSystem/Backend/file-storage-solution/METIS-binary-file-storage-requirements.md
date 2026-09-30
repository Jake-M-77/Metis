## METIS file-storage requirements

| Requirement                | METIS decision                                               |
| -------------------------- | ------------------------------------------------------------ |
| Storage model              | **Object storage**                                           |
| Application integration    | **API-based**                                                |
| Direct storage UI          | **No** — METIS controls the upload/download operations       |
| Runtime                    | **Docker/containerised**                                     |
| Application ecosystem      | **TypeScript/JavaScript**                                    |
| Scalability                | **Required**                                                 |
| Large files                | **Required**                                                 |
| Application access control | **Handled centrally by METIS API**                           |
| Encryption in transit      | **Required**                                                 |
| Encryption at rest         | **Required**                                                 |
| Object versioning          | **Not required**                                             |
| Normal deletion            | Authorised users through METIS                               |
| Deleted objects            | Retained for **30 days** as inaccessible "ghost" storage     |
| Permanent deletion         | System/admin process after retention period                  |
| Normal retention           | Files generally remain indefinitely                          |
| Lifecycle management       | Primarily deletion/retention rather than automatic archival  |
| Reliability                | Must tolerate storage/infrastructure failures appropriately  |
| Backup                     | **Separate backup copy**                                     |
| Replication                | Main storage + independent backup                            |
| Local development          | **Required**                                                 |
| Production                 | Should be deployable on cloud/on-prem/managed infrastructure |
| Compatibility              | Prefer **S3-compatible/common object-storage API**           |
| Operational complexity     | Keep it relatively simple                                    |
| Cost                       | Must work locally without cloud costs                        |
| Vendor lock-in             | **Minimise**                                                 |
| Future evidence features   | Don't build them prematurely                                 |
| File types                 | Should support arbitrary/varied binary files                 |
