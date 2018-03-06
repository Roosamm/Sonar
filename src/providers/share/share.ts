import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {
  get fileID(): string {
    return this._fileID;
  }

  set fileID(value: string) {
    this._fileID = value;
  }
  private _fileID: string;


  constructor(public http: HttpClient) {

    this._fileID = "Blank";

  }
}
