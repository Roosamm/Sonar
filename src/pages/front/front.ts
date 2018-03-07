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

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
