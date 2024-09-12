import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HourhelperService {

  constructor() { }
  calculateHours(sumar:number = 0, timeVal:any = new Date()) {
    let hour = timeVal.getHours(); 
    let minute = new Date(timeVal).getMinutes();
    let time = + hour + ':' ;
    
    if(minute == 0){
      time =  hour-1 + ':' ;
      minute = 59;
      time = time + minute;
    }else if(minute <10){
      time = time +"0"+ minute;
    }else{
      time = hour + ':' ;
      minute = minute + sumar;
      time = time + minute;
    }

    return time;
  }
}
