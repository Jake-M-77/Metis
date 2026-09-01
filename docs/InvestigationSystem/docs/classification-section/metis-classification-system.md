# METIS Investigation Classification System

## 1. Purpose

The investigation system requires a classification mechanism to identify an categorise the offences associated with an investigation. 

The classification section will be a component within the Investigation workspace. It will allow investigators t oassign a primary classification and one or more secondary classifications to an investigation, alongside additional METIS-defined classification information such as Type, Categories and Keywords. 

The classification system will use government-provided offence classification data as reference data, while METIS-specific classification information will be managed seperately. 

---

## 2. Classification Section

The Classification section will be a component within the Investigation workspace rather than a modal. 

The section will contain:

- Type
- Primary classification
- Secondary classification(s)
- Categories
- Keywords

An investigation will have one primary classification.

An investigatiom may have multiple secondary classifications where additional offences are associated with the investigation. 

Both priamry and secondary classifications may result in automatic tasks being created by METIS.

---

## 3. Offence Classification Data

The government offence classification dataset will provide the authoritative offence classification information used by METIS.

The March 2026 dataset currently contains the following fields:

- Offence Type
- Offence Group
- Offence
- Offence Code
- Detailed Offence

These fields will be retained within the classification refewrence data and will be used when investigators search for and select an offence classification.

The classification data can be conceputally represented as: 

Offence Type
      │
      ▼
Offence Group
      │
      ▼
Offence
      │
      ├── Offence Code
      │
      └── Detailed Offence

The exact structure of the source dataset may change when updated government datasets are released.

---

## 4. Classification Selection

Classifications will be selected through a modal window opened from the Classification section. 

The modal will allow an investigator to search for an offence classification using information cotnained within the government classification dataset. 

The available search fields will correspond to the information provided by the reference dataset, including: 

- Offence Type
- Offence Group
- Offence
- Offence Code 
- Detailed Offence

As the investigator provides search information, the results list will be dynamically updated to display matching classifications.

Conceptually: 

Classification Section
      │
      ▼
Add Classification
      │
      ▼
Classification Selection Modal
      │
      ▼
Enter Search Information
      │
      ▼
Matching classifications update
      │
      ▼
Select Classification
      │
      ▼
Add to Investigation

The same selection mechanism will be used when assigning the primary or a secondary classification.

---

## 5. Primary Classification

Each investigation will have a primary classification representing the main offence associated with the investigation. 

The selected government classification will be stored against the investigation within the METIS application database. 

The primary classification may also be used by METIS when determing whether automatic tasks should be created.

----

## 6. Secondary classifications

An investigation amy contain multiple secondary classifications

Secondary classifications represent additional offence associated with the investigation that are not the primary classification. 

There will be no fixed limit on the number of secondary classifications that can be associated with an investigation.

Secondary classifications may also be used by METIS when determining whether automatic tasks should be created.

Conceptually:

Investigation
      │
      ├── Primary Classification
      │
      └── Secondary Classifications
            ├── Classification
            ├── Classification
            └── ...

----

## 7. METIS Classification Type

The classification section will contain a Type value which is controlled by METIS rather than the government offecne classification dataset. 

The available Type values will be defined by METIS and may change as the system develops. 

The exact values are therefore not defined within this document. 

---

## 8. Categories

The classification section will support METIS-defined categories

Categories will be selected from a predefined set of values rather than entered as free text.

Categories are separate from the government offence classification data and are intended to provide additional classification information for METIS.

The exact categories will be defined separately. 

---

## 9. Keywords

The classification section will support METIS-defined keywords

Ketwords will be selected from a predefined set of values rather than entered as free text. 

Ketwords provide additional information which can be used to identify and group investigations.

For example, an investigation could have keywords such as: 

- Common Assault 
- Public Place

Keywords may subsequently be used when querying or reporting on investigations.

For example, METIS could generate an investigation report for a particular period containing all investigations associated with a specific keyword. 

Keywords are separate form the government offence classification dataset. 

---

## 10. Automatic Tasks

Classification may be used by METIS to determine whether an investigation requires specific tasks.

Both the priamry classification and second classifications may contribute to the creation of automatic tasks.

For exammple:

Investigation
      │
      ▼
Classification Added
      │
      ▼
METIS determines required task
      │
      ▼
Task created automatically
      │
      ▼
Assigned to appropriate investigator

The exact rules determine which classification generate which tasks will be defined separately when the task automation functionality is implemented. 

The classification system therefore needs to provide the selected classifications in a form that can be used by the task system.

---

## 11. Classification Reference Data

The government classification dataset will be treated as a refernece data. 

The source dataset will be downloaded and processed before being made available to METIS. 

The processing workflow will be:

Government Classification CSV
      │
      ▼
Python Processor
      │
      ▼
SQLite Database
      │
      ▼
Classification Reference Data
      │
      ▼
    METIS

A Python script will be responsible for processing the source CSV and creating the SQLite reference database. 

The SQLite database will contain the government classification data required by METIS. 

---

## 12. Classification Reference Database

The classification reference database will use SQLite.

The database will remain separate from the METIS PostgreSQL application database and will be provided to METIS as reference data within the METIS docker environment.

The reference database will be read-only from the perspective of the METIS application.

Conceptually: 

METIS Docker Environment
      │
      ├── PostgreSQL
      │     └── METIS application data
      │
      └── SQLite
            └── Classification reference data

SQLite is appropriate for this dataset because the government classification data is relatively small, static reference data and does not require a dedicated relational database server. 

---

## 13. Querying Classification Data

METIS qill query the SQLite classification reference database when an investigator searches for a classification. 

Prisma will be used by METIS to interact with the SQLite database. 

Queries should be able to use the fields provided by the government dataset, allowing classifications to be located using information such as:

- Offence Type
- Offence Group
- Offence
- Offence Code 
- Detailed Offence

The selected classification will then be associated with the invesitigation within the METIS PostgreSQL database.

METIS does not need to copy the entire govermnemt classification dataset into PostgreSQL. 

Investigator
      │
      ▼
Classification Search
      │
      ▼
METIS
      │
      ▼
SQLite Classification Reference DB
      │
      ▼
Matching Classifications
      │
      ▼
Investigator selects classification
      │
      ▼
METIS PostgreSQL
      │
      ▼
Investigation Classification

---

## 14. Data Separation

The classification system separates government reference data from METIS application data.

The government dataset provides the authoritative offence classification information. 

METIS provides:

- Classification Type
- Categories
- Keywords
- Relationships between classifications and investigations
- Task automation rules associated with classifications

This separation allows the government classifcation data to be updated independantly of the METIS application data.

If a new government classifcation dataset is released, the SQLite reference database can be regenerated without requiring the existing METIS investigation database to contain the complete reference dataset. 