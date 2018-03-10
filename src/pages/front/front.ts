import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

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

  searchQuery: string = '';
  items: string[];
  mediaArray: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,  public menu: MenuController) {
    this.initializeItems();
    menu.enable(true);
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

  getItems(event) {
    this.mediaProvider.getMediaByTag(event).subscribe(data =>(this.mediaArray = data));
  }

  openMenu(evt) {
    if(evt === "menuCategories"){
      this.menu.enable(true, 'menuCategories');
      this.menu.enable(false, 'userMenu');
    }else{
      this.menu.enable(true, 'userMenu');
      this.menu.enable(false, 'menuCategories');
    }
    this.menu.toggle();
  }
}
