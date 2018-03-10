import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {User} from '../../app/models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {FrontPage} from '../front/front';
import {UploadPage} from '../upload/upload';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public menu: MenuController) {
    menu.enable(true);
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

  public captureImage() {
    this.navCtrl.setRoot(UploadPage);

  }

  public back() {
    this.navCtrl.setRoot(FrontPage);
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
}
