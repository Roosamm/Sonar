import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {topBar} from "../../app/topBar";
import {ShareProvider} from "../../providers/share/share";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private userID: String;
  //TO DO:
  //create a default empty photo and set it below
  private profilePicFilename: String;
  private profilePicFileID: String;

  private email: String;
  private fullname: String;
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

  settingsOn() {
    this.settings = true;
  }
}
