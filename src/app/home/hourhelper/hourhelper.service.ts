import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HourhelperService {

  constructor() { }
  calculateHours(sumar:number = 0, timeVal:any = new Date()) {
    console.log(timeVal);
    let hour = new Date(timeVal).getHours(); 
    console.log("hour:",hour);   
    let minute = new Date(timeVal).getMinutes();
    let time = +hour + ':' ;
    
    if(minute == 0){
      minute = 59;
      time = time + minute;
    }else if(minute <10){
      time = time +"0"+ minute;
    }else{
      minute = minute + sumar;
      time = time + minute;
    }

    return time;
  }
  
  obtenerDiferenciaHoraria() {
    // Obtener la diferencia en minutos entre la hora local y UTC
    const diferenciaMinutos = new Date().getTimezoneOffset();
    
    // Convertir la diferencia a horas y minutos
    const horas = Math.floor(Math.abs(diferenciaMinutos) / 60);
    const minutos = Math.abs(diferenciaMinutos) % 60;
    
    // Determinar si la diferencia es positiva o negativa
    const signo = diferenciaMinutos > 0 ? '-' : '+';
    
    return {"horas":  horas,"minutos":minutos};
  }

  prepareTimeAndCalculateHours(timeVal:any ) {
    console.log("timeVal:",timeVal);
     // Preparacion de la hora para que no de ningun error
     let splitedDate = new Date().toISOString().split('T');
     let spliterHourPart = splitedDate[1].split(':');
     let timeValTemp = timeVal.split(':');
     let diferenceFromUtc = this.obtenerDiferenciaHoraria();
     timeVal = (timeValTemp[0] - diferenceFromUtc.horas) + ':' + (timeValTemp[1] - diferenceFromUtc.minutos);
     const correctTimeVal = splitedDate[0] + 'T' + timeVal + ':' + spliterHourPart[2];
     console.log("correctTimeVal:",correctTimeVal);

     let time = this.calculateHours( 0,correctTimeVal); 

     return time;
  }
}
