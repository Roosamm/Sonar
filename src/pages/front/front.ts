import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {topBar} from "../../app/topBar";
import {ShareProvider} from "../../providers/share/share";


@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {


  items: string[];
  mediaArray: Array<string>= [];
  sonarArray: Array<string>= [];
  resultArray: Array<string>= [];
  public eventArray: Array<string> = [];
  public postArray: Array<string> = [];
  allEvents: Array<string>= [];
  allPosts: Array<string>= [];
  favourites: Array<string>= [];
  listOfPages: string;
  public tb: topBar;
  search: string;


  constructor(public navCtrl: NavController, public navParam: NavParams, public mediaProvider: MediaProvider, public menu: MenuController, public shareService: ShareProvider) {
    this.getEventFeed();
    this.getPostFeed();
    this.getFavourites();
    this.listOfPages = 'Events';
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu, this.shareService);
    this.search = navParam.get('category');
  }
  ionViewDidEnter() {
    if(this.search!=null){
      this.tb.searchItems(this.search);
    }
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
        this.shareService.eventArray = this.eventArray;
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
        this.shareService.postArray = this.postArray;
      });
    });
  }
  getFavourites(){
    this.mediaProvider.getFavourites(localStorage.getItem('token')).subscribe(data=>{
      this.favourites = data;
    })
  }
  isFavourite(evt){
    for(let fav of this.favourites){
      if (evt['file_id']==fav['file_id']){
        return true;
      }
    }
    return false;
  }
  getAmountOfFavourites(evt){
    this.mediaProvider.getAmountOfFavourites(evt['file_id']).subscribe(data=>{
      return data.length;
    });
  }

  removeFavourite(evt){
    this.mediaProvider.removeFavourite(evt['file_id'], localStorage.getItem('token')).subscribe(resp =>{
      this.getFavourites();
    })
  }
  addFavourite(evt){
    this.mediaProvider.addFavourite(evt['file_id'], localStorage.getItem('token')).subscribe(resp=>{
      this.getFavourites();
    })
  }

}
