export default class Form {
  constructor() {
    this.pinnedDiv = document.getElementById('pinned');
    this.allTasksDiv = document.getElementById('all-tasks');
  }

  drawTasksList(arrTasks) {
    this.pinnedDiv.innerHTML = '';
    this.allTasksDiv.innerHTML = '';

    const havePinned = arrTasks.some((item) => item.pinned);
    const haveTask = arrTasks.every((item) => item.pinned);

    if (!havePinned) {
      this.pinnedDiv.innerHTML = '<p>No pinned tasks</p>';
    }

    if (haveTask) {
      this.allTasksDiv.innerHTML = '<p>No tasks found</p>';
    }

    arrTasks.forEach(function (item) {
      const itemTask = document.createElement('div');
      itemTask.className = 'item-task';
      itemTask.dataset.id = item.id;
      itemTask.innerHTML = `<p>${item.name}</p>
              <div class="checked">${item.pinned ? 'V' : ''}</div>`;

      if (item.pinned) {
        this.pinnedDiv.appendChild(itemTask);
      } else {
        this.allTasksDiv.appendChild(itemTask);
      }
    }, this);
  }
}
