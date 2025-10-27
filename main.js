const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");



let tasks;

try {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!Array.isArray(tasks)) {
    tasks = [];
  }
} catch (e) {
  tasks = [];
}


// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

// Button click
addTaskBtn.addEventListener("click", addTask);

// Display tasks  render
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "complete" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Toggle complete/pending
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
renderTasks(document.querySelector(".filter.active").dataset.filter);
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(document.querySelector(".filter.active").dataset.filter);
}

// Filter buttons
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});


// ✅ Enter key press
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


// Initial render
renderTasks();




