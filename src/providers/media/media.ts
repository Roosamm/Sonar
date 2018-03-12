import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, ViewChild} from '@angular/core';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  @ViewChild('myNav') nav;

  logged = false;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(private http: HttpClient) {
  }

  login(user) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(this.apiUrl + '/login', user, settings);
  }

  register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  getUserData(token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  upload(formData, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  getAllMedia() {
    return this.http.get<Array<string>>(this.apiUrl + '/media');
  }

  getSingleMedia(id) {
    return this.http.get<Array<string>>(this.apiUrl + '/media/' + id);
  }

  postTag(tag, token, id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.apiUrl + '/tags',{"file_id": id,"tag": tag}, settings);
  }

  getTagByFile(id) {
    return this.http.get<Array<string>>(this.apiUrl + '/tags/file/' + id);
  }

  getMediaByTag(tag){
    return this.http.get<Array<string>>(this.apiUrl+'/tags/'+tag);
  }

  getFavourites(token){
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get<Array<string>>(this.apiUrl+ '/favourites', settings)
  }

  updateInfo(id: string, title: string, description: string, token){
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
      return this.http.post(this.apiUrl+'media/' + id, {
        "title": title,
        "decription": description
      },settings)
  }
}
