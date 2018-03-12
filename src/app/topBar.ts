import {MenuController, NavController} from "ionic-angular";
import {MediaProvider} from "../providers/media/media";
import {LoginPage} from "../pages/login/login";
import {Injectable} from "@angular/core";
import {ShareProvider} from "../providers/share/share";
import {FrontPage} from "../pages/front/front";

@Injectable()
export class topBar {
  public toggled: boolean = false;

  mediaArray: Array<string>= [];
  sonarArray: Array<string>= [];
  resultArray: Array<string>= [];
  allEvents: Array<string>= [];
  allPosts: Array<string>= [];
  public eventArray: Array<string> = [];
  public postArray: Array<string> = [];
  searchQuery: string;

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider, public menu: MenuController, public shareService: ShareProvider) {
    menu.enable(true);
  }

  //final search results are in eventArray and postArray
  getItems(event) {
    let query = event.target.value;
    this.searchItems(query);
  }

  searchItems(query: string){
    //empty arrays before performing a new search
    this.mediaArray.length=0;
    this.sonarArray.length=0;
    this.resultArray.length=0;
    this.allEvents.length=0;
    this.allPosts.length=0;
    this.eventArray.length=0;
    this.postArray.length=0;

    this.mediaProvider.getMediaByTag(query).subscribe(data => {
      this.mediaArray = data;
      this.mediaProvider.getMediaByTag("Sonar").subscribe(stuff => {
        this.sonarArray = stuff;
        for (let str of this.mediaArray) {
          for (let tmp of this.sonarArray) {
            if (str['filename'] == tmp['filename']) {
              this.resultArray.push(tmp);
            }
          }
        }
        this.mediaProvider.getMediaByTag("event").subscribe(data => {
          this.allEvents = data;
          this.mediaProvider.getMediaByTag("post").subscribe(data => {
            this.allPosts = data;
            for (let res of this.resultArray) {
              for (let evt of this.allEvents) {
                if (res['filename'] == evt['filename']) {
                  this.eventArray.push(evt)
                }
              }
              for (let post of this.allPosts) {
                if (res['filename'] == post['filename']) {
                  this.postArray.push(post)
                }
              }
            }
            this.shareService.postArray = this.postArray;
            this.shareService.eventArray = this.eventArray;
          });
        });
      });
    });
  }

  //function to open of of menus
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

  //redirectToLogin button reference
  redirectToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  redirectToFront() {
    this.navCtrl.setRoot(FrontPage);
  }

//open/hidden search bar
  toggle(): void {
    this.toggled = true;
  }

  onCancel(): void {
    this.toggled = false;
  }
}
