import { myTodos } from "./storage-handling";
import { projects, createProject } from "./project-creator";
import { createATodo } from "./todos-creator";
import { format } from "date-fns";

function landing() {
  //Main Container
  const container = document.querySelector(".container");
  container.textContent = "";

  //Main Heading
  const heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = "Let's Get it Done!";
  container.appendChild(heading);

  //Actual Opeartion Section
  const mainView = document.createElement("div");
  mainView.classList.add("mainView");

  //Creation Section
  const creationSection = document.createElement("div");
  creationSection.classList.add("creationSection");

  //To Create Todos
  const todoCreate = document.createElement("button");
  todoCreate.classList.add("todoCreate", "createbtn", "btn");
  todoCreate.textContent = "Create a new Todo";
  creationSection.appendChild(todoCreate);

  //To Create Projects
  const projectCreate = document.createElement("button");
  projectCreate.classList.add("projectCreate", "createbtn", "btn");
  projectCreate.textContent = "Create a new Project";
  creationSection.appendChild(projectCreate);

  mainView.appendChild(creationSection);
  container.appendChild(mainView);

  updateChanges();
}

// Render the changes happening in the entries only
function updateChanges() {
  const container = document.querySelector(".container");
  const mainView = document.querySelector(".mainView");

  //SideView Section
  const sideView = document.createElement("div");
  sideView.classList.add("sideView");

  //SideView Todos List
  const todosSideView = document.createElement("div");
  todosSideView.classList.add("todosSideView");
  const todoSideHeading = document.createElement("h4");
  todoSideHeading.textContent = "Your Todos:";
  todosSideView.appendChild(todoSideHeading);
  myTodos.forEach((item) => {
    const aTodo = document.createElement("div");
    aTodo.classList.add("aSideViewTodo");
    aTodo.textContent = item.title;
    todosSideView.appendChild(aTodo);
  });
  //SideView Projects List
  const projectsSideView = document.createElement("div");
  projectsSideView.classList.add("projectsSideView");
  const projectSideHeading = document.createElement("h4");
  projectSideHeading.textContent = "Your Projects:";
  projectsSideView.appendChild(projectSideHeading);
  projects.forEach((item) => {
    const aProject = document.createElement("div");
    aProject.classList.add("aSideViewProject");
    aProject.textContent = item.name;
    projectsSideView.appendChild(aProject);
  });

  sideView.appendChild(todosSideView);
  sideView.appendChild(projectsSideView);
  container.appendChild(sideView);

  // Clear only the structuredShow section if it exists
  let structuredShow = document.querySelector(".structuredShow");
  if (structuredShow) {
    structuredShow.innerHTML = ""; // Clear only the structuredShow section
  } else {
    // Create structuredShow if it doesn't exist
    structuredShow = document.createElement("div");
    structuredShow.classList.add("structuredShow");
    mainView.appendChild(structuredShow);
  }

  // Render the updated content
  renderStructuredShow();
}

