import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {LoadingController, MenuController, NavController,} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {DomSanitizer} from '@angular/platform-browser';
import {EditorProvider} from '../../providers/editor/editor';
import {ShareProvider} from "../../providers/share/share";
import {topBar} from "../../app/topBar";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  debug: string;
  imageData: string;
  url: string;
  image = this.renderer.createElement('img');
  canvas: any;
  isCanvasEmpty = true;
  public toggled: boolean = false;
  public tb: topBar;


  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private loadingCtrl: LoadingController,
              private mediaProvider: MediaProvider,
              public sanitizer: DomSanitizer,
              public shareService: ShareProvider,
              public editorProvider: EditorProvider, private renderer: Renderer2, public menu: MenuController,) {
    this.tb = new topBar(this.navCtrl, this.mediaProvider, this.menu, this.shareService);
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.editorProvider.setElements(this.canvas, this.image);
      this.imageData = imageData;
      this.editorProvider.setFile(this.imageData);
      //if image capture success
      this.isCanvasEmpty = false;
    }, (err) => {
      // canvas remains empty
      this.isCanvasEmpty = true;
      // Handle error
      console.error(err);
    });
  }

  upload() {
    // convert canvas to blob and upload
    this.canvas.toBlob(blob => {
      // create FormData-object
      const formData = new FormData();
      formData.append('file', blob);
      // add title and description to FormData object
      formData.append('title', 'SonarTMP');
      formData.append('description', 'SonarTMP');
      // send FormData object to API
      this.mediaProvider.upload(formData, localStorage.getItem('token')).subscribe(response => {
        this.shareService.fileID = response['file_id'];
        this.mediaProvider.postTag("Sonar", localStorage.getItem('token'), this.shareService.fileID).subscribe(resp => {
          setTimeout(() => {
            this.navCtrl.pop();
          },1500)
        })
      });
    }, 'image/jpeg', 0.5);

  }

  ionViewDidLoad() {
    // select element here, when it's ready
    this.canvas = this.canvasRef.nativeElement;
  }

}
