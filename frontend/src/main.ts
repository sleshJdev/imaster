import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs/Rx';

// Statics
import 'rxjs/add/observable/throw';

// // Operators
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module.ts';

platformBrowserDynamic().bootstrapModule(AppModule);
