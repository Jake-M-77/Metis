# ADR-020: Investigation Binary File Storage

## Status

Accepted

---

# Context

METIS Investigations require storage for binary files such as PDFs, images, Office documents, text files, audio, video and other potentially large files.

MongoDB is responsible for storing the Investigation and its associated document metadata, but the actual binary contents should remain outside MongoDB. A dedicated storage solution is therefore required for the physical file data.

The storage solution must:

* support large files and multipart uploads
* support common object-storage operations such as upload, download and deletion
* provide encryption at rest and encryption in transit
* provide suitable file integrity and checksum mechanisms
* support lifecycle management and future storage tiering
* allow deleted files to be retained separately for a defined recovery period
* support periodic backup and recovery
* run locally during development
* operate within the Docker/containerised METIS architecture
* scale beyond a single development instance
* provide an API that can be consumed by the METIS backend
* keep storage credentials and direct storage access away from normal users
* minimise vendor lock-in
* allow the underlying storage implementation to be replaced without requiring significant changes to the METIS application

Four storage approaches were considered:

1. Cloud object storage such as Amazon S3 or Azure Blob Storage.
2. Self-hosted object storage such as SeaweedFS, RustFS, MinIO and Ceph.
3. Traditional filesystem or NAS-based storage.
4. Application-level storage services such as Supabase Storage.

Traditional filesystem/NAS storage does not provide the object-storage interface and portability required by METIS and would create stronger coupling to the underlying infrastructure.

Application-level storage services such as Supabase Storage provide useful functionality and S3 compatibility, but introduce additional application-level storage metadata and authorisation infrastructure. METIS already owns its authentication, authorisation and Investigation metadata, making much of this functionality unnecessary for the current architecture.

Several self-hosted object-storage solutions were considered. MinIO was not selected because its former open-source Community Edition repository was archived in April 2026 and the project's current direction no longer aligns with the requirements for a maintained open-source storage platform.

Garage was not selected because its current capabilities do not provide the required server-side encryption model.

Ceph provides extensive object-storage capabilities but introduces a level of operational complexity that is disproportionate to the current requirements of METIS.

SeaweedFS provides an S3-compatible object-storage API, Docker support, large-file support, multipart uploads, lifecycle functionality, checksums and server-side encryption. It is also licensed under Apache-2.0.

An additional long-term consideration is the possibility of developing a proprietary METIS storage daemon. This is not currently practical because the required development time and knowledge are not yet available. The architecture should therefore avoid preventing such a system from being introduced in the future.

---

# Decision

METIS will use **S3-compatible object storage as the architectural model for storing Investigation binary files**.

**SeaweedFS will be used as the initial object-storage implementation.**

METIS application code will not be directly coupled to SeaweedFS-specific functionality. Instead, the backend will use a storage abstraction with a provider-specific adapter.

The intended architecture is:

```text
METIS API
    │
    ▼
File Storage Abstraction
    │
    ▼
Storage Adapter
    │
    ▼
S3-Compatible Object Storage
    │
    ▼
SeaweedFS
```

The storage abstraction will contain only the operations required by METIS. SeaweedFS-specific implementation details will remain inside the storage adapter.

This allows the underlying implementation to be changed in the future without changing the Investigation or application layers.

Potential future implementations may include:

```text
File Storage Abstraction
    ├── S3 Adapter
    │     ├── SeaweedFS
    │     └── Amazon S3
    │
    ├── Azure Blob Adapter
    │
    └── Custom Storage Adapter
          └── Future METIS Storage Daemon
```

Traditional filesystem/NAS storage will not be used as the primary storage architecture.

Supabase Storage will not be introduced as an additional storage abstraction layer because METIS already owns its application authentication, authorisation and Investigation metadata.

A future proprietary storage daemon is not part of the current implementation and will only be considered when the technical requirements, development time and knowledge required to build and maintain it are available.

---

# Consequences

## Positive

* Investigation binaries are separated from MongoDB, keeping MongoDB focused on Investigation and document metadata.
* METIS gains a standard object-storage architecture rather than being tied to a local filesystem.
* SeaweedFS can be run locally through Docker during development.
* The system can support large files and multipart uploads.
* Object storage can be scaled independently from the METIS application.
* Encryption, integrity and lifecycle functionality can be handled at the storage layer.
* The METIS backend remains independent of SeaweedFS-specific implementation details.
* Cloud or alternative self-hosted storage can be introduced later through additional adapters.
* A future proprietary storage daemon can replace SeaweedFS without requiring the Investigation architecture to be redesigned.
* Storage credentials and direct storage access can remain behind the METIS backend.
* The architecture avoids introducing an unnecessary second application-level authorisation and metadata system.

---

## Negative

* SeaweedFS introduces an additional infrastructure component that must be deployed, monitored and maintained.
* The storage abstraction introduces additional backend complexity compared with directly using a storage provider.
* S3 compatibility does not guarantee identical functionality between all storage providers, meaning provider-specific adapters or handling may be required.
* Production deployments will require appropriate redundancy, backup, monitoring and recovery procedures.
* Storage lifecycle and deleted-file recovery will require additional implementation and operational configuration.
* A future custom storage daemon would introduce significant development, testing, maintenance and operational responsibilities.

---

## Neutral / Future Considerations

* The physical organisation of objects, buckets, object keys and Investigation/document identifiers will be defined separately.
* Backup and recovery architecture will be designed separately from the storage abstraction.
* Deleted-file/ghost storage and its retention period will be defined during the storage lifecycle design.
* Production storage tiering and lifecycle policies may be introduced where appropriate.
* Advanced evidence requirements such as immutable storage, legal holds and chain-of-custody workflows are not required by the current architecture and will be considered separately if required in the future.
* The future proprietary METIS storage daemon remains a possible long-term implementation but is not currently committed to.
* SeaweedFS-specific administration interfaces may be used by system administrators, but normal METIS users will interact with files through the METIS application and API.

---

# Related Documents

None at this time