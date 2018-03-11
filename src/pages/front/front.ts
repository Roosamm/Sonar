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

  searchQuery: string = '';
  items: string[];
  mediaArray: Array<string>;
  sonarArray: Array<string>;
  resultArray: Array<string>;
  listOfPages: string = "Events";
  public toggled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,  public menu: MenuController) {
    this.initializeItems();
    menu.enable(true);
    this.listOfPages = 'Events';
    this.toggled = false;
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
    this.resultArray = [];
    this.mediaProvider.getMediaByTag(event).subscribe(data =>(this.mediaArray = data));
    this.mediaProvider.getMediaByTag("Sonar").subscribe(stuff=>(this.sonarArray = stuff));

    for(let str in this.mediaArray){
      for(let tmp in this.sonarArray){
        if(str['tag'].equals(tmp['tag'])){
          this.resultArray.push(tmp);
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
