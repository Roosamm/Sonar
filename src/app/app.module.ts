import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {File} from '@ionic-native/file';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {MediaProvider} from '../providers/media/media';
import {FrontPage} from "../pages/front/front";
import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
import {UploadPage} from "../pages/upload/upload";
import {PostPage} from "../pages/post/post";
import {RegisterPage} from "../pages/register/register";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {EditorProvider} from '../providers/editor/editor';
import {Camera} from "@ionic-native/camera";
import {Geolocation} from '@ionic-native/geolocation';
import {ShareProvider} from '../providers/share/share';
import {PipesModule} from '../pipes/pipes.module';
import {LogoutPage} from '../pages/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FrontPage,
    LoginPage,
    ProfilePage,
    UploadPage,
    PostPage,
    RegisterPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FrontPage,
    LoginPage,
    ProfilePage,
    UploadPage,
    PostPage,
    RegisterPage,
    LogoutPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    EditorProvider,
    File,
    Geolocation,
    ShareProvider,
  ]
})
export class AppModule {}
