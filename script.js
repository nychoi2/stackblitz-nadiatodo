document.addEventListener('DOMContentLoaded', function() {
  const dateElement = document.getElementById('todaysDate');
  if (dateElement) {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    dateElement.textContent = dateString;
  }

  document.getElementById('addTaskButton').addEventListener('click', addTask);
  document.querySelectorAll('.task-list li').forEach(item => attachTaskActions(item));

  function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('pendingTasksList');
    if (input.value.trim() === '') {
      alert("You must write something!");
    } else {
      const li = document.createElement('li');
      const textSpan = document.createElement('span');
      textSpan.textContent = input.value;
      li.appendChild(textSpan);
      taskList.appendChild(li);
      input.value = '';
      attachTaskActions(li);
    }
  }

  function attachTaskActions(taskItem) {
    // Add a Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function () {
      this.parentNode.remove();
    };
    taskItem.appendChild(deleteBtn);

    // Add a Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = function () {
      const completedList = document.getElementById('completedTasksList');
      this.parentNode.classList.add('completed'); // Add a completed style
      this.parentNode.removeChild(this); // Remove the complete button
      completedList.appendChild(this.parentNode); // Move the task to the completed list
    };
    taskItem.appendChild(completeBtn);

    // Add an Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function () {
      const li = this.parentNode;
      if (this.textContent === 'Save') {
        const input = li.querySelector('input');
        const newText = input.value.trim();
        if (newText.length > 0) {
          const textSpan = document.createElement('span');
          textSpan.textContent = newText;
          li.insertBefore(textSpan, input);
          li.removeChild(input);
          this.textContent = 'Edit';
        } else {
          alert("The task cannot be empty.");
        }
      } else {
        const textSpan = li.firstChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = textSpan.textContent;
        li.insertBefore(input, textSpan);
        li.removeChild(textSpan);
        this.textContent = 'Save';
      }
    };
    taskItem.appendChild(editBtn);
  }
});
