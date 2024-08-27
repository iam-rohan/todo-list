import { format, compareAsc } from "date-fns";
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
  const dueDate = format(new Date(prompt("Enter Due Date:")), "MM/dd/yyyy");
  const priority = prompt("Enter Priority:");

  console.log(typeof dueDate);
  console.log(dueDate);

  const newTodo = new Todos(title, description, dueDate, priority);

  myTodos.push(newTodo);
  newTodo.logout();
  console.log(myTodos);
  sortTodos();
}

function sortTodos() {
  const unSequencedDates = [];
  myTodos.forEach((dueDate, index) => {
    unSequencedDates.push(myTodos[index].dueDate);
  });
  console.log(unSequencedDates);
  let sequencedTodos = [];
  sequencedTodos = unSequencedDates.sort(compareAsc);
  console.log(sequencedTodos);
}
