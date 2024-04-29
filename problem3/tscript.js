const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDetailsInput = document.getElementById('taskDetails');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskTitle = taskTitleInput.value.trim();
    const taskDetails = taskDetailsInput.value.trim();
    if (taskTitle !== '') {
        addTask(taskTitle, taskDetails);
        taskTitleInput.value = '';
        taskDetailsInput.value = '';
    } else {
        alert('Needs a Title to add task.');
    }
});

function addTask(title, details) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${title} - ${details}</span>
        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
        <form class="edit-form" style="display: none;">
            <input type="text" value="${title}">
            <input type="text" value="${details}">
            <button type="submit">Save</button>
        </form>
    `;
    taskList.appendChild(li);
}

taskList.addEventListener('click', function(e) {
    const target = e.target;
    if (target.classList.contains('edit-btn')) {
        const li = target.closest('li');
        const span = li.querySelector('span');
        const editForm = li.querySelector('.edit-form');
        span.style.display = 'none';
        editForm.style.display = 'block';
    } else if (target.classList.contains('delete-btn')) {
        const li = target.closest('li');
        li.remove();
    }
});
taskList.addEventListener('submit', function(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('edit-form')) {
        const li = target.closest('li');
        const span = li.querySelector('span');
        const editForm = li.querySelector('.edit-form');
        const titleInput = editForm.querySelector('input[type="text"]');
        const detailsInput = editForm.querySelectorAll('input[type="text"]')[1];
        const title = titleInput.value.trim();
        const details = detailsInput.value.trim();
        if (title !== '') {
            span.textContent = title;
            li.querySelector('span').style.display = 'inline';
            editForm.style.display = 'none';
        } else {
            alert('Please enter a task title.');
        }
        
    }
});