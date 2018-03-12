import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {topBar} from "../../app/topBar";
import {ShareProvider} from "../../providers/share/share";
import {UploadPage} from "../upload/upload";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private userID: string;
  //TO DO:
  //create a default empty photo and set it below
  private profilePicFilename: string;
  private profilePicFileID: string;
  private username: string;
  private email: string;
  private fullname: string;
  private favourites: Array<string>;
  private interests: Array<string>;
  public tb: topBar;

  private settings: boolean;

  constructor(private mediaProvider: MediaProvider, public menu: MenuController, public navCtrl: NavController, public shareService: ShareProvider) {
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu, this.shareService);
    this.getUserInformation();
    this.settings = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  getUserInformation(){
    this.mediaProvider.getUserData(localStorage.getItem('token')).subscribe(response =>{
      this.userID = response['user_id'];
      this.email = response['email'];
      this.fullname = response['full_name'];
      this.username = response['username'];
      this.mediaProvider.getMediaByTag("SonarProfile").subscribe(response=>{
        for(let media of response){
          if(media['user_id']==this.userID){
            this.profilePicFilename = media['filename'];
            this.profilePicFileID = media['file_id'];
          }
          this.mediaProvider.getFavourites(localStorage.getItem('token')).subscribe(response=>{
            this.favourites = response;
            this.mediaProvider.getTagByFile(this.profilePicFileID).subscribe(response =>{
              this.interests = response;
            })
          });
        }
      });
    });
  }

  public captureImage() {
    this.navCtrl.push(UploadPage);
  }

  changePhoto(){
    let token = localStorage.getItem('token');
    this.mediaProvider.updateInfo(this.shareService.fileID, this.username, this.fullname, token).subscribe(response =>{
      this.profilePicFileID = this.shareService.fileID;
      this.mediaProvider.getSingleMedia(this.profilePicFileID).subscribe(data =>{
        this.profilePicFilename = data['filename'];
        this.mediaProvider.postTag("ProfilePic",token,this.profilePicFileID);
        this.shareService.fileID="";
      })
    });
  }

  settingsOn() {
    if (this.settings) {
      this.settings = false;
    } else {
      this.settings = true;
    }
  }

  ionViewDidEnter(){
    if(this.shareService.fileID != "") {
      this.changePhoto();
    }
  }
}

