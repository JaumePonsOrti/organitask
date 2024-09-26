import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HourhelperService {
  constructor() { }
  //La idea de este metodo es devolver cuanquier fecha habiendole sumado los minutos correspondientes en formato isoSTRING
  calculateHours(sumar:number = 0, timeVal:any = new Date()) {
    let object:Time = this.prepareTimes(timeVal, sumar);
    let year = object.year;
    let month = object.month;
    let day = object.day;
    let hour = object.hour;
    let minute = object.minute;

    let timen = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00.000Z";

    return timen;
  }

  seeHours(timeVal:any = new Date()) { 
    timeVal = new Date(timeVal);
    let hour = timeVal.getHours(); 
    let minute = new Date(timeVal).getMinutes();
    let time = + hour + ':' ;
    
    if(minute == 0){
      time =  hour-1 + ':' ;
      minute = 59;
      time = time + minute;
    }else if(minute < 10){
      time = time +"0"+ minute;
    }else{
      time = hour + ':' ;
      minute = minute;
      time = time + minute;
    }

    return time;

  }

  prepareTimes(timeVal:any = new Date(), sumar:number = 0)  {
    let hour = timeVal.getHours();
    let year = timeVal.getFullYear();
    let monthNumber:number = timeVal.getMonth()+1;
    let dayNumber = timeVal.getDate();
    let minuteN = new Date(timeVal).getMinutes() + sumar;
    

    let month:string = monthNumber < 10 ? '0' + monthNumber : (timeVal.getMonth()+1);
    let day:string = timeVal.getDate() < 10 ? '0' + dayNumber : timeVal.getDate();
    let minute:string = ""+minuteN;

    if(minuteN == 0){
      hour = hour - 1;
      minute = "" + 59;
    }else if(minuteN <10){
      minute = "0"+ minuteN;
    }else{
      minute = minute;
    }

    let hourToUse:string = hour < 10 ? "0" + hour :""+ hour;
    
    let time:Time = {
      "year": year,
      "month": month,
      "day": day,
      "hour": hourToUse,
      "minute": minute
    };

    console.log("Time: ",time);

    return time;

  }
 
  //Este metodo es para saber el dia de hoy con la hora a las 00:00
  today(){
    let today = new Date();
    let object = this.prepareTimes(today, 0);
    let timeN = object.year + "-" + object.month + "-" + object.day + "T"  + "00:00:00.000Z";

    return timeN;

  }


}

export interface Time {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}