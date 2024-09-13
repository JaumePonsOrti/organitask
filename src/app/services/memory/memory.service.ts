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
    let id = this.tasks.length;
    task.id = id;
    this.tasks.push(task);
    this.save('tasks', this.tasks);
  }

  saveListMaketTasks(task:TaskToDO){
    let maketTasks = this.getListMaketTasks();

    if(maketTasks[this.hourHelper.today()] == undefined){
      maketTasks[this.hourHelper.today()] = []
    }
    maketTasks[this.hourHelper.today()].push(task) ;
  
    console.log(maketTasks);

    this.save('maketTask', maketTasks);
  }

  getListMaketTasks(){
    let maketTasks = JSON.parse(localStorage.getItem("maketTask")  || '{}') || {};
    return maketTasks;
  }

  
  getListTasks(){
    if (this.tasks.length == 0) {
      let tasks1 = JSON.parse(localStorage.getItem('tasks') || '[]');
      let tasks = [];
      let maketTasks = this.getListMaketTasks();

      //Utilizaremos el siguiente mapa para guardar las tareas ya realizadas el dia de hoy 
      let maketTasksTodayMap:any = {};

      //Recorremos la lista maketTasks para agregar las tareas ya realizadas
      if (maketTasks[this.hourHelper.today()] != undefined) {
        let maketTasksToday = maketTasks[this.hourHelper.today()];

        for (let index = 0; index < maketTasksToday.length; index++) {
          console.log("hola index:" + index);
          const element = maketTasksToday[index];

          maketTasksTodayMap[element.id] = element;
        }
      }
            
      for (let i = 0; i < tasks1.length; i++) {
        if (tasks1[i].diary_task === true) {
          if (maketTasksTodayMap[tasks1[i].id] == undefined) {
            tasks.push(tasks1[i]);
            
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
