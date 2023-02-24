const body = document.querySelector("body");
const header = document.querySelector("header");
const addTask = document.querySelector("#add-task");
const newTask = document.querySelector("#new-task");
const tasks = document.querySelector("#tasks");
const modeBtn = document.querySelector("#mode-btn");

const tasksArr = getFromStorage();

// Functions
function loadTasks() {
  getFromStorage().forEach((task) => {
    createTask(task.id, task.content, task.checked);
  });
}

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

  createTask(noteObj.id, noteObj.content);

  saveToStorage(tasksArr);
}

function createTask(id, content) {
  let taskEl = document.createElement("div");

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  let taskContent = document.createElement("input");
  taskContent.setAttribute("type", "text");
  taskContent.setAttribute("readonly", "readonly");
  taskContent.value = content;

  let editBtn = document.createElement("i");
  editBtn.classList.add("bi");
  editBtn.classList.add("bi-pencil");

  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add("bi");
  deleteBtn.classList.add("bi-trash");

  taskEl.appendChild(checkbox);
  taskEl.appendChild(taskContent);
  taskEl.appendChild(editBtn);
  taskEl.appendChild(deleteBtn);
  taskEl.classList.add("task");

  tasks.prepend(taskEl);
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
    newTask.value = "";

    console.log(tasksArr);
  }
});

modeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});

document.addEventListener("click", (e) => {
  let clicked = e.target;
  let parentEl = clicked.parentElement;
  let task = parentEl.children[1];

  if (clicked.type == "checkbox") parentEl.classList.toggle("done");

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

// load
loadTasks();
