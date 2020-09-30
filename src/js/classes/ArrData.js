import Task from './Task.js';

export default class ArrData {
  constructor() {
    this.tasks = [];
  }

  addTask(name) {
    this.tasks.push(new Task(this.tasks.length, name));
  }
}
