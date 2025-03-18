import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './app/enviroments/enviroments';
import { ServiceWorkerModule } from '@angular/service-worker';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .then(() => {
    if (environment.production) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }
  })
  .catch(err => console.error(err));
