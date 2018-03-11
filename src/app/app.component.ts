import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {FrontPage} from "../pages/front/front";
import {ProfilePage} from "../pages/profile/profile";
import {PostPage} from "../pages/post/post";
import {LogoutPage} from '../pages/logout/logout';
import {RegisterPage} from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = FrontPage;

  searchInput = '';


  @ViewChild(Nav) nav: Nav;


  pages: Array<{ title: string, component: any }>;
  userProfMenu: Array<{ title: string, component: any }>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: FrontPage},
      {title: 'Culture', component: FrontPage},
      {title: 'Sport', component: FrontPage},
      {title: 'Science', component: FrontPage},
      {title: 'Food', component: FrontPage},
      {title: 'Business', component: FrontPage},
      {title: 'Animals', component: FrontPage}
    ];

    this.userProfMenu = [
      {title: 'Profile', component: ProfilePage},
      {title: 'New post', component: PostPage},
      {title: 'Settings', component: ProfilePage},
      {title: 'Log out', component: LogoutPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
