import { format, compareAsc } from "date-fns";

export const myTodos = [];

import { Project, projects } from "./project-creator";
import { landing } from "./ui-handling";

if (!localStorage.getItem("0")) {
  initializeDefaultTodos();
  populateStorage();
  console.log("Here the content on the library is being pushed to the storage");
} else {
  getFromStorage();
  console.log("Here the storage content is being pulled");
  const defaultProject = new Project("Default");
  projects.push(defaultProject);
  defaultProject.todos = [];
  myTodos.forEach((item) => {
    defaultProject.todos.push(item);
  });

  landing();
}

export function sortTodos() {
  myTodos.sort((a, b) => compareAsc(new Date(a.dueDate), new Date(b.dueDate)));
  console.log(myTodos);
  console.log(localStorage);
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function populateStorage() {
  if (storageAvailable("localStorage")) {
    myTodos.forEach((item, index) => {
      localStorage.setItem(index, JSON.stringify(item));
    });
  } else {
    console.log("Sorry such storage is not available!");
  }
}

function initializeDefaultTodos() {
  if (storageAvailable("localStorage")) {
    // Example default todo
    const defaultTodo = [
      {
        title: "Welcome",
        description: "Your first todo item!",
        dueDate: format(new Date().toISOString().slice(0, 10), "MM/dd/yyyy"), // Today's date
        priority: "High",
      },
      {
        title: "Buy groceries",
        description: "Milk, Bread, Eggs, Butter",
        dueDate: "09/15/2024",
        priority: "Low",
      },
      {
        title: "Finish project report",
        description: "Complete the final draft of the report",
        dueDate: "09/20/2024",
        priority: "Medium",
      },
    ];

    defaultTodo.forEach((item) => {
      myTodos.push(item);
    });
    localStorage.setItem("0", JSON.stringify(defaultTodo));
  } else {
    console.log("Sorry, localStorage is not available!");
  }
}

function getFromStorage() {
  if (storageAvailable("localStorage")) {
    const keys = Object.keys(localStorage); //Gives all the keys available in localStorage as an array list
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      const todo = JSON.parse(value);
      myTodos.push(todo);
    });
    sortTodos();
  } else {
    console.log("Sorry such storage is not available!");
  }
}
