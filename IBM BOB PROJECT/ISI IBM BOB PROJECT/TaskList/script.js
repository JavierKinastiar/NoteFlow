/**
 * script.js — Task List App
 *
 * Responsibilities:
 *  - Maintain an in-memory tasks array (persisted to localStorage)
 *  - CRUD: Create, Read (render), Update (edit text), Delete
 *  - Toggle task completion (Active / Completed)
 *  - Dynamic filtering: All | Active | Completed
 *  - Update footer stats and "Clear Completed" visibility
 *
 * No external libraries — pure Vanilla JavaScript (ES6+).
 */

"use strict";

/* ==========================================================
   1. STATE
   ========================================================== */

/**
 * @typedef {Object} Task
 * @property {string}  id        - Unique identifier (timestamp string)
 * @property {string}  text      - Task description
 * @property {boolean} completed - Whether the task is done
 */

/** @type {Task[]} */
let tasks = [];

/** Currently active filter: 'all' | 'active' | 'completed' */
let currentFilter = "all";

/* ==========================================================
   2. DOM REFERENCES
   ========================================================== */
const taskForm      = document.getElementById("taskForm");
const taskInput     = document.getElementById("taskInput");
const taskList      = document.getElementById("taskList");
const emptyState    = document.getElementById("emptyState");
const statsLabel    = document.getElementById("statsLabel");
const clearBtn      = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

/* ==========================================================
   3. PERSISTENCE — localStorage helpers
   ========================================================== */

/** Load tasks from localStorage (returns empty array if none saved). */
function loadTasks() {
  try {
    const stored = localStorage.getItem("taskList_tasks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/** Persist current tasks array to localStorage. */
function saveTasks() {
  localStorage.setItem("taskList_tasks", JSON.stringify(tasks));
}

/* ==========================================================
   4. CRUD OPERATIONS
   ========================================================== */

/**
 * Create a new task and prepend it to the list.
 * @param {string} text - The task description (already trimmed).
 */
function addTask(text) {
  /** @type {Task} */
  const task = {
    id: Date.now().toString(),
    text,
    completed: false,
  };
  tasks.unshift(task); // newest tasks appear at the top
  saveTasks();
  render();
}

/**
 * Toggle the completed state of a task by id.
 * @param {string} id
 */
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  render();
}

/**
 * Update the text of a task by id.
 * @param {string} id
 * @param {string} newText - Already trimmed new text.
 */
function updateTask(id, newText) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.text = newText;
  saveTasks();
  render();
}

/**
 * Remove a task from the list by id.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

/** Remove all tasks that are marked as completed. */
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  render();
}

/* ==========================================================
   5. RENDER
   ========================================================== */

/**
 * Determine which tasks to show based on currentFilter.
 * @returns {Task[]}
 */
function getFilteredTasks() {
  switch (currentFilter) {
    case "active":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
}

/**
 * Build the HTML for a single task item.
 * Uses dataset attributes so event delegation can identify each task.
 * @param {Task} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task-item${task.completed ? " completed-item" : ""}`;
  li.dataset.id = task.id;

  // --- Checkbox ---
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "active" : "completed"}`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  // --- Task text ---
  const span = document.createElement("span");
  span.className = "task-text flex-1 text-sm text-slate-700 break-words min-w-0";
  span.textContent = task.text;

  // --- Edit button ---
  const editBtn = document.createElement("button");
  editBtn.className = "btn-icon btn-edit";
  editBtn.setAttribute("aria-label", `Edit task: ${task.text}`);
  editBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
           m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>`;
  editBtn.addEventListener("click", () => enterEditMode(task, li));

  // --- Delete button ---
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-icon btn-delete";
  deleteBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
           m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>`;
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.append(checkbox, span, editBtn, deleteBtn);
  return li;
}

/**
 * Switch a task item into inline edit mode:
 * replaces the text span with an <input> and swaps action buttons.
 * @param {Task}        task - The task being edited.
 * @param {HTMLLIElement} li - The list item element.
 */
function enterEditMode(task, li) {
  // Clear existing children
  li.innerHTML = "";

  // Checkbox stays visible but disabled during editing
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;
  checkbox.disabled = true;

  // Edit input
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = task.text;
  input.maxLength = 120;
  // Auto-focus and place cursor at end
  setTimeout(() => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, 0);

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-icon btn-save";
  saveBtn.setAttribute("aria-label", "Save changes");
  saveBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>`;

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn-icon btn-cancel";
  cancelBtn.setAttribute("aria-label", "Cancel editing");
  cancelBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;

  /** Commit the edit (save). */
  function commitEdit() {
    const newText = input.value.trim();
    if (!newText) {
      input.focus();
      input.classList.add("ring-2", "ring-red-400");
      return;
    }
    updateTask(task.id, newText);
  }

  /** Discard the edit (cancel) — re-render without changes. */
  function cancelEdit() {
    render();
  }

  saveBtn.addEventListener("click", commitEdit);
  cancelBtn.addEventListener("click", cancelEdit);

  // Allow saving with Enter, cancelling with Escape
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  });

  li.append(checkbox, input, saveBtn, cancelBtn);
}

/**
 * Main render function — rebuilds the task list DOM from state.
 * Called after every state change.
 */
function render() {
  const filtered = getFilteredTasks();

  // Clear the list
  taskList.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");

    filtered.forEach((task) => {
      taskList.appendChild(createTaskElement(task));
    });
  }

  // Update footer stats (count of active/incomplete tasks across ALL tasks)
  const activeCount = tasks.filter((t) => !t.completed).length;
  statsLabel.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;

  // Show/hide "Clear Completed" button
  const hasCompleted = tasks.some((t) => t.completed);
  clearBtn.classList.toggle("hidden", !hasCompleted);
}

/* ==========================================================
   6. EVENT LISTENERS
   ========================================================== */

/** Handle Add Task form submission. */
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    // Brief shake/highlight to indicate empty input
    taskInput.classList.add("ring-2", "ring-red-400", "border-red-400");
    setTimeout(() => {
      taskInput.classList.remove("ring-2", "ring-red-400", "border-red-400");
    }, 1000);
    return;
  }
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

/** Handle filter tab clicks. */
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    // Update active-filter class on tabs
    filterButtons.forEach((b) => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    render();
  });
});

/** Handle "Clear Completed" button. */
clearBtn.addEventListener("click", clearCompleted);

/* ==========================================================
   7. INITIALIZATION
   ========================================================== */

/** Bootstrap: load persisted tasks and render. */
(function init() {
  tasks = loadTasks();
  render();
})();
