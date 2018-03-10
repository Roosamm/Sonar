import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {User} from '../../app/models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {FrontPage} from '../front/front';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  user: User = {
    username: '',
    email: '',
    password: '',
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  public register() {
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log('registered');
      this.navCtrl.setRoot(FrontPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  public back() {
    this.navCtrl.setRoot(FrontPage);
  }

}
