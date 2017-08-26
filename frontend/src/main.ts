import 'core-js';
import 'zone.js';
import 'rxjs';

require('./assets/stylesheets/global.less');
import './assets/scripts/global';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((success: any) => console.log(`Bootstrap success`))
    .catch((err: any) => console.error(err));
