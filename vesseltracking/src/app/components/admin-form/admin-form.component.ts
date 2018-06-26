import { VesselMapComponent } from './../vessel-map/vessel-map.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  @ViewChild(VesselMapComponent) vesselMap:VesselMapComponent;

  daysList: any[] = [
    { name: '3 Days', value:3},
    { name: '5 Days', value:5},
    { name: '10 Days', value:10},
    { name: '15 Days', value:15},
    { name: '20 Days', value:20},
    { name: '30 Days', value:30},
  ];

  speedRange:any[]=[
    { name: 'Slow', value:1000},
    { name: 'Normal', value:500},
    { name: 'Fast', value:250}
  ];

  disabled:boolean=false;
  sliderVal:number=0;
  speedVal:number=500;


  
  constructor() {}

  ngOnInit() {//this.vesselSpeed.emit({speedValue:this.speedVal});
  }

  trackFn(mmsi,days){
    this.vesselMap.getVesselInfo(mmsi,days);
  }

  vesselAnimateFn(status){
    this.disabled=!this.disabled;
    if (this.disabled===false){this.sliderVal=0;this.speedVal=500;}
    if(status==='start'){
      this.vesselMap.startVessel(this.speedVal,this.sliderVal);
    }
    if(status==='stop'){
      this.vesselMap.stopVessel();
    }
  }

  vesselSpeedFn(speed){
    this.speedVal=speed;
    this.vesselMap.changeSpeed(speed);
  }

  vesselSliderFn(sliderValue){
    this.sliderVal=sliderValue;
    this.vesselMap.changePointer(this.speedVal,sliderValue);
  }  

}