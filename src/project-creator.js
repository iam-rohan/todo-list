import { myTodos } from "./storage-handling";
import { landing } from "./ui-handling";

const projects = [];

function Project(name) {
  this.name = name;
  this.todos = [];
}

function createProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
}

Project.prototype.assignTodos = function (index) {
  myTodos.forEach((item, index) => {
    console.log(`Index: ${index}, Title: ${item.title}, Description: ${item.description}, Due Date: ${item.dueDate}, Priority: ${item.priority}`);
  });

  const indexes = index.split(",").map(Number);
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
