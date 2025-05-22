Task Management App - Angular 19 with NgRx Signals
Overview
This is a Task Management application built with Angular 19, utilizing NgRx Signals for state management, Angular Reactive Forms for CRUD operations, and Chart.js for data visualization. The app allows users to add, edit, and delete tasks in an in-memory store, with two separate components displaying the task list in a table and visualizing task data in charts (status distribution and tasks created over time). The project is structured with a modular architecture, ensuring scalability and maintainability.
The application is hosted on StackBlitz with public access for review. A demo recording is included to showcase the app's functionality.

Features

CRUD Operations: Add, edit, and delete tasks using a reactive form.
NgRx Signals Store: Centralized state management for tasks, with components subscribing to store changes.
Data Visualization:
Table Component: Displays tasks in a tabular format with options to edit or delete.
Chart Components:
Pie chart showing task status distribution (e.g., To Do, In Progress, Done).
Line chart showing the number of tasks created over time.




Modular Architecture: Organized into Core, Shared, and Feature modules for clean code separation.
Reactive Updates: Charts and table update instantly when the store changes.


Setup Instructions
To run the project locally or on StackBlitz, follow these steps:
Prerequisites

Node.js (v22 or higher)
Angular CLI (v19 or higher)
A modern browser (Chrome, Firefox, etc.)

Running Locally

Clone or Download the Project:

Video Link: https://drive.google.com/file/d/1FTUR9wn1FJlTh26uO9noVF8lYDlQyxgW/view?usp=sharing
Github Link: https://github.com/AbhishekVerma810/assignment.git





Install Node Module:
Node Version:22v
npm install


Run the Application:
Angular Version:19v
ng serve


Open your browser and navigate to http://localhost:4200


Explore the App:

Use the form to add/edit tasks.
View the task list in the table.
Check the pie chart for task status distribution and the line chart for task creation trends.



Running on StackBlitz

Visit the public StackBlitz link: .
The project should run automatically in the browser.
If dependencies are missing, click the "Install Dependencies" button in StackBlitz.


Key Files

task.model.ts: Defines the Task interface (id, title, description, status, createdAt).
task.store.ts: NgRx Signals store managing task state, with selectors and actions.
task-list.component.ts: Displays tasks in a table, subscribes to the store.
task-charts.component.ts: Renders pie and line charts using Chart.js, reacts to store changes.
task-form.component.ts: Reactive form for adding/editing tasks.


Design Rationale
Module Organization

Core Module: Contains singleton services (e.g., TaskService if needed) and app-wide configurations. This ensures services are instantiated only once.
Shared Module: Houses reusable components like TaskFormComponent and the Task model. This promotes reusability across feature modules.
Tasks Feature Module: Encapsulates all task-related functionality (store, components, routes). This isolates the feature for better maintainability and potential lazy-loading.

NgRx Signals Usage

Why NgRx Signals?: Signals provide a reactive, lightweight state management solution compared to traditional NgRx (with reducers). They simplify state updates and subscriptions, making the code more intuitive.
Store Structure:
A single TaskStore manages an array of tasks as a signal (tasksSignal).
Computed Signals:
taskCount: Tracks the total number of tasks.
statusDistribution: Computes counts of tasks by status for the pie chart.
tasksByDate: Groups tasks by creation date for the line chart.


Actions: Methods like addTask, updateTask, and deleteTask update the store immutably.


Signal Effects: Used sparingly to log state changes for debugging (e.g., signalEffect to monitor store updates). I avoided overusing effects to keep the app simple and predictable.

Chart Implementation

Chart.js: Chosen for its simplicity and compatibility with Angular via ng2-charts. It supports reactive updates by binding chart data to computed signals.
Pie Chart: Shows task status distribution (To Do, In Progress, Done) using statusDistribution signal.
Line Chart: Displays tasks created over time, derived from tasksByDate signal.
Reactivity: Charts update automatically when the store changes, thanks to Angular's change detection and signal subscriptions.

Trade-offs and Alternatives

NgRx Signals vs. RxJS: I chose Signals for their simplicity and direct integration with Angular 19’s reactivity model. RxJS could be used for more complex async flows, but it wasn’t necessary for an in-memory app.
Chart.js vs. D3.js: Chart.js is lightweight and sufficient for basic charts. D3.js offers more customization but adds complexity, which wasn’t justified for this scope.
Single Feature Module vs. Multiple: I used a single TasksModule for simplicity. For a larger app, I’d split into sub-modules (e.g., TaskListModule, TaskChartsModule) for lazy-loading.
Signal Effects: I minimized effects to avoid side-effect complexity. An alternative would be to use RxJS BehaviorSubject for state, but Signals are more idiomatic for Angular 19.


Demo Recording

A demo recording is available at  .


