let myTodos = [];

function Todos(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

Todos.prototype.logout = function () {
  console.log(`Title: ${this.title}, Description: ${this.description}, Due Date: ${this.dueDate} and Priority: ${this.priority}`);
};

export function createATodo() {
  const title = prompt("Enter Title:");
  const description = prompt("Enter Description:");
  const dueDate = prompt("Enter Due Date:");
  const priority = prompt("Enter Priority:");

  const newTodo = new Todos(title, description, dueDate, priority);

  myTodos.push(newTodo);
  newTodo.logout();
  console.log(myTodos);
}
