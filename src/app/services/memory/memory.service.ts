import { Injectable } from '@angular/core';
import { TaskToDO } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  constructor() { }

  private tasks: TaskToDO[] = [];

  private save(key: string, value: any) {
    value.id = this.tasks.length;
    localStorage.setItem(key, JSON.stringify(value));
  }

  saveNewTask(task:TaskToDO){
    this.tasks.push(task);
    this.save('tasks', this.tasks);
  }

  
  getListTasks(){
    if (this.tasks.length == 0) {
      let tasks1 = JSON.parse(localStorage.getItem('tasks') || '[]');
      let tasks = [];

      for (let i = 0; i < tasks1.length; i++) {
        if (tasks1[i].repiteDiary == true) {
          tasks.push(tasks1[i]);
        }else {
          tasks.push(tasks1[i]);
        }
      }

      this.tasks = tasks;
    }

    return this.tasks;
  }

  getListTasksForSeeInTable(){}


}
