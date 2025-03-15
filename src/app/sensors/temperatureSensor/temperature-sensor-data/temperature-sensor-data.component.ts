import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorsService } from '../../sensors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-temperature-sensor-data',
  standalone: false,
  templateUrl: './temperature-sensor-data.component.html',
  styleUrls: ['./temperature-sensor-data.component.css']
})
export class TemperatureSensorDataComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  public sensorData: any;  // Aquí guardaremos los datos del sensor

  constructor(private sensorsService: SensorsService) {}

  ngOnInit() {
    // Nos suscribimos al observable del servicio
    this.subscription = this.sensorsService.getMensajes().subscribe(
      (data) => {
        this.sensorData = data;  // Actualizamos los datos cuando hay un cambio
      },
      (error) => {
        console.error('Error al obtener los datos del sensor:', error);
      }
    );
  }

  ngOnDestroy() {
    // Nos desuscribimos para evitar pérdidas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
