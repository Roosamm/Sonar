import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {User} from '../../app/models/user';
import {MediaProvider} from '../../providers/media/media';
import {FrontPage} from '../front/front';
import {HttpErrorResponse} from '@angular/common/http';
import {RegisterPage} from '../register/register';
import {topBar} from "../../app/topBar";
import {ShareProvider} from "../../providers/share/share";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = {
    password: '',
    username: '',
    location: '',
    email: ''
  };

  status: string;
  public toggled: boolean = false;
  public tb: topBar;

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider, public menu: MenuController, public shareService: ShareProvider) {
    menu.enable(true);
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu, this.shareService);
  }

  login () {
    this.mediaProvider.login(this.user).
    subscribe(response => {
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(FrontPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
      this.status = error.error.message;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData(localStorage.getItem('token')).subscribe(response => {
        this.navCtrl.setRoot(FrontPage);
        this.mediaProvider.logged = true;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
  }

  public toRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
