// --- DOM Elements ---
const greetingText = document.getElementById('greetingText');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// --- State ---
// This array holds our tasks temporarily in memory
let tasks = []; 

// --- Dynamic Greeting ---
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Evening! 🌙'; 
    if (hour < 12) greeting = 'Good Morning! 🚀';
    else if (hour < 18) greeting = 'Good Afternoon! ☀️';
    
    greetingText.textContent = greeting;
}

// --- Core Functions ---
function renderTasks() {
    // Clear the current list
    taskList.innerHTML = '';

    // Show or hide the empty state message
    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Loop through array and build HTML for each task
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <div class="task-content">
                <span class="custom-checkbox"></span>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        `;
        
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        // Add the new task to our array
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; // Clear the input box
        renderTasks(); // Update the screen
    }
}

function deleteTask(index) {
    tasks.splice(index, 1); // Remove 1 item at the given index
    renderTasks(); // Update the screen
}

// --- Event Listeners ---
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// --- Initialize App ---
setGreeting();
renderTasks();