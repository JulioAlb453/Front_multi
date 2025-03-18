import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class sensorService {
  private vapidPublicKey: string = environment.webPushPublicKey;
  private vapidPrivateKey: string = environment.webPushPrivateKey;
  private pushNotificationSubject = new Subject<any>(); // Creamos un Subject para emitir datos


  constructor() {
    this.initWebPush();
  }

  private initWebPush() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('service-worker.js') // Registra el service worker
        .then((registration) => {
          this.subscribeToPushNotifications(registration);
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error);
        });
    } else {
      console.warn('PushManager o ServiceWorker no son soportados en este navegador');
    }
  }

  // Suscribirse a notificaciones push
  private subscribeToPushNotifications(registration: ServiceWorkerRegistration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, // Las notificaciones serán visibles para el usuario
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      })
      .then((subscription) => {
        console.log('Suscripción exitosa:', subscription);
        // Aquí puedes enviar la suscripción al servidor para almacenarla y enviar notificaciones
        this.sendSubscriptionToServer(subscription);
      })
      .catch((error) => {
        console.error('Error al suscribirse a las notificaciones push:', error);
      });
  }

  // Convierte la clave pública VAPID en un formato adecuado
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Envía la suscripción al servidor
  private sendSubscriptionToServer(subscription: PushSubscription) {
    // Aquí debes enviar la suscripción a tu servidor para almacenarla y enviar notificaciones
    console.log('Enviando suscripción al servidor:', subscription);
  }

  // Maneja las notificaciones cuando el navegador está activo
  public showNotification(payload: any) {
    const notificationTitle = payload.title || 'Nueva notificación';
    const notificationOptions = {
      body: payload.body || 'Tienes un nuevo mensaje',
      icon: '/assets/icons/icon-72x72.png', // Ruta a un ícono
    };

    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  }

  public listenForPushNotifications(): Observable<any> {
    navigator.serviceWorker.addEventListener('push', (event: any) => {
      const payload = event.data ? event.data.json() : {};
      console.log('Notificación push recibida:', payload);
      this.pushNotificationSubject.next(payload); // Emitimos los datos recibidos
    });

    return this.pushNotificationSubject.asObservable(); // Retornamos un Observable para suscribirse
  }
  
  
}
