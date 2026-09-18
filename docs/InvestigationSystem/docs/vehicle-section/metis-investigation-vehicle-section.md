# METIS Investigation Vehicle Section

## 1. Purpose

The Investigation system contains a dedicated Vehicle section for recording and managing vehicles associated with an investigation.

A vehicle associated with an investigation may have different significance depending on the circumstances of the investigation. The initial vehicle statuses / roles are:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

Different statuses / roles provide different information within the Vehicle Overview, while common vehicle information is available regardless of the selected status.

The purpose of this research is to define the structure of the Vehicle section, including:

* The information that should be recorded for a vehicle.
* The statuses / roles that a vehicle can have within an investigation.
* The information and functionality associated with each status / role.
* The workflows associated with vehicles that are found, recovered or removed.
* The dynamic investigative information that can be recorded against a vehicle.
* The distinction between common vehicle information and status-specific information.

---

## 2. Vehicle Statuses / Roles

A vehicle associated with an investigation will have a defined status / role representing its significance within the investigation.

The initial user-selectable vehicle statuses / roles are:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

The selected status / role determines which additional vehicle-specific information and functionality is available.

Some vehicle statuses are not directly selectable when adding a vehicle. These statuses represent subsequent events in the vehicle's investigation lifecycle.

The current system statuses are:

* Found
* Recovered
* Removed

The initial vehicle selection process is:

```text
Vehicles

    │

    ▼

Add Vehicle

    │

    ▼

Select Vehicle Status / Role

    │

    ├── Stolen

    │
    ├── Damaged
    │
    ├── Used in Incident
    │
    ├── Suspect
    │
    └── Attacked

            │

            ▼

      Vehicle Overview
```

Additional statuses / roles may be introduced in the future where required.

---

## 3. Vehicle Overview

Each vehicle associated with an investigation will be displayed through a Vehicle Overview.

The Vehicle Overview provides the navigation and working area used to manage information relating to that vehicle.

The Vehicle Overview will consist of:

* Vehicle Navigation
* Dynamic Working Area

The Vehicle Navigation will provide access to the common vehicle information and any additional sections applicable to the vehicle's current status / role.

The Dynamic Working Area will display the component associated with the section selected within the Vehicle Navigation.

Conceptually:

```text
Vehicle Overview

    │

    ├── Vehicle Navigation

    │

    └── Dynamic Working Area

            │

            └── Selected Section Component
```

The exact implementation used to provide the Vehicle Overview and its dynamic sections is outside the scope of this research.

---

## 4. Common Vehicle Information

All vehicles associated with an investigation will provide a common set of information used to identify and describe the vehicle.

The common vehicle information is:

| Information                 | Purpose                                                              |
| --------------------------- | -------------------------------------------------------------------- |
| **Registration**            | Record the vehicle registration where known.                         |
| **Registration Knowledge**  | Identify whether the full or only part of the registration is known. |
| **Make**                    | Identify the vehicle manufacturer.                                   |
| **Model**                   | Identify the vehicle model.                                          |
| **Type**                    | Identify the general type of vehicle.                                |
| **Colour**                  | Record the vehicle's colour.                                         |
| **Distinguishing Features** | Record additional physical or identifying features of the vehicle.   |

### Registration

The vehicle should support the recording of a registration number.

The investigator should be able to indicate whether the registration is:

* Full
* Partial

This allows vehicles to be recorded where the complete registration is not known.

### Make and Model

The vehicle make and model will be selected through a dedicated make / model selection modal.

The Make and Model fields displayed within the Vehicle Overview will not be directly editable.

The process is:

```text
Vehicle

    │

    ▼

Make / Model

    │

    ▼

Make / Model Selection Modal

    │

    ├── Select Make

    │

    └── Select Model

            │

            ▼

    Make / Model fields populated
```

The available make and model information will be maintained as reference data.

The current proposed source for this reference data is a suitable government vehicle dataset, such as a CSV containing vehicle makes and models. The data can be processed to remove duplicates and stored locally within a SQLite database for use by METIS.

