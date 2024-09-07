import "./styles.css";
import { createATodo } from "./todos-creator.js";
import { myTodos } from "./storage-handling.js";
import { projects, createProject } from "./project-creator.js";
import { landing } from "./ui-handling.js";

// Attach to the global window object
window.createATodo = createATodo;
window.createProject = createProject;
