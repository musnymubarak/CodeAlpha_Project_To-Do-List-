function moveTaskToCompleted(task) {
    var completedTaskList = document.getElementById("completedTaskList");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
        deleteTask(task);
    };

    var undoneButton = document.createElement("button");
    undoneButton.textContent = "Mark as Undone";
    undoneButton.onclick = function () {
        moveTaskBackToMainList(task);
    };

    // Create a span element to display the task name
    var taskName = document.createElement("span");
    taskName.textContent = task.textContent;

    // Remove all existing buttons from the task
    task.innerHTML = "";

    // Append the task name and new buttons to the task
    task.appendChild(taskName);
    task.appendChild(deleteButton);
    task.appendChild(undoneButton);
    task.classList.add("completed");
    completedTaskList.appendChild(task);
}

function moveTaskBackToMainList(task) {
    var taskList = document.getElementById("taskList");

    // Create a new list item
    var newTask = document.createElement("li");
    newTask.textContent = task.textContent;

    // Append the original buttons to the new task
    var buttons = task.querySelectorAll("button:not(.delete)"); // Exclude delete button
    buttons.forEach(function(button) {
        var clonedButton = button.cloneNode(true); // Deep clone with all event listeners
        clonedButton.onclick = function() {
            if (clonedButton.textContent === "Mark as Done") {
                moveTaskToCompleted(newTask);
            } else {
                moveTaskBackToMainList(newTask);
            }
        };
        newTask.appendChild(clonedButton);
    });

    // Append the delete button to the new task
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        deleteTask(newTask);
    };
    newTask.appendChild(deleteButton);

    // Append the new task to the main list
    taskList.appendChild(newTask);

    // Remove the original completed task
    var completedTaskList = document.getElementById("completedTaskList");
    completedTaskList.removeChild(task);
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
    deleteButton.onclick = function() {
        deleteTask(li);
    };

    var moveUpButton = document.createElement("button");
    moveUpButton.textContent = "Move Up";
    moveUpButton.onclick = function() {
        moveTaskUp(li);
    };

    var moveDownButton = document.createElement("button");
    moveDownButton.textContent = "Move Down";
    moveDownButton.onclick = function() {
        moveTaskDown(li);
    };

    var completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Done";
    completeButton.onclick = function () {
        moveTaskToCompleted(li);
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
