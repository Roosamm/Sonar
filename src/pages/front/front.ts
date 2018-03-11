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
  public eventArray: Array<string> = [];
  public postArray: Array<string> = [];
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
    this.mediaProvider.getMediaByTag(event).subscribe(data =>{
      this.mediaArray = data;
      this.mediaProvider.getMediaByTag("Sonar").subscribe(stuff=>{
        this.sonarArray = stuff;
        for(let str of this.mediaArray){
          for(let tmp of this.sonarArray){
            if(str['filename'] == tmp['filename']){
              this.resultArray.push(tmp);
            }
          }
        }
        this.mediaProvider.getMediaByTag("event").subscribe(data=>{
          this.allEvents = data;
          this.mediaProvider.getMediaByTag("post").subscribe(data => {
            this.postArray = data;
            for(let res of this.resultArray){
              for(let evt of this.allEvents){
                if(res['filename'] == evt['filename']){
                  this.eventArray.push(evt)
                }
              }
              for(let post of this.allPosts){
                if(res['filename'] == post['filename']){
                  this.postArray.push(post)
                }
              }
            }
          });
        });
      });
    });
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
