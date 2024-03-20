function moveTaskToCompleted(task) {
    const completedTaskList = document.getElementById("completedTaskList");
    completedTaskList.insertAdjacentElement("beforeend", task);
  }
  
  function moveTaskBackToMainList(task) {
    const taskList = document.getElementById("taskList");
    taskList.insertAdjacentElement("beforeend", task);
  }
  
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value === "") {
      alert("Please Enter a Task");
      return;
    }
  
    var li = document.createElement("li");
    li.textContent = taskInput.value;
  
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
      deleteTask(li);
    };
  
    var moveUpButton = document.createElement("button");
    moveUpButton.textContent = "Move Up";
    moveUpButton.className = "moveUpButton";
  
    moveUpButton.onclick = function () {
      moveTaskUp(li);
    };
  
    var moveDownButton = document.createElement("button");
    moveDownButton.textContent = "Move Down";
    moveDownButton.className = "moveDownButton";
  
    moveDownButton.onclick = function () {
      moveTaskDown(li);
    };
  
    var completeButton = document.createElement("button");
    completeButton.className = "not-done";
    completeButton.textContent = "Mark as Done";
  
    completeButton.onclick = function () {
      if (completeButton.classList.contains("not-done")) {
        moveTaskToCompleted(li);
        completeButton.classList.add("done");
        completeButton.classList.remove("not-done");
        li.querySelector(".moveDownButton").style.display = "none";
        li.querySelector(".moveUpButton").style.display = "none";
      } else {
        moveTaskBackToMainList(li);
        completeButton.classList.add("not-done");
        completeButton.classList.remove("done");
        li.querySelector(".moveDownButton").style.display = "flex";
        li.querySelector(".moveUpButton").style.display = "flex";
      }
      completeButton.textContent = completeButton.classList.contains("done")
        ? "Mark as Undone"
        : "Mark as Done";
    };
  
    li.appendChild(deleteButton);
    li.appendChild(moveUpButton);
    li.appendChild(moveDownButton);
    li.appendChild(completeButton);
    taskList.appendChild(li);
  
    taskInput.value = "";
  }
  
  function moveTaskUp(task) {
    var prevTask = task.previousElementSibling;
    if (prevTask) {
      task.parentNode.insertBefore(task, prevTask);
    }
  }
  
  function moveTaskDown(task) {
    var nextTask = task.nextElementSibling;
    if (nextTask) {
      task.parentNode.insertBefore(nextTask, task);
    }
  }
  
  function deleteTask(task) {
    var taskList = document.getElementById("taskList");
    taskList.removeChild(task);
  }
  