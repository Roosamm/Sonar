import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {FrontPage} from '../front/front';
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


  public photoUploaded: boolean = false;
  public tb: topBar;
  postOrEvent: string;
  timeModel: string;
  photoName: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public mediaProvider: MediaProvider, public shareService: ShareProvider) {
    menu.enable(true);
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu, this.shareService);
    this.postOrEvent = 'event';
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
      if(this.postOrEvent == "event"){
        let tmpStr = this.post.info + "<br><b>When: </b>"+this.post.time + "<br><b>Cost: </b>"+this.post.cost +"<br><b>Capacity: </b>"+this.post.capasity;
        this.post.info = tmpStr;
      }
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
  ionViewDidEnter() {
    if(this.shareService.fileID!="") {
      this.mediaProvider.getSingleMedia(this.shareService.fileID).subscribe(data=>{
        this.photoName = data['filename'];
        this.photoUploaded = true;
        alert("photoUploaded is set to" + this.photoUploaded);
      })
    }
  }
}
