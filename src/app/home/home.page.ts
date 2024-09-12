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
  startTime: string = this.hourHelper.calculateHours(-1);
  endTime: string = this.hourHelper.calculateHours(0);
  nameCtrl: FormControl = new FormControl();
  repiteDiary: boolean = true;
  tasks: TaskToDO[] = [] ;

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
    console.log("startTime, endTime, nameCtrl",this.startTime, this.endTime, this.nameCtrl.value)
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

      let task:TaskToDO = {
        name: this.nameCtrl.value,
        start_time: this.startTime,
        end_time: this.endTime,
        diary_task: this.repiteDiary, 
        
      }

      this.memoryService.saveNewTask(task);
      this.tasks = this.memoryService.getListTasks();
      //Resetear el formulario
      this.startTime = "";
      this.endTime = "";
      this.nameCtrl.reset();


    }
  }  

}