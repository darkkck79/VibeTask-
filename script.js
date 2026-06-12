const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

const STORAGE_KEY = 'vibetask.tasks';
let tasks = [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'task-item';
    emptyState.innerHTML = '<p class="task-text">No tasks yet. Add one to get started.</p>';
    taskList.appendChild(emptyState);
  } else {
    tasks.forEach(task => {
      const item = document.createElement('li');
      item.className = `task-item${task.completed ? ' done' : ''}`;
      item.dataset.id = task.id;

      item.innerHTML = `
        <button class="task-toggle" aria-label="Toggle task completion">
          ${task.completed ? '☑' : '☐'}
        </button>
        <p class="task-text">${task.text}</p>
        <div class="task-actions">
          <button class="task-delete" aria-label="Delete task">✕</button>
        </div>
      `;

      taskList.appendChild(item);
    });
  }

  taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch (error) {
      tasks = [];
    }
  }
}

function addTask(text) {
  tasks.unshift({
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = taskInput.value;
  if (!text.trim()) {
    return;
  }

  addTask(text);
  taskInput.value = '';
  taskInput.focus();
});

taskList.addEventListener('click', event => {
  const item = event.target.closest('li.task-item');
  if (!item) return;
  const id = item.dataset.id;

  if (event.target.matches('.task-toggle')) {
    toggleTask(id);
  }

  if (event.target.matches('.task-delete')) {
    deleteTask(id);
  }
});

loadTasks();
renderTasks();
