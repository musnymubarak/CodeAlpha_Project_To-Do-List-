function moveTaskToCompleted(task) {
  const completedTaskList = document.getElementById("completedTaskList");
  completedTaskList.appendChild(task);
}

function moveTaskBackToMainList(task) {
  const taskList = document.getElementById("taskList");
  taskList.appendChild(task);
}

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
      alert("Please Enter a Task");
      return;
  }

  var tr = document.createElement("tr");
  var taskCell = document.createElement("td");
  taskCell.textContent = taskInput.value;

  var actionCell = document.createElement("td");

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = function () {
      deleteTask(tr);
  };

  var completeButton = document.createElement("button");
  completeButton.className = "not-done";
  completeButton.textContent = "Mark as Done";

  completeButton.onclick = function () {
      if (completeButton.classList.contains("not-done")) {
          moveTaskToCompleted(tr);
          completeButton.classList.add("done");
          completeButton.classList.remove("not-done");
      } else {
          moveTaskBackToMainList(tr);
          completeButton.classList.add("not-done");
          completeButton.classList.remove("done");
      }
      completeButton.textContent = completeButton.classList.contains("done")
          ? "Mark as Undone"
          : "Mark as Done";
  };

  actionCell.appendChild(deleteButton);
  actionCell.appendChild(completeButton);

  tr.appendChild(taskCell);
  tr.appendChild(actionCell);
  taskList.appendChild(tr);

  taskInput.value = "";
}

function deleteTask(task) {
  var taskList = document.getElementById("taskList");
  taskList.removeChild(task);
}
