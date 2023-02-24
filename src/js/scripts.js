const body = document.querySelector("body");
const header = document.querySelector("header");
const addTask = document.querySelector("#add-task");
const newTask = document.querySelector("#new-task");
const tasks = document.querySelector("#tasks");
const modeBtn = document.querySelector("#mode-btn");

const tasksArr = [];

// Functions
function generateId() {
  return Date.now();
}

function addTaskElement(content) {
  let noteObj = {
    id: generateId(),
    content: content,
  };
  tasksArr.push(noteObj);

  createTask(noteObj.id, noteObj.content);
}

function createTask(id, content) {
  let taskEl = document.createElement("div");

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  let taskContent = document.createElement("input");
  taskContent.setAttribute("type", "text");
  taskContent.value = content;

  taskEl.appendChild(checkbox);
  taskEl.appendChild(taskContent);
  taskEl.classList.add("task");

  tasks.prepend(taskEl);
}

// Event handlers
addTask.addEventListener("submit", (e) => {
  e.preventDefault();
});

newTask.addEventListener("keyup", (e) => {
  let enter = e.key == "Enter";
  let content = newTask.value;

  if (content == "") {
    alert("Please enter your task!");
  }

  if (enter && content != "") {
    addTaskElement(content);
    newTask.value = "";
  }
});

modeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});
