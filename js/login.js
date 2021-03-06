const loginPage = document.querySelector(".login-page");
const loginForm = document.querySelector(".login-form");
const loginInput = loginForm.querySelector(" input");
const who = document.querySelector("#who");
const todoPage = document.querySelector(".todo-page");
const guestBtn = loginPage.querySelector("button");

const USER_NAME_KEY = "userName";
const HIDDEN_CLASS = "hidden";

function goTodoList(user) {
	who.innerText = user;
	loginPage.classList.add(HIDDEN_CLASS);
	todoPage.classList.remove(HIDDEN_CLASS);
}

function handleLogin(event) {
	event.preventDefault();
	const userName = loginInput.value;
	localStorage.setItem(USER_NAME_KEY, userName);
	goTodoList(userName);
}

function guestLogin() {
	goTodoList("Guest");
}

const savedName = localStorage.getItem(USER_NAME_KEY);
if (savedName) {
	goTodoList(savedName);
} else {
	loginForm.addEventListener("submit", handleLogin);
	guestBtn.addEventListener("click", guestLogin);
}
