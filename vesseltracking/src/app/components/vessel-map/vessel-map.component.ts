import { VesselRouteService } from './../../services/vessel-route.service';
import { Component,OnInit,Input,ViewChild} from '@angular/core';
import { VesselApiCallService } from '../../services/vessel-api-call.service';

@Component({
  selector: 'app-vessel-map',
  templateUrl: './vessel-map.component.html',
  styleUrls: ['./vessel-map.component.css']
})
export class VesselMapComponent implements OnInit {

  @Input('mmsi') mmsi:string; //External Value assign to mmsi
  @Input('trackDays') days:string; //External Value assign to mmsi
  @Input('animateStatus') status:string;
  @Input('sliderValue') sliderValue:number;
  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  
  lat: number;
  lng: number;
  listener:number;
  lineRoot:any;
  lineRootTbl=new Array();
  locations=new Array();
  markersTbl=new Array();
  animateFlag:boolean=false;
  vesselPath:any;
  errorMessage:string;

  vesselDetails:any={
    shipId: null,
    list: []
  };

  constructor(private service:VesselApiCallService,private vesselRoute:VesselRouteService){}

  ngOnInit() {
    // MAP Init
    var mapProp = {
      center: new google.maps.LatLng(51.678418, 7.809007),
      zoom: 3
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    if(this.sliderValue===undefined){this.sliderValue=0};
  }
  
  getVesselInfo(mmsi,days){

    this.deleteMarkers();
    this.ngOnInit();
    
    //Get Vessel Details from API CALL
    this.service.getVesselDetails(mmsi,days)
    .subscribe(
      response=>{
        this.vesselDetails.list=response.json();
        this.vesselDetails.shipId=this.vesselDetails.list[0].SHIP_ID;
        
        let infowindow = new google.maps.InfoWindow();
        let marker:any=null;
        let markerContent=new Array();

        this.locations=[];


        //Create table with all vessel locations
          for(let i=0;i<this.vesselDetails.list.length;i++){
            this.locations.push({
              lat:this.vesselDetails.list[i].LAT,
              lng:this.vesselDetails.list[i].LON,
              speed:this.vesselDetails.list[i].SPEED,
              course:this.vesselDetails.list[i].COURSE,
              timestamp:this.vesselDetails.list[i].TIMESTAMP
            });
          }
          
        //Create marker for its vessel location
          for (let i = 0; i < this.locations.length; i++) {
            let iconSelection=i===this.locations.length-1?'assets/shipMarker.png':'assets/shipMarkerRoot.png';
            
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng),
              map: this.map,
              icon:iconSelection
            });

            this.markersTbl.push(marker);

            markerContent.push(this.vesselRoute.windowContent(this.locations[i].speed,this.locations[i].course,this.locations[i].timestamp));

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(markerContent[i]);
                infowindow.open(this.map, marker);
              }
              
            })(marker, i));
          }

        //Present vessel locations root
          this.vesselPath=this.vesselRoute.presentPath(this.locations);
          this.vesselPath.setMap(this.map);


        //Present vessel locations root
          this.map.setCenter(new google.maps.LatLng(this.locations[0].lat, this.locations[0].lng));
          this.map.setZoom(6);
          
        },
        error=>{
          if(error.status===404){
            this.errorMessage=`Vessel's details could not be retrieved`;
          }
          else{
            this.errorMessage=`An unexpected error occured.`;
          }
        }
      );
  }

  setMapOnAll=(map)=>{
    for (var i = 0; i < this.markersTbl.length; i++) {
      this.markersTbl[i].setMap(map);
    }
  }

  clearMarkers=()=>{
    this.setMapOnAll(null);
  }

  showMarkers=()=>{
    this.setMapOnAll(this.map);
  }

  deleteMarkers=()=>{
    this.clearMarkers();
    this.markersTbl=[];
  }
  
//Draw vessel root
  drawRootLine=()=>{
    this.lineRoot=this.vesselRoute.drawRoot(this.locations,this.sliderValue);
    for (let i=0;i<this.lineRoot.length;i++){
      this.lineRootTbl.push(this.lineRoot[i]);
      this.lineRoot[i].setMap(this.map);
    }
  }

//Clear vessel root
  deleteRootLine=()=>{
    for (let i=0;i<this.lineRoot.length;i++){
      this.lineRootTbl[i].setMap(null);
      this.lineRoot[i].setMap(null);
    }
    this.lineRootTbl=[];
    this.lineRoot=[];
  }

  //Animated Map Symbol
  animateSymbol=(speedOption,sliderValue)=>{
    for(let i=0;i<this.lineRootTbl.length;i++){
      this.listener=this.vesselRoute.animateVessel(this.lineRootTbl[i],speedOption,sliderValue);
    }
  }

  //Animated Map Symbol with specific speed
  animationSpeed=(speedOption)=>{
    for(let i=0;i<this.lineRootTbl.length;i++){
      this.listener=this.vesselRoute.animationVesselSpeed(this.lineRootTbl[i],speedOption);
    }
  }

  //START vessel's animated root
  startVessel(speedOption,sliderValue){
    this.clearMarkers();
    this.drawRootLine();
    this.animateSymbol(speedOption,sliderValue);
  }

  //Vessel Pointer changed
  changePointer(speedOption,sliderValue){
    window.clearInterval(this.listener);
    this.animateSymbol(speedOption,sliderValue);
  }

  //Vessel Speed changed
  changeSpeed(speedOption){
    window.clearInterval(this.listener);
    this.animationSpeed(speedOption);
  }

  //STOP vessel's animated root
  stopVessel(){
    window.clearInterval(this.listener);
    this.showMarkers();
    this.deleteRootLine();
    this.sliderValue=0;
  }

}
