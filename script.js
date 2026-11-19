const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const priorityInput = document.getElementById("priorityInput");
const taskList = document.getElementById("taskList");

let tasks = [];

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  if (taskName === "") return;

  const task = {
    id: Date.now(),
    name: taskName,
    subject: subjectInput.value,
    priority: priorityInput.value,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
});

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty-state">Your task list is clear. Add your first task! ✨</li>';
  }

  tasks.forEach(function (task) {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task as completed");
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const details = document.createElement("div");
    details.className = "task-main";

    const name = document.createElement("p");
    name.className = "task-name";
    name.textContent = task.name;

    const meta = document.createElement("p");
    meta.className = "task-meta";
    meta.textContent = task.subject;

    details.appendChild(name);
    details.appendChild(meta);

    const priority = document.createElement("span");
    priority.className = "priority " + task.priority;
    priority.textContent = task.priority;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete task");
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
      renderTasks();
    });

    item.appendChild(checkbox);
    item.appendChild(details);
    item.appendChild(priority);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });

  updateSummary();
}

function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("progressText").textContent = progress + "%";
  document.getElementById("progressLabel").textContent = progress + "%";
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("taskCount").textContent =
    total + (total === 1 ? " task" : " tasks");
}

renderTasks();
