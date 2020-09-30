import Form from './Form.js';
import ArrData from './ArrData.js';
import init from '../init.js';

const form = new Form();

export default class TaskManager {
  constructor() {
    this.pinnedDiv = document.getElementById('pinned');
    this.allTasksDiv = document.getElementById('all-tasks');
    this.formInput = document.getElementById('form-input');
    this.taskInput = document.getElementById('task-input');
    this.error = document.querySelector('.error');
    this.errorClose = document.querySelector('.error-close');
    this.arrData = new ArrData();
  }

  filtered(value) {
    this.filterArray = this.arrData.tasks.filter((item) => {
      const correctValue = value.trim().toLowerCase();
      const correctName = item.name.toLowerCase().includes(correctValue);
      return correctName || item.pinned;
    });

    form.drawTasksList(this.filterArray);
  }

  move(itemIdTask, pinned) {
    const idTask = this.arrData.tasks.findIndex((item) => item.id === Number(itemIdTask));
    this.arrData.tasks[idTask].pinned = pinned;
    this.filtered(this.taskInput.value);
  }

  workingManager() {
    this.formInput.addEventListener('submit', (event) => {
      event.preventDefault();
      const taskInputValue = this.taskInput.value;

      if (taskInputValue === '') {
        this.error.classList.remove('hidden');
        const topPosition = this.taskInput.offsetTop - this.taskInput.offsetHeight;
        this.error.style.top = `${topPosition - 5}px`;
        return;
      }

      if (!this.error.classList.contains('hidden')) {
        this.error.classList.add('hidden');
      }

      this.arrData.addTask(this.taskInput.value);
      this.taskInput.value = '';
      this.filtered(this.taskInput.value);
    });

    this.pinnedDiv.addEventListener('click', (event) => {
      if (event.target.className === 'checked') {
        const itemId = event.target.closest('.item-task').dataset.id;
        this.move(itemId, false);
      }
    });

    this.allTasksDiv.addEventListener('click', (event) => {
      if (event.target.className === 'checked') {
        const itemId = event.target.closest('.item-task').dataset.id;
        this.move(itemId, true);
      }
    });

    this.taskInput.addEventListener('input', () => {
      this.filtered(this.taskInput.value);
    });

    this.errorClose.addEventListener('click', () => {
      this.error.classList.add('hidden');
    });
  }

  initData() {
    init(this.arrData);
    form.drawTasksList(this.arrData.tasks);
    this.workingManager();
  }
}
