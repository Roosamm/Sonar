import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {topBar} from "../../app/topBar";

/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {

  sonarArray: Array<string>;
  public eventArray: Array<string> = [];
  public postArray: Array<string> = [];
  allEvents: Array<string>;
  allPosts: Array<string>;
  listOfPages: string = "Events";
  public tb: topBar;


  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider, public menu: MenuController) {
    this.getEventFeed();
    this.getPostFeed();
    this.listOfPages = 'Events';
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu);
  }


  getEventFeed(){
    this.mediaProvider.getMediaByTag("Sonar").subscribe(data =>{
      this.sonarArray = data;
      this.mediaProvider.getMediaByTag("event").subscribe(data => {
        this.allEvents = data;
        for (let sonar of this.sonarArray) {
          for (let evt of this.allEvents) {
            if (sonar['filename'] == evt['filename']) {
              this.eventArray.push(evt);
            }
          }
        }
      });
    })
  }
  getPostFeed(){
    this.mediaProvider.getMediaByTag("Sonar").subscribe(data =>{
      this.sonarArray = data;
      this.mediaProvider.getMediaByTag("post").subscribe(data =>{this.allPosts = data;
        for(let sonar of this.sonarArray){
          for(let post of this.allPosts){
            if(sonar['filename'] == post['filename']){
              this.postArray.push(post);
            }
          }
        }
      });
    });
  }
<<<<<<< HEAD

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

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  toFront() {
    this.navCtrl.setRoot(FrontPage);
  }

//hidden search bar
  private toggle(): void {
    this.toggled = true;
  }

  private onCancel(): void {
    this.toggled = false;
  }
=======
>>>>>>> 75049fd45aae33ae5cb0908a5f8d9362733a7f1f
}
