import {Component} from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {User} from '../../app/models/user';
import {MediaProvider} from '../../providers/media/media';
import {FrontPage} from '../front/front';
import {HttpErrorResponse} from '@angular/common/http';
import {RegisterPage} from '../register/register';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public menu: MenuController) {
    menu.enable(true);
  }

  login () {
    this.mediaProvider.login(this.user).
    subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(FrontPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
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

  openMenu(evt) {
    if (evt === "menuCategories") {
      this.menu.enable(true, 'menuCategories');
      this.menu.enable(false, 'userMenu');
    } else {
      this.menu.enable(true, 'userMenu');
      this.menu.enable(false, 'menuCategories');
    }
    this.menu.toggle();
  }

  //hidden search bar
  private toggle(): void {
    this.toggled = true;
  }

  private onCancel(): void {
    this.toggled = false;
  }

}