function renderStructuredShow() {
  const structuredShow = document.querySelector(".structuredShow");

  // Add project heading
  const projectHeading = document.createElement("h3");
  projectHeading.classList.add("projectHeading");
  projectHeading.textContent = "Projects and their Todos";
  structuredShow.appendChild(projectHeading);

  // Create projects collection container
  const projectsCollection = document.createElement("div");
  projectsCollection.classList.add("projectsCollection");

  // Iterate over the available projects and their respective todos
  projects.forEach((project) => {
    const projectView = document.createElement("div");
    projectView.classList.add("aProjectView");

    // Project name
    const projectName = document.createElement("h4");
    projectName.classList.add("projectName");
    projectName.textContent = project.name;
    projectView.appendChild(projectName);

    // Project todos
    const projectTodosView = document.createElement("div");
    projectTodosView.classList.add("projectTodosView");

    project.todos.forEach((todo) => {
      const checkBox = document.createElement("input");
      const labelCheckBox = document.createElement("label");
      labelCheckBox.setAttribute("for", "todoCheckBox");
      checkBox.classList.add("todoCheckBox");
      checkBox.setAttribute("type", "checkbox");
      const todoElement = document.createElement("div");
      const todoDetails = document.createElement("p");
      todoDetails.textContent = `Title: ${todo.title}, Description: ${todo.description}, Due Date: ${todo.dueDate}, Priority: ${todo.priority}`;
      todoElement.classList.add("aProjectTodo");
      todoElement.appendChild(labelCheckBox);
      todoElement.appendChild(checkBox);
      todoElement.appendChild(todoDetails);

      // Apply background color based on priority
      switch (todo.priority) {
        case "High":
          todoElement.classList.add("priority-high");
          break;
        case "Medium":
          todoElement.classList.add("priority-medium");
          break;
        case "Low":
          todoElement.classList.add("priority-low");
          break;
        default:
          break;
      }

      projectTodosView.appendChild(todoElement);
    });

    //Button to assign todos to a project
    const assignTodo = document.createElement("button");
    assignTodo.classList.add("assignTodo");
    assignTodo.textContent = "Assign Todo";
    assignTodo.dataset.todoAssigncheck = project.name;

    projectView.appendChild(projectTodosView);
    projectView.appendChild(assignTodo);
    projectsCollection.appendChild(projectView);
  });

  structuredShow.appendChild(projectsCollection);
}
document.addEventListener("DOMContentLoaded", () => {
  // Modal elements

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-body");
  const closeModal = document.querySelector(".close");

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (event.target.id === "todo-form") {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const dateInput = document.getElementById("dueDate").value; // format is "yyyy-mm-dd"
      const [year, month, day] = dateInput.split("-");
      const formattedDate = format(new Date(year, month - 1, day), "MM/dd/yyyy"); // correctly create date

      console.log(formattedDate);

      const priority = document.getElementById("priority").value;
      createATodo(title, description, formattedDate, priority);
    }

    if (event.target.id === "project-form") {
      const projectName = document.getElementById("projectName").value;
      createProject(projectName);
      console.log("Project registered");
      console.log(projects);
    }

    if (event.target.id === "todoList-form") {
      const todosIndex = document.getElementById("todosIndex").value;
      const assignButton = document.querySelector(".assignButton");
      const projectIndex = assignButton.dataset.checkthis;
      projects[projectIndex].assignTodos(todosIndex);
    }

    event.target.reset();
    modal.style.display = "none";
    updateChanges();
    const assignTodo = document.querySelectorAll(".assignTodo");
    assignTodo.forEach((element) => {
      element.addEventListener("click", () => {
        updateAssignTodo(element);
      });
    });

    const checkBoxes = document.querySelectorAll(".todoCheckBox");
    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", () => {
        updateCheckBox(checkBox);
      });
    });
  };

  document.addEventListener("submit", formSubmissionHandler);

  const createTodoButton = document.querySelector(".todoCreate");

  createTodoButton.addEventListener("click", () => {
    console.log("Create Todo button clicked");
    modalContent.innerHTML = `
        <h2>Create Todo</h2>
        <form id="todo-form">
          <label for="title">Title:</label>
          <input type="text" id="title" required>
          <label for="description">Description:</label>
          <input type="text" id="description" required>
          <label for="dueDate">Due Date:</label>
          <input type="date" id="dueDate" required>
          <label for="priority">Priority:</label>
          <select id="priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit">Add Todo</button>
        </form>
      `;
    modal.style.display = "block";
  });

  const createProjectButton = document.querySelector(".projectCreate");
  createProjectButton.addEventListener("click", () => {
    console.log("Create Project button clicked");
    modalContent.innerHTML = `
        <h2>Create Project</h2>
        <form id="project-form">
          <label for="projectName">Project Name:</label>
          <input type="text" id="projectName" required>
          <button type="submit">Add Project</button>
        </form>
      `;
    modal.style.display = "block";
  });

  const assignTodo = document.querySelectorAll(".assignTodo");
  assignTodo.forEach((element) => {
    element.addEventListener("click", () => {
      updateAssignTodo(element);
    });
  });

  const checkBoxes = document.querySelectorAll(".todoCheckBox");
  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
      updateCheckBox(checkBox);
    });
  });

  function updateCheckBox(checkBox) {
    const todoBox = checkBox.closest(".aProjectTodo");
    const todoDetails = todoBox.querySelector("p").textContent;

    //The Title of the clicked todo
    const todoTitle = todoDetails.split(",")[0].replace("Title: ", "").trim();

    // Index check based on the title
    const todoIndex = myTodos.findIndex((todo) => todo.title === todoTitle);

    myTodos.pop(todoIndex);
    todoBox.remove();
  }

  function updateAssignTodo(element) {
    modalContent.innerHTML = `
      <h2>Select the desired Todos</h2>
      <form id="todoList-form">
        <label for="">Todo Index Seperated by commas:</label>
        <input type="text" id="todosIndex" required>
        <button class="assignButton" type="submit">Assign Todos</button>
      </form>
      <div class="todoIndexedList"></div>
      `;
    //To List all the Avaibale Todos
    const todoIndexedList = document.querySelector(".todoIndexedList");
    const assignButton = document.querySelector(".assignButton");
    const projectView = element.closest(".aProjectView");
    const projectName = projectView.querySelector(".projectName").textContent;
    const projectIndex = projects.findIndex((project) => project.name === projectName);
    assignButton.dataset.checkthis = projectIndex;

    myTodos.forEach((todo, index) => {
      const todoElement = document.createElement("p");
      todoElement.textContent = `INDEX:${index}, Title: ${todo.title}, Description: ${todo.description}, Due Date: ${todo.dueDate}, Priority: ${todo.priority}`;
      todoElement.classList.add("aProjectTodo");

      // Apply background color based on priority
      switch (todo.priority) {
        case "High":
          todoElement.classList.add("priority-high");
          break;
        case "Medium":
          todoElement.classList.add("priority-medium");
          break;
        case "Low":
          todoElement.classList.add("priority-low");
          break;
        default:
          break;
      }
      todoIndexedList.appendChild(todoElement);
    });

    modal.style.display = "block";
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

export { landing };
