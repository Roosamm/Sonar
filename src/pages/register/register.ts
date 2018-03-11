import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {User} from '../../app/models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {FrontPage} from '../front/front';
import {UploadPage} from '../upload/upload';
import {ShareProvider} from "../../providers/share/share";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  photoUploaded = false;
  photoName: string;
  public toggled: boolean = false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController,
    public shareService: ShareProvider,
    public mediaProvider: MediaProvider) {
    if(shareService.fileID!=""){
      this.mediaProvider.getSingleMedia(shareService.fileID).subscribe(data => (this.photoName = data['filename']));
      this.photoUploaded = true;
    }
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
    if(this.shareService.fileID != ""){
      this.mediaProvider.updateInfo(this.shareService.fileID,this.user.username);
      this.mediaProvider.postTag("ProfilePic",localStorage.getItem('token'),this.shareService.fileID);
      this.shareService.fileID = "";
    }
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log('registered');
      this.navCtrl.setRoot(FrontPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  public captureImage() {
    this.navCtrl.push(UploadPage);

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

  //hidden search bar
  private toggle(): void {
    this.toggled = true;
  }

  private onCancel(): void {
    this.toggled = false;
  }
}
