import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from "./data.service";
import {User} from "./user";
import {HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from "./navigation/navigation.component";

import {CookieService} from 'ngx-cookie-service';

import { DragulaModule } from 'ng2-dragula';
import { Subscription } from "rxjs";
import { AppTouchGoalDirective } from './app-touch-goal.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    routingComponents,
    AppTouchGoalDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DragulaModule.forRoot(),
  ],
  providers: [DataService, User, CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
