import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-view-data',
  standalone: false,
  templateUrl: './temperature-view-data.component.html',
  styleUrl: './temperature-view-data.component.css'
})
export class TemperatureViewDataComponent {
  @Input() sensorData: any;

}
