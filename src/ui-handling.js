import { myTodos } from "./storage-handling";
import { projects } from "./project-creator";

function landing() {
  //Main Container
  const container = document.querySelector(".container");
  container.textContent = "";

  //Main Heading
  const heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = "Get it Done";
  container.appendChild(heading);

  //SideView Section
  const sideView = document.createElement("div");
  sideView.classList.add("sideView");
  //SideView Todos List
  const todosSideView = document.createElement("div");
  todosSideView.classList.add("todosSideView");
  //SideView Projects List
  const projectsSideView = document.createElement("div");
  projectsSideView.classList.add("projectsSideView");
  sideView.appendChild(todosSideView);
  sideView.appendChild(projectsSideView);
  container.appendChild(sideView);

  //Actual Opeartion Section
  const mainView = document.createElement("div");
  mainView.classList.add("mainView");

  //To Create Todos
  const todoCreate = document.createElement("div");
  todoCreate.classList.add("todoCreate");
  mainView.appendChild(todoCreate);

  //To Create Projects
  const projectCreate = document.createElement("div");
  projectCreate.classList.add("projectCreate");
  mainView.appendChild(projectCreate);

  //To Show in a structured way the present projects and their todos
  const structuredShow = document.createElement("div");
  structuredShow.classList.add("structuredShow");

  //To iterate over the available projects and their respective todos to render dynamically
  projects.forEach((item) => {
    const aProjectView = document.createElement("div");
    aProjectView.classList.add("aProjectView");
    const projectName = document.createElement("h3");
    projectName.classList.add("projectName");
    projectName.textContent = item.name;

    //Now to iterate over the project's assigned Todos
    const projectTodosView = document.createElement("div");
    projectTodosView.classList.add("projectTodosView");
    const projectTodoList = item.todos;
    projectTodoList.forEach((item) => {
      const todo = document.createElement("p");
      todo.textContent = `Title: ${item.title}, Description: ${item.description}, DueDate: ${item.dueDate} and Priority: ${item.priority}`;
      todo.classList.add("aProjectTodo");
      projectTodosView.appendChild(todo);
    });

    aProjectView.appendChild(projectName);
    aProjectView.appendChild(projectTodosView);
    structuredShow.appendChild(aProjectView);
  });

  mainView.appendChild(structuredShow);
  container.appendChild(mainView);

  myTodos.forEach((item) => {
    const aUITodo = document.createElement("div");
    aUITodo.classList.add("aUITodo");
  });
}

export { landing };
