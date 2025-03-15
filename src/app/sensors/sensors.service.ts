import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue } from 'firebase/database';
import { environment } from '../enviroments/enviroments';
import { initializeApp } from 'firebase/app';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private mensajes$ = new Subject<any>();

  constructor() {
    const app = initializeApp(environment.firebaseConfig);

    const database = getDatabase(app);

    const sensorAlertsRef = ref(database, 'sensor_alerts');

    onValue(sensorAlertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.mensajes$.next(data);
      }
    });
  }

  getMensajes() {
    return this.mensajes$.asObservable();
  }
}
