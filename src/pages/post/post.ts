import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {FrontPage} from '../front/front';
import {ProfilePage} from '../profile/profile';
import {UploadPage} from '../upload/upload';
import {Posts} from '../../app/models/posts';
import {ShareProvider} from "../../providers/share/share";
import {topBar} from "../../app/topBar";

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {


  public toggled: boolean = false;
  public tb: topBar;

  constructor(public navCtrl: NavController, public menu: MenuController, public mediaProvider: MediaProvider, public shareService: ShareProvider) {
    menu.enable(true);
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu);
  }

  post: Posts = {
    title: '',
    info: '',
    time: '',
    cost: '',
    capasity: '',
    interests: ''
  };

  public postIt() {
    if(this.shareService.fileID != ""){
      this.mediaProvider.updateInfo(this.shareService.fileID,this.post.title,this.post.info).subscribe(response => {
        this.mediaProvider.postTag(this.post.interests,localStorage.getItem('token'),this.shareService.fileID).subscribe(resp => {
          this.shareService.fileID = "";
          console.log('posted');
          this.navCtrl.setRoot(FrontPage);
          this.mediaProvider.logged = true;
        })
      });
    }
  }

  public captureImage() {
    this.navCtrl.push(UploadPage);
  }

  public cancel() {
      this.navCtrl.setRoot(FrontPage);
    }

}
