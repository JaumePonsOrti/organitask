import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HourhelperService } from './hourhelper/hourhelper.service';
import { MemoryService } from '../services/memory/memory.service';
import { TaskToDO } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  startTime: string = new Date().toISOString();
  endTime: string = new Date().toISOString();
  nameCtrl: FormControl = new FormControl();
  repiteDiary: boolean = true;
  tasks: TaskToDO[] = [] ;
  makingNowTask ?: TaskToDO ;

  constructor(public hourHelper: HourhelperService, public memoryService: MemoryService) {}

  ngOnInit(): void {
    this.tasks = this.memoryService.getListTasks();
  }

  updateTime(event: any, type: string) {
    let timeVal = event.detail.value;
    
    if (type === 'start') {
      this.startTime = timeVal;
    } else if (type === 'end') {
      this.endTime = timeVal;
    }
  }

  saveNewTask() {
    if (this.startTime === null || this.endTime === null || this.nameCtrl.value === null) {
      
      console.error("Error: null pointer reference");
      return;
    }
    if (this.startTime.length === 0 || this.endTime.length === 0 || this.nameCtrl.value.length === 0) {
      console.error("Error: empty string");
      return;
    }
    try {
      
    } catch (error) {
      console.error("Error: unhandled exception", error);
    } finally {
      let id = this.tasks.length;
      let task:TaskToDO = {
        id:id,
        name: this.nameCtrl.value,
        start_time: this.startTime,
        end_time: this.endTime,
        diary_task: this.repiteDiary, 
        started: false,
        time_completed: 0
      }

      this.memoryService.saveNewTask(task);
      this.tasks = this.memoryService.getListTasks();
      //Resetear el formulario
      /*
      this.startTime = this.hourHelper.calculateHours(-1);
      this.endTime = this.hourHelper.calculateHours(0);
      */
      this.nameCtrl.reset();
    }
  }  

  starTask(index: number, task: TaskToDO) {
    if(this.makingNowTask != undefined){
      this.pauseTask(this.makingNowTask.id, this.makingNowTask);
    }
    
    task.started = true;
    task.timeStarted = new Date();
    this.tasks[index] = task;
    this.makingNowTask = task;

  }

  pauseTask(index: number, task: TaskToDO) {
    task.started = false;
    task.timeEnded = new Date();
    let time:number = this.calculateTime(task)?? 0;
    task.time_completed = time + task.time_completed;
    task.timeStarted = undefined;
  
    this.tasks[index] = task;
    this.makingNowTask = undefined;
  } 

  stopTask(index: number, task: TaskToDO) {
    task.started = false;
    task.timeEnded = new Date();
    let time:number = this.calculateTime(task)?? 0;
    task.time_completed = time + task.time_completed;
    task.timeStarted = undefined;

    this.memoryService.saveListMaketTasks(task);
    this.tasks = this.tasks.filter((val, i) => i != index);
    this.makingNowTask = undefined;
    
  }

  calculateTime(task: TaskToDO): number | undefined {
    if (task.timeStarted === undefined || task.timeEnded === undefined) {
      return undefined;
    }

    const startTime = task.timeStarted.getTime();
    const endTime = task.timeEnded.getTime();

    if (isNaN(startTime) || isNaN(endTime)) {
      return undefined;
    }

    return endTime - startTime;
  }
}