import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {LoginPage} from '../login/login';

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

  items: string[];
  mediaArray: Array<string>;
  sonarArray: Array<string>;
  resultArray: Array<string>;
  eventArray: Array<string>;
  postArray: Array<string>;
  allEvents: Array<string>;
  allPosts: Array<string>;
  listOfPages: string = "Events";
  public toggled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,  public menu: MenuController) {
    this.initializeItems();
    menu.enable(true);
    this.getEventFeed();
    this.getPostFeed();
    this.listOfPages = 'Events';
  }

  initializeItems() {
    this.items = [
      'culture',
      'sport',
      'science',
      'food',
      'business',
      'animals'
    ];
  }
//final search results are in eventArray and postArray
  getItems(event) {
    //empty data holders and fetch new stuff
    this.resultArray = this.sonarArray = this.mediaArray = this.eventArray = this.postArray = this.allPosts = this.allEvents = [];
    this.mediaProvider.getMediaByTag(event).subscribe(data =>(this.mediaArray = data));
    this.mediaProvider.getMediaByTag("Sonar").subscribe(stuff=>(this.sonarArray = stuff));

    for(let str in this.mediaArray){
      for(let tmp in this.sonarArray){
        if(str['filename'].equals(tmp['filename'])){
          this.resultArray.push(tmp);
        }
      }
    }

    this.mediaProvider.getMediaByTag("event").subscribe(data=>(this.allEvents = data));
    this.mediaProvider.getMediaByTag("post").subscribe(data =>(this.postArray = data));

    for(let sonar in this.sonarArray){
      for(let evt in this.allEvents){
        if(sonar['filename'].equals(evt['filename'])){
          this.eventArray.push(evt)
        }
      }
      for(let post in this.allPosts){
        if(sonar['filename'].equals(post['filename'])){
          this.postArray.push(post)
        }
      }
    }
  }

  getEventFeed(){
    this.mediaProvider.getMediaByTag("Sonar").subscribe(data =>(this.sonarArray = data));
    this.mediaProvider.getMediaByTag("event").subscribe(data =>(this.allEvents = data));
    for(let sonar in this.sonarArray){
      for(let evt in this.allEvents){
        if(sonar['filename'].equals(evt['filename'])){
          this.eventArray.push(evt);
        }
      }
    }
  }
  getPostFeed(){
    this.mediaProvider.getMediaByTag("Sonar").subscribe(data =>(this.sonarArray = data));
    this.mediaProvider.getMediaByTag("post").subscribe(data =>(this.allPosts = data));
    for(let sonar in this.sonarArray){
      for(let post in this.allPosts){
        if(sonar['filename'].equals(post['filename'])){
          this.eventArray.push(post);
        }
      }
    }
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

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

//hidden search bar
  private toggle(): void {
    this.toggled = true;
  }

  private onCancel(): void {
    this.toggled = false;
  }
}
