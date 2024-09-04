import { myTodos } from "./storage-handling";

const projects = [];

function Project(name) {
  this.name = name;
}

function createProject() {
  const name = prompt("Enter the name of Project: ");
  const newProject = new Project(name);
  projects.push(newProject);
}

Project.prototype.assignTodos = function () {
  myTodos.forEach((item, index) => {
    console.log(`Index: ${index}, Title: ${item.title}, Description: ${item.description}, Due Date: ${item.dueDate}, Priority: ${item.priority}`);
  });

  const indexString = prompt(
    "Which among the given Todos you would like to assign into the selected project? Enter their index seperated by commas: "
  );
  const indexes = indexString.split(",").map(Number);
  if (!this.todos) {
    this.todos = [];
  }
  indexes.forEach((index) => {
    const todo = myTodos[index];
    // To ensure only unique entries of the todos gets push no duplication
    if (!this.todos.some((existingTodo) => existingTodo.title === todo.title && existingTodo.description === todo.description)) {
      this.todos.push(todo);
    }
  });
};

export { projects, createProject, Project };
