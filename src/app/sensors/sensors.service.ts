import { Injectable } from '@angular/core';
import {
  MqttService,
  MQTT_SERVICE_OPTIONS,
  IMqttMessage,
} from 'ngx-mqtt';
import { BrowserModule } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';

export const MQTT_ServiceOptions = {
  hostname: '',
  port: 15675,
  protocol: 'ws',
  path: '/ws',
};

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private mensajes$ = new Subject<any>();
  private susbcription: Subscription;

  constructor(private mqttService: MqttService) {
    this.mqttService.connect(MQTT_SERVICE_OPTIONS);

    this.susbcription = this.mqttService
      .observe('casa/sensores')
      .subscribe((message: IMqttMessage) => {
        try {
          const payload = JSON.parse(message.payload.toLocaleString());
          this.mensajes$.next(payload);
        } catch (error) {
          console.error('Error parseando payload:', error);
        }
      });
  }

  getMensajes() {
    return this.mensajes$.asObservable();
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  } 
}
