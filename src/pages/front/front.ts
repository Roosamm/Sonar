import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.initializeItems();
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
}
