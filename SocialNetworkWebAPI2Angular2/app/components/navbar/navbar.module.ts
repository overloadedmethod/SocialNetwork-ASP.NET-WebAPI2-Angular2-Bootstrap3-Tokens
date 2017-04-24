//Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

//3rd Party
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';


//Components
import { NavbarComponent } from './navbar.component';


@NgModule({
    imports: [
        BrowserModule
        , Ng2BootstrapModule
        , ReactiveFormsModule
        , HttpModule
        //, RouterModule.forRoot(
        //    [
        //    //{ path: 'order', component: OrderComponent },
        //    //{ path: 'products', component: ProductComponent },
        //    //{ path: '', redirectTo: 'order', pathMatch: 'full' },
        //    //{ path: '**', redirectTo: 'order', pathMatch: 'full' }
        //    ])
    ],
    declarations: [NavbarComponent],
    bootstrap: [NavbarComponent]
})
export class NavbarModule { }