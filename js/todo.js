const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-page ul");

let todos = [];

function handleTodoForm(event){
    event.preventDefault();
    const newTodoObj = {
        "id": Date.now(),
        "text": todoInput.value,
        "checked": false,
    };
    paintTodo(newTodoObj);
    todos.push(newTodoObj);
    saveTodo();
};

function paintTodo(newTodoObj){
    /* deleteBtn */
    const div1 = document.createElement("div");
    const deleteBtn = document.createElement("i");
    deleteBtn.setAttribute("class", "fa fa-trash-alt");
    deleteBtn.addEventListener("click", removeTodo);
    div1.appendChild(deleteBtn);

    /* check box */
    const checkBox = document.createElement("img");
    if (newTodoObj.checked) {
        checkBox.setAttribute("src", "img/checked.png");
    } else {
        checkBox.setAttribute("src", "img/unchecked.png");
    }
    checkBox.setAttribute("width", "22px");
    /* title(span) */
    const div2 = document.createElement("div");
    const title = document.createElement("span");
    title.textContent = newTodoObj.text;
    div2.appendChild(checkBox);
    div2.appendChild(title);

    const li = document.createElement("li");
    li.id = newTodoObj.id;
    todoInput.value = "";
    li.appendChild(div2);
    li.appendChild(div1);
    li.addEventListener("click", changeStatus);
    todoList.appendChild(li);
}

function removeTodo(event){
    const li = event.target.parentElement.parentElement;
    todos = todos.filter(todo => (todo.id !== parseInt(li.id)));
    li.remove();
    saveTodo();
}

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function changeStatus(event) {
    let targetItem = event.target.tagName;
    switch (targetItem) {
        case "DIV":
            targetItem = event.target.parentElement;
            break;
        case "SPAN":
        case "IMG":
            targetItem = event.target.parentElement.parentElement;
            break;
        default:
            return;       
    }
    targetItem = todos.find(todo => (todo.id === parseInt(targetItem.id)));
    targetItem.checked = !targetItem.checked;
    saveTodo();
    curTodolist = todoList.querySelectorAll("li");
    curTodolist.forEach((list) => list.remove());
    todos.forEach(paintTodo)
}


const savedTodo = localStorage.getItem("todos");
if(savedTodo){
    const parsedTodos = JSON.parse(savedTodo);
    todos = parsedTodos;
    todos.forEach(paintTodo);
}

todoForm.addEventListener("submit", handleTodoForm);