### Type

The vehicle type will be recorded as part of the common Vehicle information.

The initial vehicle types include:

* Car
* HGV
* Agricultural
* Other

The vehicle type does not currently change the information or fields displayed within the Vehicle Overview.

Vehicle-specific characteristics that do not require a dedicated field can instead be recorded within Distinguishing Features.

### Colour

The vehicle colour will be selected from a predefined list.

The list will include an:

* Other

option for circumstances where the vehicle's colour is not represented by the available options.

### Distinguishing Features

Distinguishing Features is a common section available for every vehicle regardless of its status / role.

The section provides a way of recording physical or other identifying characteristics that are specific to the vehicle.

Examples include:

```text
OSF wheel kerbed
```

Multiple distinguishing features can be recorded.

The section therefore allows additional feature entries to be added where required.

Examples of information that may be recorded include:

* Damage or marks that help identify the vehicle.
* Modifications.
* Unusual vehicle characteristics.
* Accessories or attachments.
* Other distinguishing physical features.

The exact implementation of the multiple-entry functionality will be determined during implementation.

---

## 5. Vehicle Information

The Vehicle Information area provides the common information used to identify the vehicle.

The information available within this area includes:

* Registration
* Registration Knowledge
* Make
* Model
* Type
* Colour
* Distinguishing Features

The common Vehicle information is available regardless of whether the vehicle is:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

Status-specific information is displayed separately through dynamic sections.

---

## 6. Status-Specific Vehicle Information

Individual vehicle statuses / roles provide additional dynamic sections containing information relevant to the selected status.

These sections are displayed in addition to the common Vehicle information.

### 6.1 Stolen

A vehicle marked as Stolen will provide a dynamic section containing information relating to the theft.

The theft circumstance will be selected from a list of available options.

The options are recorded as complete circumstances, for example:

* Stolen - Keys not taken
* Stolen - Keys taken

The list is not exhaustive and additional theft circumstances may be added as required.

A date will also be recorded in relation to the theft.

### Stolen Vehicle Save Workflow

When an investigation containing a Stolen vehicle is saved, an additional modal workflow will be displayed.

The workflow will collect:

* Force
* Area
* Vehicle action
* Foreign vehicle

The Force and Area identify the part of the police force responsible for the vehicle.

For example:

```text
Force: Essex Police
Area: Harlow
```

The vehicle action will be selected from a dropdown list.

The current options include:

* Seize and Destroy
* Seize and Retain
* Seize and Use for Evidence

The list is not exhaustive and additional actions may be added where required.

The Foreign Vehicle field will allow the investigator to select:

* Yes
* No

The Stolen vehicle save workflow is intended to collect information required when processing a stolen vehicle within the investigation.

---

### 6.2 Damaged

A vehicle marked as Damaged will provide an additional dynamic section containing an optional text box.

The text box allows the inputter to record vehicle-specific information concerning the damage.

For example:

```text
Rear passenger window smashed.
```

The field is not mandatory.

The purpose of the field is to provide a location for vehicle-specific information where the main Investigation Summary already contains the wider circumstances of the damage.

The Damage section therefore provides additional context without requiring the same information to be duplicated as a mandatory requirement.

---

### 6.3 Used in Incident

A vehicle marked as Used in Incident will provide an additional dynamic section containing an optional text box.

The text box allows the inputter to record information about the vehicle's involvement in the incident.

For example:

```text
Suspects fled in vehicle.
```

The field is not mandatory.

The purpose of the field is to provide a separate location for vehicle-specific information where the main Investigation Summary already contains the wider circumstances of the incident.

---

### 6.4 Suspect

A vehicle marked as Suspect will provide an additional dynamic section containing an optional text box.

The text box allows the inputter to record information explaining why the vehicle is considered relevant or suspicious within the investigation.

For example:

```text
Vehicle seen driving around the area several times.
```

The field is not mandatory.

