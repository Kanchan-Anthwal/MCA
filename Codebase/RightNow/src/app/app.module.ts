import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule  } from '@angular/http';


import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';

//Added
import {AuthService} from '../providers/auth-service';
import {CategoryService} from '../providers/category-service';
import {PostService} from '../providers/post-service';



@NgModule({
  declarations: [
    MyApp
   // HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CategoryService,
    PostService
  ]
})
export class AppModule {}
