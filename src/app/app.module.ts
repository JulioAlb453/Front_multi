import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './enviroments/enviroments';

import { AppComponent } from './app.component';
import { TemperatureSensorModule } from './sensors/temperatureSensor/temperature-sensor.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,  
    TemperatureSensorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
