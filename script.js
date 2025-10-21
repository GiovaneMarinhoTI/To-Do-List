const input = document.getElementById("taskInput");
const timeInput = document.getElementById("taskTime");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clock = document.getElementById("clock");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Relógio
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// RENDER DE TAREFAS
function render() {
  list.innerHTML = "";
  const now = new Date();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const date = new Date(task.time);
    const formattedDate = date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    });

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong><br>
        <small>${formattedDate}</small>
      </div>
      <button class="removeBtn">X</button>
    `;

    if (task.done) li.classList.add("done");
    if (!task.done && date < now) li.classList.add("expired");

    // eventos
    li.querySelector("div").onclick = () => toggleDone(index);
    li.querySelector(".removeBtn").onclick = () => removeTask(index);

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  Adicionar tarefa
function addTask() {
  const text = input.value.trim();
  const time = timeInput.value;
  if (text === "" || time === "") return alert("Preencha a Tarefa e a data!");

  tasks.push({ text, time, done: false });
  input.value = "";
  timeInput.value = "";
  render();
}

// Alterna concluída
function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

// Remove
function removeTask(i) {
  tasks.splice(i, 1);
  render();
}

// Checa expiração a cada minuto
setInterval(render, 60000);

btn.onclick = addTask;
render();
