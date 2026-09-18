# ADR-014: Investigation Vehicle Workspace

## Status

Accepted

---

# Context

The Investigation system requires a dedicated Vehicle section where investigators can create and view vehicles associated with an Investigation.

A vehicle may have different statuses or roles within an Investigation, such as:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

Additional system-driven statuses may also occur during the vehicle lifecycle, such as:

* Found
* Recovered
* Removed

Different vehicle statuses may require different information and functionality. Therefore, the Vehicle section cannot be treated as a single static view containing the same functionality for every vehicle.

When an investigator adds a vehicle, they must first select the initial status or role of the vehicle. The selected status determines the initial Vehicle Overview Component and the status-specific information available within the workspace.

The Vehicle Overview Component must provide a consistent workspace structure while allowing additional sections and functionality to be displayed as required by the vehicle's status and subsequent investigation activity.

---

# Decision

The Investigation Vehicle section will use a Vehicle Overview Component as the primary workspace for an individual vehicle.

The Vehicle Overview Component will consist of two areas:

1. Vehicle Navigation
2. Dynamic Working Area

The Vehicle Navigation will be displayed at the top of the **Vehicle Overview Component** and will contain the sections available for the selected vehicle.

The Dynamic Working Area will be displayed below the navigation and will load the component corresponding to the currently selected navigation section.

## Vehicle creation

When the investigator selects Add Vehicle (or the + action), a modal will be displayed allowing the investigator to select the initial status or role of the vehicle.

For the initial implementation, example statuses include:

* Stolen
* Damaged
* Used in Incident
* Suspect
* Attacked

The selected status determines the initial Vehicle Overview Component and the status-specific information available within it.

Conceptually:

```text
Investigation

      │

      ▼

Vehicles

      │

      ▼

Add Vehicle

      │

      ▼

Vehicle Status / Role Selection

      │

      ▼

Stolen / Damaged / Used in Incident /
Suspect / Attacked / ...

      │

      ▼

Vehicle Overview Component

      │

      ▼

Vehicle Navigation

      │

      ▼

Dynamic Working Area
```

## Vehicle selection

When an investigator selects a vehicle already displayed within the Investigation's Vehicles section, the corresponding Vehicle Overview Component will be loaded into the dynamic Investigation workspace.

The Vehicle Overview will therefore provide the following structure:

```text
Vehicle Overview

      │

      ├── Vehicle Navigation
      │
      └── Dynamic Working Area
            │
            └── Component determined by selected navigation section
```

## Common Vehicle Information

The Vehicle Overview will provide common vehicle information independently of the vehicle's status.

Common information includes:

* Registration
* Registration knowledge
* Make
* Model
* Type
* Colour
* Distinguishing Features

Registration knowledge will allow the investigator to indicate whether the full or only a partial registration is known.

Make and Model will be selected through a dedicated selection modal. Once selected, the Make and Model fields within the Vehicle Overview will display the selected values as non-editable fields.

Vehicle Type will initially include values such as:

* Car
* HGV
* Agriculture
* Other

Vehicle Type will not determine a different vehicle information structure. Characteristics specific to a particular vehicle type can instead be recorded through Distinguishing Features.

Distinguishing Features will be available for every vehicle and will support multiple entries.

For example:

```text
Distinguishing Feature

OSF wheel kerbed

[ + Add distinguishing feature ]
```

Common vehicle information is therefore available regardless of whether the vehicle is Stolen, Damaged, Used in Incident, Suspect, Attacked, Found, Recovered, or Removed.

## Status-specific functionality

The Vehicle Overview will support sections specific to the vehicle's current status or role.

### Stolen

A Stolen vehicle will have a dynamic section containing:

* Theft circumstance
* Date

Theft circumstances will represent complete circumstances, for example:

* Stolen - Keys not taken
* Stolen - Keys taken

Additional theft circumstances may be introduced in the future.

When an Investigation containing a Stolen vehicle is saved, an additional modal will collect:

* Force
* Area
* Vehicle action
* Foreign Vehicle

Force and Area identify the part of the police force responsible for the vehicle.

Vehicle Action will initially include:

* Seize and Destroy
* Seize and Retain
* Seize and Use for Evidence

Additional vehicle actions may be introduced in the future.

Foreign Vehicle will provide a Yes / No selection.

### Damaged

A Damaged vehicle will have a dynamic section containing an optional text field for vehicle-specific damage information.

For example:

```text
Rear passenger window smashed.
```

General investigation information can continue to be recorded within the Investigation Summary, while this section provides a dedicated location for vehicle-specific damage information.

### Used in Incident

A Used in Incident vehicle will have a dynamic section containing an optional text field for vehicle-specific information.

For example:

```text
Suspects fled in vehicle.
```

### Suspect

A Suspect vehicle will have a dynamic section containing an optional text field for vehicle-specific information.

For example:

```text
Vehicle seen driving around the area several times.
```

### Attacked

An Attacked vehicle will have a dynamic section containing an optional text field for vehicle-specific information.

For example:

```text
Driver side door lock tampered with.
```

