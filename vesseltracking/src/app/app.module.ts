import { VesselRouteService } from './services/vessel-route.service';
import { VesselApiCallService } from './services/vessel-api-call.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { VesselMapComponent } from './components/vessel-map/vessel-map.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminFormComponent,
    VesselMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    VesselApiCallService,
    VesselRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
