import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './components/main/main.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { IdentityComponent } from './components/identity/identity.component';

platformBrowserDynamic().bootstrapModule(MainModule);
//platformBrowserDynamic().bootstrapModule(NavbarModule);

