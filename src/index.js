import { createATodo } from "./todos-creator.js";
import { myTodos } from "./storage-handling.js";
import { projects, createProject } from "./project-creator.js";
// Attach to the global window object
window.createATodo = createATodo;

window.myTodos = myTodos;

window.createProject = createProject;

window.projects = projects;
