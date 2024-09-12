import { Injectable } from '@angular/core';
import { HourhelperService } from 'src/app/home/hourhelper/hourhelper.service';
import { TaskToDO } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  constructor(private hourHelper: HourhelperService) { }

  private tasks: TaskToDO[] = [];

  private save(key: string, value: any) {
    value.id = this.tasks.length;
    localStorage.setItem(key, JSON.stringify(value));
  }

  saveNewTask(task:TaskToDO){
    this.tasks.push(task);
    this.save('tasks', this.tasks);
  }

  saveListMaketTasks(tasks:TaskToDO){
    let maketTasks = JSON.parse(localStorage.getItem("maketTask")  || '{}');
    maketTasks[this.hourHelper.today()] = maketTasks[this.hourHelper.today()] ? maketTasks[this.hourHelper.today()] : [];
    maketTasks[this.hourHelper.today()].push(tasks);
    console.log(maketTasks);

    this.save('maketTask', this.tasks);
  }

  getListMaketTasks(){
    let maketTasks = JSON.parse(localStorage.getItem("maketTask")  || '{}');
    return maketTasks;
  }

  
  getListTasks(){
    if (this.tasks.length == 0) {
      let tasks1 = JSON.parse(localStorage.getItem('tasks') || '[]');
      let tasks = [];
      let maketTasks = this.getListMaketTasks();
     
      for (let i = 0; i < tasks1.length; i++) {
        if (tasks1[i].repiteDiary === true) {
          for (let index = 0; index < maketTasks.length; index++) {
            const element = maketTasks[this.hourHelper.today()][index];
            
            if (element.id !== tasks1[i].id) {
              tasks.push(tasks1[i]);

            }
          }
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
