import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../global';
import 'rxjs/add/operator/map';


// import {Observable} from 'rxjs'


export class User{

  name: string;
  emailid: string;

  constructor(name: string,emailid:string){

    this.name=name;
    this.emailid=emailid;
  }
}


@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }


  currentUser: User;


  public login(credentials){
    console.log("login..........>>>>>>....",credentials);
    if(credentials.emailid==null || credentials.password==null){

      return Observable.throw("Please Insert credentials..");

    }else {
      return Observable.create(observer=>{

        var access;
        let url = AppSettings.USER_LOGIN+credentials.emailid+"/"+credentials.password;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.get(url).map(res => res.json()).subscribe(
          data => {
            console.log("data>>>>",data);
            if (data.status){
              this.currentUser = new User(data.username, data.email);
              access = true;
            }else{
              access=false;
            }
            observer.next(access);
            observer.complete();

          },
          error=>{
            console.log("error login>>>>>");
            observer.next(false);
            observer.complete();

          });


        });
    }
  }

  public register(credentials){
    console.log("@@@@@@@@@@",credentials);
    if (credentials.emailid === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer=>{

        let url = AppSettings.USER_REGISTER;
        var access;
        let body = JSON.stringify(credentials);
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(url,body,{headers}).map(res=>res.json()).subscribe(
          data=>{
            console.log("resisterrr>>>>",data);
            if (data.status){
              access = true;
            }else{
              access=false;
            }
            observer.next(access);
            observer.complete();
          },

          error=>{
            observer.next(false);
            observer.complete();

          }
        );


      });
      // return Observable.create(observer => {
      //
      //
      //
      //   observer.next(true);
      //   observer.complete();
      // });
    }

  }


  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }



}
