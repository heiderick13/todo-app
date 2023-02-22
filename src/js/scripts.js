const body = document.querySelector("body");
const header = document.querySelector("header");
const addTask = document.querySelector("#add-task");
const newTask = document.querySelector("#new-task");
const tasks = document.querySelector("#tasks");
const modeBtn = document.querySelector("#mode-btn");

const lightItems = [body, header, addTask, newTask, tasks];

modeBtn.addEventListener("click", () => {
  lightItems.forEach((item) => {
    item.classList.toggle("light-mode");
  });

  modeBtn.setAttribute("src");
});
