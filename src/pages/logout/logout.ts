import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontPage } from '../front/front';
import {MediaProvider} from '../../providers/media/media';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})

export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    localStorage.removeItem('token');
    this.mediaProvider.logged = false;
    this.navCtrl.setRoot(FrontPage);
  }

}
