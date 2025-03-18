import { Component, OnInit, OnDestroy } from '@angular/core';
import { sensorService } from '../../sensors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-temperature-sensor-data',
  standalone: false,
  templateUrl: './temperature-sensor-data.component.html',
  styleUrls: ['./temperature-sensor-data.component.css'],
})
export class TemperatureSensorDataComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Para manejar la suscripción
  public sensorData: any; // Almacena los datos del sensor
  public objectKeys = Object.keys; // Función para iterar sobre las claves de un objeto

  constructor(private sensorsService: sensorService) {}

  ngOnInit() {
    // Nos suscribimos al observable del servicio
    this.subscription = this.sensorsService.listenForPushNotifications().subscribe(
      (data: any) => {
        console.log('Datos recibidos en el componente:', data); // Depuración
        this.sensorData = data; // Actualizamos los datos cuando hay un cambio
      },
      (error: any) => {
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