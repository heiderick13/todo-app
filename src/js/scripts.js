const body = document.querySelector("body");
const header = document.querySelector("header");
const addTask = document.querySelector("#add-task");
const newTask = document.querySelector("#new-task");
const tasks = document.querySelector("#tasks");
const modeBtn = document.querySelector("#mode-btn");

const tasksArr = getFromStorage();

// Functions
function generateId() {
  return Date.now();
}

function addTaskElement(content) {
  let noteObj = {
    id: generateId(),
    content: content,
    checked: false,
  };
  tasksArr.push(noteObj);

  let taskEl = createTask(noteObj.id, noteObj.content, noteObj.checked);

  tasks.prepend(taskEl);

  saveToStorage(tasksArr);

  newTask.value = "";
  console.log(noteObj);
}

function createTask(id, content, checked) {
  let taskEl = document.createElement("div");
  taskEl.classList.add("task");

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  let taskContent = document.createElement("input");
  taskContent.setAttribute("type", "text");
  taskContent.setAttribute("readonly", "readonly");
  taskContent.value = content;

  let editBtn = document.createElement("i");
  editBtn.classList.add(...["bi", "bi-pencil"]);

  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add(...["bi", "bi-trash"]);

  taskEl.appendChild(checkbox);
  taskEl.appendChild(taskContent);
  taskEl.appendChild(editBtn);
  taskEl.appendChild(deleteBtn);

  if (checked) {
    taskEl.classList.add("done");
  }

  // checked event
  taskEl
    .querySelector('input[type="checkbox"]')
    .addEventListener("click", () => {
      toggleDone(id);
    });

  return taskEl;
}

function toggleDone(id) {
  let tasks = getFromStorage();

  let targetTask = tasks.filter((task) => task.id === id)[0];

  targetTask.checked = !targetTask.checked;

  saveToStorage(tasks);

  loadTasks();
}

function loadTasks() {
  cleanTasks();

  getFromStorage().forEach((task) => {
    let taskEl = createTask(task.id, task.content, task.checked);
    tasks.prepend(taskEl);
  });
}

function cleanTasks() {
  tasks.innerHTML = `<div id="actions">
  <div id="items-left"><span></span> items left</div>

  <ul id="filters">
    <a href="#" class="filter">All</a>
    <a href="#" class="filter">Active</a>
    <a href="#" class="filter">Completed</a>
  </ul>

  <div id="clear">Clear Completed</div>
</div>`;
}

function getFromStorage() {
  return (savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]"));
}

function saveToStorage(tasksArr) {
  tasksJson = JSON.stringify(tasksArr);

  localStorage.setItem("tasks", tasksJson);
}

// Event handlers
addTask.addEventListener("submit", (e) => {
  e.preventDefault();
});

newTask.addEventListener("keyup", (e) => {
  let enter = e.key == "Enter";
  let content = newTask.value;

  if (enter && content == "") {
    alert("Please enter your task!");
  }

  if (enter && content != "") {
    addTaskElement(content);
  }
});

modeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});

document.addEventListener("click", (e) => {
  let clicked = e.target;
  let parentEl = clicked.parentElement;
  let task = parentEl.children[1];

  if (clicked.classList.contains("bi-pencil")) {
    task.removeAttribute("readonly");
    clicked.classList.remove("bi-pencil");
    clicked.classList.add("bi-save");
  } else if (clicked.classList.contains("bi-save")) {
    task.setAttribute("readonly", "readonly");
    clicked.classList.remove("bi-save");
    clicked.classList.add("bi-pencil");
  }
});

// load page
loadTasks();
