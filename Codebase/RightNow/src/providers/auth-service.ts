import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../global';
import 'rxjs/add/operator/map';


// import {Observable} from 'rxjs'


export class User{

  name: string;
  emailid: string;
  password:string;
  subscribed:any;

  constructor(name: string,emailid:string,password:string,subscribed:any){

    this.name=name;
    this.emailid=emailid;
    this.password=password;
    this.subscribed=subscribed;
  }
}


@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }


  currentUser: User;


  public login(credentials){
    if(credentials.emailid==null || credentials.password==null){

      return Observable.throw("Please Insert credentials..");

    }else {
      return Observable.create(observer=>{

        var access;
        let url = AppSettings.USER_LOGIN+credentials.emailid+"/"+credentials.password;
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.get(url).map(res => res.json()).subscribe(
          data => {
            console.log("login api response, data=>",data);
            if (data.status){
              this.currentUser = new User(data.result[0].name, data.result[0].emailid,data.result[0].password,
                data.result[0].subscribed);
              access = true;
            }else{
              access=false;
            }
            observer.next(data);
            observer.complete();

          },
          error=>{
            console.log("login api response, error=>",JSON.parse(error._body));
            observer.next(JSON.parse(error._body));
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
        credentials.subscribed=[];
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
            observer.next(data);
            observer.complete();
          },

          error=>{
            console.log("register  api response, error=>",JSON.parse(error._body));

            observer.next(JSON.parse(error._body));
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



  public forgotPassword(emailid){
    console.log("@@@@@@@@@@",emailid);
    if (emailid === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer=>{

        let url = AppSettings.USER_FORGOT_PASSWORD+emailid;
        var access;
        let body = {};
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put(url,body,{headers}).map(res=>res.json()).subscribe(
          data=>{
            console.log("forgotPassword>>>>",data);
            if (data.status){
              access = true;
            }else{
              access=false;
            }
            observer.next(data);
            observer.complete();
          },

          error=>{
            console.log("register  api response, error=>",JSON.parse(error._body));

            observer.next(JSON.parse(error._body));
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
  public changePassword(password){
    console.log("@@@@@@@@@@",password);
    if (password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer=>{

        let url = AppSettings.USER_CHANGE_PASSWORD+this.currentUser.emailid;
        var access;
        let body = {password:password};
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put(url,body,{headers}).map(res=>res.json()).subscribe(
          data=>{
            console.log("changePassword>>>>",data);
            if (data.status){
              access = true;
            }else{
              access=false;
            }
            observer.next(data);
            observer.complete();
          },

          error=>{
            console.log("changepasword  api response, error=>",JSON.parse(error._body));

            observer.next(JSON.parse(error._body));
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
  public setUserInfo(password){
    console.log("setting password after change>>>>>>",password);
    this.currentUser.password=password;

  }


  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }



}