The purpose of the field is to provide a separate location for vehicle-specific investigative information where the main Investigation Summary already contains the wider circumstances.

---

### 6.5 Attacked

A vehicle marked as Attacked will provide an additional dynamic section containing an optional text box.

The text box allows the inputter to record information concerning how the vehicle was attacked, interfered with or otherwise targeted.

For example:

```text
Driver side door lock tampered with.
```

The field is not mandatory.

The purpose of the field is to provide a separate location for vehicle-specific information where the main Investigation Summary already contains the wider circumstances of the offence.

---

## 7. Vehicle Found Workflow

A vehicle may subsequently be identified as having been found after being associated with an investigation.

Found is not directly selectable when initially adding a vehicle. It represents an event that occurs during the vehicle's investigation lifecycle.

When a vehicle is marked as Found, a modal workflow will collect information about where and by whom the vehicle was found.

The Found workflow will collect:

* Where the vehicle was found.
* When the vehicle was found.
* Incident reference number.
* Who found the vehicle.

The person who found the vehicle will be selected through a dropdown.

The available options will include people already associated with the investigation.

Where the person who found the vehicle is not associated with the investigation, an option such as:

* Not within Investigation

will be available.

Selecting this option will display additional fields for:

* First name
* Last name
* Contact details

Conceptually:

```text
Vehicle

    │

    ▼

Found

    │

    ▼

Found Modal

    ├── Where Found

    ├── When Found

    ├── Incident Reference Number

    └── Found By

          │
          ├── Person within Investigation
          │
          └── Not within Investigation
                  │
                  ├── First Name
                  ├── Last Name
                  └── Contact Details

            │

            ▼

       Select next status

            │

            ├── Removed
            │
            └── Recovered
```

Following the Found workflow, the vehicle can be progressed to either:

* Removed
* Recovered

### Found Report

Once the vehicle has been marked as Found, a dynamic Vehicle section will display the recorded Found information.

This section is intended to provide a clear record of the circumstances in which the vehicle was found.

The Found Report will contain non-editable information including:

* Found by
* First name
* Last name
* Contact number / contact details
* Incident reference number

The Found By information will identify the type of person or organisation responsible for finding the vehicle, such as:

* Victim
* Witness
* Police
* Other

Additional reference numbers may also be displayed where another system has been used in connection with the vehicle being found.

The original incident reference number for the finding of the vehicle will remain part of the recorded Found information.

---

## 8. Removed Vehicle

Removed is a subsequent vehicle status used when a vehicle has been removed from the location where it was found without being brought into police custody.

Removed does not mean that the vehicle has been removed from the Investigation.

For example, a victim may find their stolen vehicle and subsequently take possession of it themselves.

When a vehicle is changed to Removed, a modal workflow will collect information about who removed the vehicle.

The person who removed the vehicle will be selected through a dropdown.

The available options will include people already associated with the investigation.

Where the person is not associated with the investigation, an option such as:

* Other

will allow the inputter to provide:

* First name
* Last name
* Phone number

Conceptually:

```text
Found

    │

    ▼

Removed

    │

    ▼

Removed Modal

    └── Removed By

          │
          ├── Person within Investigation
          │
          └── Other
                  │
                  ├── First Name
                  ├── Last Name
                  └── Phone Number

            │

            ▼

       Vehicle Overview
```

A dynamic section will then be displayed within the Vehicle Overview containing the recorded removal information.

The removal information is primarily intended for auditing purposes while also allowing investigators to contact the person who removed the vehicle if additional information is required.

---

## 9. Recovered Vehicle

Recovered is a subsequent vehicle status used where a vehicle has been recovered as part of the investigation.

Examples may include a vehicle being:

* Recovered abandoned.
* Recovered following a stop.
* Recovered by police.
* Recovered through another investigative activity.

When a vehicle is progressed to Recovered, an additional modal workflow will collect recovery information.

The recovery information will include:

* Date / time recovered
* Recovery operator
* Location the vehicle was recovered to
* Recovery reference number
* Recovery operator reference number, where applicable

