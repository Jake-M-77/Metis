# METIS Investigation Task system

## 1. Purpose

The investigation system requires a mechanism for recording, assigning and managing work that needs to be completed as part of an investigation.

The Task List and Create Task sections form a single task managment system. The Task List provides the investigator with an overview of tasks associated with an investigation, while Create Task provides the mechanism for creating new tasks.

The purpose of this system is to support different types of investigative work without requiring every task to use the same set of fields or information.

--- 

## 2. Task Types

A task will have a defined task type.

Different task types may require different information to be provided when the task is created. For example, a request task may require information about the officer or unit it is being assigned to, while a CCTV task may require information relating to the CCTV being requested.

The system should therefore be designed to support the addition of new task types without requiring the overall task creationg system to be redesigned.

---

## 3. Task Creation

Tasks can be created manually by an investigator through the Task List.

The Create Task process will consist of a task type selection followed by a task creation form.

Task List
    │
    ▼
Create Task
    │
    ▼
Select Task Type
    │
    ▼
Task Creation Form
    │
    ▼
Create Task

The initial task type selection will determine which task-specific information is dispalyed during the task creation process. 

---

## 4. Dynamic Task Components

The task creation interface will use a generic modal/container which displays the appropriate task-specific component based on the selected task type. 

For example: 

Create Task
    │
    ▼
Select Task Type
    │
    ▼
Generic Task Modal
    │
    ▼
Task-specific Component
    │
    ├── Request Task Component
    ├── CCTV Task Component
    ├── Obtain Images Component
    ├── File Investigation Component
    └── ...

The examples above are illustrative and do not represent a final list of task types.

The generic task modal will provide the common structure and controls required to create a task, while the task-specific component will provide the information and controls required by that particular task type. 

This approach allows different task types to have different requirements without creating a separate task creation workflow for each type. 

---

## 5. Common Task Information

Tasks may contain information that is common across multiple task types.

Potential examples include: 

- Task type
- Assigned officer or unit 
- Deadline 
- Task status 
- Task instructions or description

The exact common fields will be determined during implementation once the requirements for the individual task types have been established.

Task-specific information should remain within the relevant task type rather than being added to every task. 

---

## 6. Task Assignment 

Tasks may need to be assigned to an appropriate individual or unit.

The exact assignment options will depend on the task type and the requirements established during implementation. 

For example, a task my be assigned to:

- An individual officer
- A unit or team

The task creation system should therefore support assignment without assuming that every task will necessarily be assigned in the same way

---

## 7. Automatically Generated Tasks 

Tasks may also be created automatically by METIS. 

Certain investigation circumstances may result in METIS generating tasks that need to be completed by an investigator.

For example, an investigation may automatically generate a task requiring images to be obtained. The investigator would then complete the required action, such as uploading the iamges, before marking the task as complete.

Automatically generates tasks sghould use the same task system as manually created tasks. 

Investigation
      │
      ▼
METIS determines task is required
      │
      ▼
Task created automatically
      │
      ▼
Assigned to appropriate investigator
      │
      ▼
Task completed
      │
      ▼
Task marked as complete

The exact rules governing automatically generated tasks will be established separately when the relevant investigation functionality is implemented. 

---

## 8. Task Lifecycle

Tasks will have a lifecycle which allows investigators to determine the current state of a task.

At a minimum, a task will need to support the concept of being created and subsequently completed. 

The exact tasks statuses and transitions will be determined during implementation.

Some tasks types may also require a specific action to be completed before the task can be marked as complete. 

For example: 

Task Created
      │
      ▼
Task In Progress
      │
      ▼
Required Action Completed
      │
      ▼
Task Completed

The exact individual lifecycle will depend on the requirements of the task system and individual task types.

## 9. Task List 

The Task list will provide an overview of tasks associated with the investigation.

It will allow investigators to: 

- View tasks
- Identify outstanding tasks
- View task status
- View task assignment
- View task deadlines
- Create new tasks
- Manage tasks as required

The exact presentation and controls within the Task List will be established during implementation.

---

## 10. Design Considerations

The task system should avoid relying on a single generic task form containing every possible field. 

Different task types may require different information, and presenting irrelevant fields to investigators would make task creation unnecessarily complex. 

Instead, the task system should provide a generic creation mechanism with task-specific components. 

The exact task types, fields, valdiation requirements and workflows should remain flexible until implementation requirements are established. 

This allows the task system to evolve without requiring the underlying task creation architecture to be redesigned whenever a new task type is introduced. 