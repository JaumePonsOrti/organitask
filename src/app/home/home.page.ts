import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HourhelperService } from './hourhelper/hourhelper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isOpen = false;
  isOpenPopover1 = false;
  startTime: string = "H. inicio";
  endTime: string = "H. fin";
  nameCtrl: FormControl = new FormControl();
  endCtrl: FormControl = new FormControl();

  constructor(public hourHelper: HourhelperService) {}

  presentPopover(ev: Event, type: string) {
    if (type === 'start') {
      this.isOpen = true;
    } else if (type === 'end') {
      this.isOpenPopover1 = true;
    }
  }


  updateTime(event: any, type: string) {
    let timeVal = event.detail.value;
   
    let time = this.hourHelper.prepareTimeAndCalculateHours( timeVal); 
    
    if (type === 'start') {
      this.startTime = time;
    } else if (type === 'end') {
      this.endTime = "H. fin";
      this.endTime = time;
    }
  }

  saveNewTask() {

    this.startTime = "H. inicio";
    this.endTime = "H. fin";
  }

}
