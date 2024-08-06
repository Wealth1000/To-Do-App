let taskNum = 0;
let objTasks = [];

// Function to add a new task
const addNewTask = () => {
    const titleInput = document.querySelector("#title").value;
    const dateInput = document.querySelector("#date").value;
    const locationInput = document.querySelector("#location").value;
    const descriptionInput = document.querySelector("#description").value;
    
    // Truncate description if more than 40 characters
    const shortDescription = descriptionInput.length > 40 
        ? descriptionInput.substring(0, 40) + '...'
        : descriptionInput;

    taskNum++;
    objTasks.push({
        "taskNum": taskNum,
        "title": titleInput,
        "date": dateInput,
        "location": locationInput,
        "description": descriptionInput
    });

    displayPreviews(); // Update previews after adding a new task
};

// Function to display task previews
const displayPreviews = () => {
    const previewsContainer = document.querySelector(".previews-container");
    previewsContainer.innerHTML = ''; // Clear existing previews

    objTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'test-task task';

        taskDiv.innerHTML = `
            <div class="task-preview">
                <div class="actual-preview">
                    <p>Title: ${task.title}</p>
                    <p>Date: ${task.date}</p>
                    <p>Description: ${task.description.length > 40 ? task.description.substring(0, 40) + '...' : task.description}</p>
                </div>
                <div class="a2 x1">
                    <input type="checkbox" id="task-${task.taskNum}" />
                </div>
            </div>
            <div class="task-preview-btns">
                <button onclick="editTask(${task.taskNum})">Edit</button>
                <button onclick="deleteTask(${task.taskNum})">Delete</button>
            </div>
        `;

        previewsContainer.appendChild(taskDiv);
    });
};

// Function to populate form with task data for editing
const editTask = (taskNumber) => {
    const task = objTasks.find(task => task.taskNum === taskNumber);

    if (task) {
        document.querySelector("#title").value = task.title;
        document.querySelector("#date").value = task.date;
        document.querySelector("#location").value = task.location;
        document.querySelector("#description").value = task.description;
        
        toggleVisibility(true); // Show the form and hide previews
    }
};

// Function to delete a task
const deleteTask = (taskNumber) => {
    objTasks = objTasks.filter(task => task.taskNum !== taskNumber);
    displayPreviews(); // Update previews after deletion
};

// Function to toggle visibility between form and previews
const toggleVisibility = (showForm) => {
    const formDiv = document.querySelector(".form");
    const previewsContainer = document.querySelector(".previews-container");
    const discardDiv = document.querySelector(".discard-div");
    const addTaskDiv = document.querySelector(".add-task-div");

    if (showForm) {
        // Show the form and hide previews
        formDiv.style.display = 'block';
        previewsContainer.style.display = 'none';
        addTaskDiv.classList.add('hidden'); // Hide add-task-div
        discardDiv.style.display = 'none'; // Hide discard dialog
    } else {
        // Hide the form and show previews
        formDiv.style.display = 'none';
        previewsContainer.style.display = 'block';
        addTaskDiv.classList.remove('hidden'); // Show add-task-div
        discardDiv.style.display = 'none'; // Hide discard dialog
    }
};

// Function to handle Add New Task button click
const handleAddTaskClick = (event) => {
    event.preventDefault(); // Prevent form submission
    addNewTask();
    document.querySelector(".form").reset(); // Reset the form fields
    toggleVisibility(false); // Hide the form and show previews

    // Scroll to the preview section
    document.querySelector(".previews-container").scrollIntoView({ behavior: 'smooth' });
};

// Function to handle Close button click in the form
const handleCloseButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    toggleVisibility(true); // Show the form and hide previews
    document.querySelector(".discard-div").style.display = 'block'; // Show discard dialog
};

// Function to handle Discard button click
const handleDiscardButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    document.querySelector(".discard-div").style.display = 'none'; // Hide discard dialog
    toggleVisibility(false); // Hide form and show previews
};

// Function to handle Cancel button click
const handleCancelButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    document.querySelector(".discard-div").style.display = 'none'; // Hide discard dialog
    toggleVisibility(false); // Hide form and show previews
};

// Event listeners for buttons
document.querySelector(".add-task-btn").addEventListener('click', () => {
    toggleVisibility(true); // Show the form and hide previews
});

document.querySelector(".close-btn").addEventListener('click', handleCloseButtonClick);

document.querySelector(".add-form-btn").addEventListener('click', handleAddTaskClick);

document.querySelector("#discard-btn").addEventListener('click', handleDiscardButtonClick);

document.querySelector("#cancel-btn").addEventListener('click', handleCancelButtonClick);

// Initialize page with previews visible and form hidden
toggleVisibility(false);
// Function to classify tasks based on button clicks
const classifyingTasks = (filter) => {
    const previewsContainer = document.querySelector(".previews-container");
    const allTasks = previewsContainer.querySelectorAll(".test-task");

    allTasks.forEach(taskDiv => {
        const checkbox = taskDiv.querySelector('input[type="checkbox"]');
        const isChecked = checkbox.checked;

        if (filter === 'total') {
            taskDiv.style.display = 'block'; // Show all tasks
        } else if (filter === 'in-progress') {
            taskDiv.style.display = isChecked ? 'none' : 'block'; // Hide checked tasks
        } else if (filter === 'completed') {
            taskDiv.style.display = isChecked ? 'block' : 'none'; // Hide unchecked tasks
        }
    });
};

// Function to handle button click events
const handleButtonClick = (event) => {
    const target = event.target;
    
    // Remove 'selected' class from all buttons
    document.querySelectorAll(".btn-collections button").forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    target.classList.add('selected');

    // Classify tasks based on button clicked
    if (target.classList.contains('total-btn')) {
        classifyingTasks('total');
    } else if (target.classList.contains('in-progress-btn')) {
        classifyingTasks('in-progress');
    } else if (target.classList.contains('completed-btn')) {
        classifyingTasks('completed');
    }
};

// Set up event listeners for the buttons
document.querySelector(".total-btn").addEventListener('click', handleButtonClick);
document.querySelector(".in-progress-btn").addEventListener('click', handleButtonClick);
document.querySelector(".completed-btn").addEventListener('click', handleButtonClick);

// Initialize button states and task display
document.querySelector(".total-btn").classList.add('selected');
classifyingTasks('total');