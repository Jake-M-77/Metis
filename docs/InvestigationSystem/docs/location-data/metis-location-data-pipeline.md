# METIS Location Data System

## 1. Purpose

We are currently working on the Investigation system for METIS. As part of this system, location data will be required for investigations.

The location data will be sourced from multiple sources. Address information will be obtained from an external address source, while geographical information will be derived from ONS datasets.

The purpose of this system is to process and combine this data so that it can be used by METIS.

---

## 2. Location Data Requirements

To meet METIS requirements, the following location data needs to be obtained:

- Door Number / House Name
- Building Name
- Street Name
- Town / City
- County
- Postcode
- Police Force
- Managing Team within that Police Force *(This could change)*
- Ward
- Parish
- District
- Latitude
- Longitude
- Easting
- Northing
- OS Grid Reference
- UPRN
- W3W
- Location / Object Reference
- Landmark / Place Name
- Description

---

## 3. Data Sources

### Provided by the external address source:

- Door Number / House Name
- Building Name
- Street Name
- Postcode

### Provided by ONS datasets:

- County
- Postcode
- Police Force
- Ward
- Parish
- District
- Latitude
- Longitude
- Easting
- Northing
- OS Grid Reference
- UPRN
- Location / Object Reference
- Landmark / Place Name

### Provided by METIS:

- Managing Team within that Police Force *(This could change)*

### Provided by other external data sources:

- W3W

---

## 4. ONS Data Processing

The ONS data will be processed using a Python script. The processing workflow will use two separate SQLite databases: one for the raw ONS datasets and one for the processed postcode geography data.

### Processing Workflow

ONS source CSVs
      │
      ▼
Python processor
      │
      ▼
ons-source-data.db
      │
      ▼
Code matching
      │
      ▼
Validation
      │
      ▼
postcode-geography.db
      │
      └── postcode_geography

The Python processor will first import each ONS dataset into its own SQLite table within `ons-source-data.db`. These tables will retain the raw ONS data and will be used as reference data during the processing stage.

The ONSPD dataset will be used as the primary source for postcode-level records. For each postcode, the processor will extract the relevant geographical codes from the ONSPD dataset.

These codes will then be matched against the corresponding ONS reference tables within `ons-source-data.db` to obtain the associated geographical names and information.

For example, when processing a West Midlands postcode such as `B9 5SS`, the ONSPD dataset may provide the Police Force Area code `E23000014`. This code will then be matched against the Police Force Area dataset, which will return the corresponding Police Force, in this case West Midlands Police.

The same process will be performed for the other required geographical codes, such as Ward, Parish, District and County.

Once the processing and validation has been completed, the resulting postcode-level data will be written to a separate SQLite database named `postcode-geography.db`. The processed data will be stored in a table named `postcode_geography`.

### ONS Data Processing Diagram

The following diagram illustrates the ONS data processing workflow:

[ONS Data Processing Pipeline](metis-data-processing-pipeline-diagram.mmd)

---

## 5. Database Structure

The ONS data processing system will use two separate SQLite databases.

### Raw ONS Database

The `ons-source-data.db` database will contain the raw ONS datasets imported from their respective CSV files. Each ONS dataset will be stored in its own SQLite table.

ons-source-data.db
      │
      ├── ONSPD
      ├── Wards
      ├── LADs
      ├── Parishes
      ├── Counties
      ├── Police Force Areas
      └── ...

This database is used exclusively as the source data for the Python processing pipeline and will not be required by METIS.

### Processed Geography Database

The `postcode-geography.db` database will contain only the processed postcode geography data required by METIS.

postcode-geography.db 

└── postcode_geography

The `postcode_geography` table will contain the processed postcode-level information produced from the ONS datasets.

The processed database will remain a SQLite database when deployed alongside METIS. It will be used as a read-only reference dataset and will not form part of the METIS PostgreSQL application database.

This separation means that the raw ONS datasets do not need to be included within the METIS deployment.

---

## 6. METIS Location Database

Once the `postcode-geography.db` database has been generated, it will be made available to METIS as a read-only SQLite reference database.

The database will remain separate from the METIS application database and will not be directly connected to the METIS PostgreSQL database.

When required, METIS will query the `postcode_geography` table within the `postcode-geography.db` database and combine the returned geographical information with data obtained from the external address source and any other relevant sources.

The resulting location data will then be saved to the METIS PostgreSQL `LOCATION` table.

This creates a clear separation between reference data and application data:

postcode-geography.db
      │
      │ read-only reference data
      ▼
METIS application
      │
      │ combined location data
      ▼
PostgreSQL LOCATION table
      │
      │ application data
      ▼
Investigation

The `postcode-geography.db` database is therefore a reference dataset used by METIS, while the PostgreSQL `LOCATION` table contains the actual locations known to METIS.

---

## 7. Location Lookup Flow

The following process will be used when a user searches for a location using a postcode.

User enters postcode
        ↓
Search METIS Location DB
        ↓
Location exists?
    ┌───┴───┐
   YES      NO
    │        │
    │      Address source
    │        ↓
    │    Address results
    │        ↓
    │    ONS geography lookup
    │        ↓
    │    Combine data
    │        ↓
    │    Save locations
    │        │
    └────────┘
         ↓
   Return locations

- If the requested location already exists within the METIS PostgreSQL `LOCATION` table, the existing location data will be returned.
- If the requested location does not exist, METIS will query the external address source to obtain the relevant address information.
- The postcode will then be used to query the `postcode_geography` table within the `postcode-geography.db` SQLite database to obtain the corresponding geographical information.
- The address and geographical data will then be combined and saved as a new location within the METIS PostgreSQL `LOCATION` table.

Future searches for the same location can therefore be fulfilled directly from the METIS `LOCATION` table without requiring the external address source or the `postcode-geography.db` reference database to be queried again.

### Location Lookup Diagram

The following diagram illustrates the location lookup workflow within METIS:

[Location Lookup Flow](metis-location-lookup-diagram.mmd)