## Found workflow

Found is a system-driven subsequent vehicle status rather than an initial status selected when adding a vehicle.

When a vehicle is marked as Found, a modal will collect:

* Where the vehicle was found
* When the vehicle was found
* Incident reference number
* Who found the vehicle

The Who Found field will allow the investigator to select a person already associated with the Investigation.

An option such as `Not within Investigation` will allow the investigator to record a person who is not already associated with the Investigation.

When this option is selected, additional information will be collected:

* First name
* Last name
* Contact details

Following the Found workflow, the vehicle can progress to either Removed or Recovered.

A Found Report dynamic section will then be available within the Vehicle Overview.

The Found Report will contain non-editable information including:

* Found by
* First name
* Last name
* Phone number / contact details
* Incident number
* Other references where applicable

Other references may include references to another system used for recording found vehicles. The original incident reference remains the reference for the incident in which the vehicle was found.

## Removed workflow

Removed does not mean that the vehicle has been removed from the Investigation.

Removed indicates that the vehicle was removed from the place where it was found without being brought into police custody.

For example, a victim's stolen vehicle may be found and subsequently taken away by the victim.

When a vehicle is changed to Removed, a modal will collect who removed the vehicle.

The investigator will be able to select a person already associated with the Investigation.

Where the person is not already associated with the Investigation, an Other option will allow the investigator to provide:

* First name
* Last name
* Phone number

The Vehicle Overview will then contain a dynamic section displaying the removal information.

This information provides an audit of who removed the vehicle and allows the person to be contacted if additional information about the vehicle is required.

## Recovered workflow

Recovered represents the vehicle being recovered through an appropriate recovery process.

When a vehicle progresses from Found to Recovered, a modal will collect:

* Date and time recovered
* Recovery operator
* Where the vehicle was recovered to
* Recovery reference number
* Recovery operator reference number, where applicable

The recovery reference number can provide a reference to another system used by the police force for recording vehicle recoveries.

The Recovery Operator Reference Number is optional where the recovery operator does not use such a reference.

Following completion of the workflow, the Vehicle Overview will contain a dynamic Recovered section displaying the recovery information.

## Vehicle-specific investigative information

The Vehicle Overview will support additional dynamic sections where vehicle-specific investigative information is required.

Examples include:

* CCTV Observations
* ANPR Observations
* Vehicle Examination
* Additional Damage Information
* Other vehicle-specific investigative observations

These sections are not restricted to the initial vehicle status and may be introduced as investigative requirements arise.

Documents may also be associated with a vehicle where appropriate. For example, vehicle damage documentation may result in additional vehicle-specific information being displayed within the Vehicle Overview.

The exact implementation of additional dynamic sections is outside the scope of this ADR. Changes introduced during implementation will be documented through appropriate amendments or extended documentation.

## Vehicle lifecycle

The Vehicle workspace will support the following conceptual lifecycle:

```text
Vehicle Added
      │
      ▼
Initial Status / Role
      │
      ├── Stolen
      ├── Damaged
      ├── Used in Incident
      ├── Suspect
      └── Attacked
              │
              ▼
        Investigation Activity
              │
              ▼
            Found
           /     \
          /       \
         ▼         ▼
     Removed    Recovered
```

Additional statuses or transitions may be introduced as the Investigation system develops.

---

# Consequences

## Positive

* Provides a consistent workspace structure for all Investigation vehicles.
* Allows vehicle information to be separated into common and status-specific sections.
* Provides a clear separation between navigation and the dynamic working area.
* Allows vehicle lifecycle events such as Found, Removed, and Recovered to be represented within the Vehicle workspace.
* Provides dedicated areas for vehicle-specific investigative information.
* Allows additional vehicle statuses, actions, circumstances, and investigative sections to be introduced without changing the fundamental Vehicle Overview structure.
* Keeps common vehicle information available regardless of the vehicle's current status.

## Negative

* Different vehicle statuses and lifecycle events may require different navigation structures and therefore increase frontend complexity.
* The Vehicle workspace may become more complex as additional vehicle-specific investigative sections are introduced.
* Vehicle lifecycle transitions require additional workflow and state handling compared with a static vehicle record.

---

# Neutral / Future Considerations

* Additional vehicle statuses or roles may be introduced.
* Additional theft circumstances may be introduced.
* Additional vehicle actions may be introduced.
* Additional vehicle types may be introduced.
* Additional vehicle-specific dynamic sections may be introduced where required.
* The vehicle lifecycle may be expanded if additional workflows are identified.
* Make and Model reference data may be updated as the available reference data changes.
* Future external or reference-system integrations may allow authoritative vehicle information to be retrieved using a registration number.
* The current implementation does not require external vehicle-system integration.
* Where a vehicle already exists within the METIS database, existing METIS vehicle records can be searched and linked rather than relying on an external system.
* Changes identified during implementation should be documented through amendments or extended documentation rather than changing the scope of this ADR without documentation.

---

# Related Documents

* [ADR-011-Investigation-System-UI](ADR-011-Investigation-System-UI.md)

