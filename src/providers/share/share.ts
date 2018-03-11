import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {
  get eventArray(): Array<string> {
    return this._eventArray;
  }

  set eventArray(value: Array<string>) {
    this._eventArray = value;
  }

  get postArray(): Array<string> {
    return this._postArray;
  }

  set postArray(value: Array<string>) {
    this._postArray = value;
  }
  get fileID(): string {
    return this._fileID;
  }

  set fileID(value: string) {
    this._fileID = value;
  }
  private _fileID: string;
  private _eventArray: Array<string>;
  private _postArray: Array<string>;


  constructor(public http: HttpClient) {

    this._fileID = "";
    this._eventArray = [];
    this._postArray = [];
  }
}
