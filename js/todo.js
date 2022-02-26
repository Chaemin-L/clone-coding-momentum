const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-page ul");

let todos = [];

function handleTodoForm(event){
    event.preventDefault();
    const newTodoObj = {
        "id": Date.now(),
        "text": todoInput.value,
    };
    paintTodo(newTodoObj);
    todos.push(newTodoObj);
    saveTodo();
};

function paintTodo(newTodoObj){
    const deleteBtn = document.createElement("i");
    //deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    deleteBtn.setAttribute("class", "fa fa-trash-alt");
    deleteBtn.addEventListener("click", removeTodo);
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    li.innerText = newTodoObj.text;
    todoInput.value = "";
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function removeTodo(event){
    const li = event.target.parentElement;
    todos = todos.filter(todo => (todo.id !== parseInt(li.id)));
    li.remove();
    saveTodo();
}

function saveTodo(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

const savedTodo = localStorage.getItem("todos");
if(savedTodo){
    const parsedTodos = JSON.parse(savedTodo);
    todos = parsedTodos;
    console.log(todos);
    todos.forEach(paintTodo);
}

todoForm.addEventListener("submit", handleTodoForm);