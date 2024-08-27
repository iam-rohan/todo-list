import { createATodo } from "./todos-creator.js";
import { myTodos } from "./storage-handling.js";

// Attach to the global window object
window.createATodo = createATodo;

window.myTodos = myTodos;
