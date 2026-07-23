// --- DOM Elements ---
const greetingText = document.getElementById('greetingText');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// --- State (Now connected to localStorage) ---
// If there is saved data, load it. Otherwise, start with an empty array.
let tasks = JSON.parse(localStorage.getItem('synent_tasks')) || []; 

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
    taskList.innerHTML = '';
    
    // Handle Empty State
    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    let completedCount = 0;

    tasks.forEach((task, index) => {
        if (task.completed) {
            completedCount++;
        }

        const li = document.createElement('li');
        li.className = 'task-item';
        // Add the 'completed' CSS class if the task is done
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // We added onclick="toggleTask(${index})" to the task-content div
        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${index})">
                <span class="custom-checkbox"></span>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        `;
        
        taskList.appendChild(li);
    });

    updateProgress(completedCount, tasks.length);
}

function updateProgress(completed, total) {
    if (total === 0) {
        progressFill.style.width = '0%';
        progressText.textContent = '0%';
        return;
    }
    const percentage = Math.round((completed / total) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

// This is the new function to toggle the checkmark
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; 
        saveAndRender(); 
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Helper function to save to browser storage and update the UI
function saveAndRender() {
    localStorage.setItem('synent_tasks', JSON.stringify(tasks));
    renderTasks();
}

// --- Event Listeners ---
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// --- Initialize App ---
setGreeting();
renderTasks();