import 'core-js';
import 'reflect-metadata';
import 'zone.js';
import 'rxjs';

import './assets/stylesheets/global.less';
require('./assets/scripts/global')();

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(err => console.error(err));
