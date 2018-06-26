import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class VesselApiCallService {

  private callUrl= "http://services.marinetraffic.com/api/exportvesseltrack";
  private apiKey= "cf8f05df0b57bfae43e762cc61fd381239c4c042";
  private protocol="jsono";

  constructor(private http:Http) { }

  getVesselDetails(mmsi, days){
    return this.http.get(this.callUrl+`/${this.apiKey}`+`/days:${days}`+`/mmsi:${mmsi}`+`/protocol:${this.protocol}`);
  }

}
