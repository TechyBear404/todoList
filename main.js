import "./style.scss";
import * as bootstrap from "bootstrap";
import { renderNav } from "./components/nav.js";

const todos = JSON.parse(localStorage.getItem("todos")) || { todos: [] };

const addTodo = (title) => {
  const newTodo = {
    id: "todo" + Date.now(),
    title,
  };
  todos.todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  const newLi = document.createElement("li");
  newLi.id = newTodo.id;
  newLi.className = "list-group-item d-flex align-items-center";
  newLi.innerHTML = `
      <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault">
      <p class="m-0">${title}</p>
  `;
  document.querySelector("#todoList").appendChild(newLi);
  document.querySelector("#inputTitleTodo").value = "";
};

//delete todo if input = checked
const deleteTodo = () => {
  const deleteList = document.querySelectorAll("#todoList li input:checked");
  console.log("delete");

  deleteList.forEach((todo) => {
    const id = todo.parentElement.id;
    const index = todos.todos.findIndex((todo) => todo.id === id);

    todos.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    document.querySelector("#" + id).remove();
  });
};

document.querySelector("#app").innerHTML = `
    ${renderNav()}
  <div class="container mt-5">
    <form id="formTodo" class=" mt-5" >
      <div class="mb-3">
        <h2 className="">Ajouter un todo</h2>
        <input type="text" class="form-control" id="inputTitleTodo" aria-describedby="">
      </div>
      <button type="submit" id="submitButton" class="btn btn-primary">Ajouter todo</button>
    </form>
    <h1 className="">Todo List</h1>
    <ul id="todoList" class="list-group ">
      ${todos.todos
        .map(
          (todo) =>
            `<li id="${todo.id}" class="list-group-item d-flex align-items-center">
              <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault">

              <p class="m-0">${todo.title}</p>
            </li>`
        )
        .join("")}
    </ul>
    <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#confirmModal">
      Supprimer
    </button>
   
    
    <div id="confirmModal" class="modal"  tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Supprimer todo ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ol id="removeList" class="list-group list-group-numbered">
              </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button id="modalDeleteBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>

`;

document.querySelector("#modalDeleteBtn").addEventListener("click", (e) => {
  deleteTodo();
});

document.querySelector("#formTodo").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#inputTitleTodo").value;
  addTodo(title);
});

document.querySelectorAll("#todoList li button").forEach((button) => {
  button.addEventListener("click", (e) => {
    // delete if imput checked
    if (e.target.parentElement.querySelector("input").checked) {
      deleteTodo(e.target.parentElement.id);
    }
  });
});

document
  .getElementById("confirmModal")
  .addEventListener("show.bs.modal", (event) => {
    // Button that triggered the modal
    // console.log(event);
    const deleteList = document.querySelectorAll("#todoList li input:checked");
    const revoveList = document.querySelector("#removeList");

    deleteList.forEach((todo) => {
      const id = todo.parentElement.id;
      const title = todo.parentElement.querySelector("p").innerText;
      const newLi = document.createElement("li");
      newLi.id = id;
      newLi.className = "list-group-item ps-4 d-flex";
      newLi.innerHTML = `
          <p class="ps-2">${title}</p>
      `;
      revoveList.appendChild(newLi);
    });
  });
