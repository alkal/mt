import { Injectable,ViewChild} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VesselRouteService {

  map: google.maps.Map;

  vPointer:number=0;
  infowindow = new google.maps.InfoWindow();
  marker:any=null;
  markerContent=new Array();
  markersTbl=new Array();

  constructor() { }

  //Present Vessel Path Line
  presentPath(locations){
    
    let flightPlanCoordinates=new Array();

    for (let i = 0; i < locations.length; i++) {  
      flightPlanCoordinates.push({lat:parseFloat(locations[i].lat),lng:parseFloat(locations[i].lng)});
    }
   
    let flightPath = new google.maps.Polyline({
      path:flightPlanCoordinates,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    return flightPath;
  }


  //Pop-up window-marker's content
  windowContent(speed,course,timestamp){
    let timeStampUTC=new Date(timestamp);
    let timeStampStr=timeStampUTC.toUTCString();
    let markerContent=`
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Speed:</strong> ${speed/10} knots</li>
        <li class="list-group-item"><strong>Course:</strong> ${course}&deg;</li>
        <li class="list-group-item"><strong>Timestamp:</strong> ${timeStampStr}</li>
      </ul>
    `;
    return markerContent;
  }

  //Draw Vessel Root Line
  drawRoot(locations,offsetVal){
    var linePath=new Array();
    var polygons=new Array();
    var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 4,
      strokeColor: 'red'
    };
    
    for (let i = 0; i < locations.length; i++) {
      linePath.push(new google.maps.LatLng(
          parseFloat(locations[i].lat),
          parseFloat(locations[i].lng)
      ));
    }

    polygons.push(new google.maps.Polyline({
      path: linePath,
      icons: [{
        icon: lineSymbol,
        offset: `${offsetVal}%`
      }]
    }));

    
    return polygons;
  }

  animateVessel(line,speed,pointer) {
    let listener = window.setInterval(function() {
      pointer = (pointer+1) % 200;
      this.vPointer=pointer;
      var icons = line.get('icons');
      icons[0].offset = (pointer) + '%';
      line.set('icons', icons);
      if(pointer==199){
        clearInterval(listener);
        line.setMap(null);
      }
     
    },speed);

    return listener;
  }

  animationVesselSpeed(line,speed) {
    let listener = window.setInterval(function() {
      this.vPointer = (this.vPointer+1) % 200;
      this.vPointer=this.vPointer;
      var icons = line.get('icons');
      icons[0].offset = (this.vPointer) + '%';
      line.set('icons', icons);
      if(this.vPointer==199){
        clearInterval(listener);
        line.setMap(null);
      }
     
    },speed);

    return listener;
  }


  

 
}
