import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureSensorDataComponent } from './temperature-sensor-data/temperature-sensor-data.component';
import { TemperatureViewDataComponent } from './temperature-view-data/temperature-view-data.component';


@NgModule({
  declarations: [TemperatureSensorDataComponent, TemperatureViewDataComponent],
  imports: [
    CommonModule
  ]
})
export class TemperatureSensorModule { }
