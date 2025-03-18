import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorDataComponent } from './sensors/temperatureSensor/temperature-sensor-data/temperature-sensor-data.component';

const routes: Routes = [
  {
    path: 'temperature', 
    component: TemperatureSensorDataComponent,
  },
  {
    path: '', 
    redirectTo: '/temperature',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}