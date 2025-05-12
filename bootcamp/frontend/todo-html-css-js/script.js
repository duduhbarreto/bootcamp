const finishButtons = document.querySelectorAll(".tasks ul li button");

finishButtons.forEach((button) => {
  button.addEventListener("click", finishTask);
});

function finishTask(event) {
  const li = event.target.parentElement.parentElement;
  li.classList.toggle("done");

  if (li.classList.contains("done")) {
    event.target.innerText = "Desfazer";
  } else {
    event.target.innerText = "Finalizar";
  }
}

function removeTask(event) {
  const li = event.target.parentElement.parentElement;
  const ul = li.parentElement;
  ul.removeChild(li);
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("input");
  const taskText = input.value;

  if (taskText === "") {
    return;
  }

  const span = document.createElement("span");
  span.innerText = taskText;

  const finishButton = document.createElement("button");
  finishButton.classList.add("btn");
  finishButton.innerText = "Finalizar";
  finishButton.addEventListener("click", finishTask);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn");
  removeButton.innerText = "Remover";
  removeButton.addEventListener("click", removeTask);

  const buttons = document.createElement("div");
  buttons.appendChild(finishButton);
  buttons.appendChild(removeButton);

  const li = document.createElement("li");
  li.appendChild(span);
  li.appendChild(buttons);

  const ul = document.querySelector(".tasks ul");
  ul.prepend(li);
});

// setTimeout(() => {
//   const titulo = document.querySelector("h1");
//   titulo.innerHTML = "<strong>Lista de Tarefas (Modificado pelo JS)</strong>";

//   titulo.setAttribute("id", "test");
//   titulo.classList.add("bg-red");
//   // titulo.classList.toggle("bg-red");
// }, 5000);

// setTimeout(() => {
//   const titulo = document.querySelector("#test");
//   titulo.classList.remove("bg-red");
//   // titulo.classList.toggle("bg-red");

//   const tasks = document.querySelectorAll(".tasks ul li");
//   console.log(tasks);
// }, 8000);
