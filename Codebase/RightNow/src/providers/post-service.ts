/**
 * Created by Kanchan on 6/5/2017.
 */
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../global';
import 'rxjs/add/operator/map';

import  { AuthService } from './auth-service';


@Injectable()
export class PostService {



  constructor(public http: Http,private auth:AuthService) {
    console.log('Hello post service Providermmmmmmmmmmmmmmmmm');
  }


  public getAll(categoryName){


    return Observable.create(observer=>{

      var access;
      let url = AppSettings.GET_ALL_POST+categoryName;
      this.http.get(url).map(res => res.json()).subscribe(
        data => {
          console.log("post get all api response, data=>",data);

          observer.next(data);
          observer.complete();

        },
        error=>{
          console.log("post ADD response, error=>",JSON.parse(error._body));
          observer.next(JSON.parse(error._body));
          observer.complete();

        });


    });

  }

public createPost(data,categoryname) {


  return Observable.create(observer => {

    var access;
    let url = AppSettings.ADD_POST+this.auth.currentUser.emailid+"/"+categoryname;
    let body = JSON.stringify({data:data});

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(url,body,{headers}).map(res => res.json()).subscribe(
      data => {
        console.log("CATEGORY get all api response, data=>", data);

        observer.next(data);
        observer.complete();

      },
      error => {
        console.log("CATEGORY ADD response, error=>", JSON.parse(error._body));
        observer.next(JSON.parse(error._body));
        observer.complete();

      });


  });

}
}