The Recovery Reference Number can be used where the police force operates another system for recording vehicle recoveries.

The Recovery Operator Reference Number can be recorded where the recovery operator provides or uses their own reference number.

The proposed workflow is:

```text
Found

    │

    ▼

Recovered

    │

    ▼

Recovery Modal

    ├── Date / Time Recovered

    ├── Recovery Operator

    ├── Recovered To

    ├── Recovery Reference Number

    └── Recovery Operator Reference Number

            │

            ▼

       Vehicle Overview
```

Once the recovery information has been recorded, a dynamic Recovered section will appear within the Vehicle Overview containing the relevant recovery information.

---

## 10. Vehicle Lifecycle

The Vehicle lifecycle consists of an initial status / role followed by any applicable subsequent vehicle events.

Conceptually:

```text
Vehicle Added

    │

    ├── Stolen
    │
    ├── Damaged
    │
    ├── Used in Incident
    │
    ├── Suspect
    │
    └── Attacked

          │

          ▼

     Investigation Activity

          │

          └── Where applicable

                  │

                  ▼

                Found

                  │

          ┌───────┴────────┐
          │                │
          ▼                ▼
       Removed          Recovered
                           │
                           ▼
                    Recovery Information
```

Found therefore represents the point at which the vehicle has been located, after which the vehicle can be recorded as either Removed or Recovered depending on what happened to it.

---

## 11. Vehicle-Specific Investigative Information

The Vehicle Overview can contain additional dynamic investigative sections beyond the standard sections defined for the vehicle.

These sections provide a way of recording information that is specifically relevant to the vehicle but does not need to be part of the common Vehicle information or its initial status-specific section.

Potential examples include:

* CCTV observations.
* ANPR observations.
* Vehicle examination information.
* Additional damage information.
* Other vehicle-specific investigative observations.

Dynamic sections can therefore be added to the Vehicle Overview where additional vehicle-specific information needs to be recorded.

For example:

```text
Vehicle Overview

    │
    ├── Vehicle Information
    │
    ├── Distinguishing Features
    │
    ├── Status-Specific Section
    │
    ├── CCTV Observations
    │
    ├── ANPR Observations
    │
    └── Additional Dynamic Section
```

The specific additional dynamic sections will be determined during implementation based on the requirements identified at that stage.

Any additional functionality introduced during implementation will be documented as an amendment to the Vehicle Section requirements.

---

## 12. External / Reference Systems

External vehicle information sources may eventually be relevant to the Vehicle section.

A future implementation may allow an investigator to provide a vehicle registration number and use an external authoritative vehicle information source to automatically populate information such as:

* Make
* Model
* Type
* Colour
* Other available vehicle information

This functionality is intended as a potential future real-world implementation and is not required for the current METIS implementation.

The Vehicle section should also allow a vehicle to be searched for against the existing METIS database.

Where a matching vehicle record already exists within METIS, the existing vehicle record can be used when linking the vehicle to an investigation.

The use of external vehicle systems is therefore separate from the internal METIS vehicle record and will only be relevant if METIS is developed for real-world operational use.

---

## 13. Neutral / Future Considerations

* Additional vehicle statuses or roles may be introduced as the Investigation system develops.
* Additional theft circumstances may be added to the Stolen vehicle options.
* Additional vehicle actions may be added to the Stolen vehicle workflow.
* Additional vehicle-specific dynamic sections may be introduced where required.
* Future external integrations may provide authoritative vehicle information and reduce the amount of information investigators need to enter manually.
* The vehicle make and model reference data may be updated as the underlying reference dataset changes.
* Additional vehicle types may be introduced where required.
* The Vehicle lifecycle may be expanded if additional operational states are required.
* Amendments identified during implementation will be documented separately from this initial Vehicle Section research.

---

# Related Documents

* [ADR-014-Investigation-Vehicle-Workspace](ADR-014-Investigation-Vehicle-Workspace.md)

# Related Research

No additional related Vehicle research has currently been identified.
