import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {FrontPage} from '../front/front';
import {ProfilePage} from '../profile/profile';
import {HttpErrorResponse} from '@angular/common/http';
import {UploadPage} from '../upload/upload';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public mediaProvider: MediaProvider) {
    menu.enable(true);
  }

  post: PostIt = {
    title: '',
    location: '',
    info: '',
    time: '',
    cost: '',
    capasity: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
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

  public post() {
    /*
    if(this.shareService.fileID != ""){
      this.mediaProvider.updateInfo(this.shareService.fileID,this.user.username);
      this.mediaProvider.postTag("ProfilePic",localStorage.getItem('token'),this.shareService.fileID);
      this.shareService.fileID = "";
    }*/
    this.mediaProvider.post(this.post).subscribe(response => {
      console.log('posted');
      this.navCtrl.setRoot(FrontPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  public captureImage() {
    this.navCtrl.push(UploadPage);
  }

  public cancel() {
    this.navCtrl.setRoot(ProfilePage);
  }

}
