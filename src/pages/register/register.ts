import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {User} from '../../app/models/user';
import {HttpErrorResponse} from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  user: User = {
    username: '',
    email: '',
    password: '',
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
