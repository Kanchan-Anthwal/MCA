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
export class CategoryService {

  constructor(public http: Http) {
    console.log('Hello CategoryService Providermmmmmmmmmmmmmmmmm');
  }


  // currentUser: Category;


  public add(categoryObj){

    if(categoryObj.name==null || categoryObj.description==null){

      return Observable.throw("Please Insert categoryObj..");

    }else {
      return Observable.create(observer=>{

        var access;
        let url = AppSettings.ADD_CATEGORY;
        let body = JSON.stringify(categoryObj);

              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
console.log("add category body>>>",body);


        this.http.post(url,body,{headers}).map(res => res.json()).subscribe(
          data => {
            // console.log("CATEGORY ADD api response, data=>",data);
            // if (data.status){
            //   this.currentUser = new User(data.username, data.result[0].emailid);
            //   access = true;
            // }else{
            //   access=false;
            // }
            observer.next(data);
            observer.complete();

          },
          error=>{
            console.log("CATEGORY ADD response, error=>",JSON.parse(error._body));
            observer.next(JSON.parse(error._body));
            observer.complete();

          });


        });
    }
  }

  public delete(categoryObj){

    console.log("categoryObj",categoryObj);
    if(categoryObj==null){

      return Observable.throw("Please Insert categoryObj..");

    }else {



      return Observable.create(observer=>{

        var access;
        let url = AppSettings.DELETE_CATEGORY+categoryObj;
        // let body = JSON.stringify(categoryObj);
        //
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        console.log("add category body>>>",+categoryObj);


        this.http.delete(url).map(res => res.json()).subscribe(
          data => {
            console.log("CATEGORY delete api response, data=>",data);
            // if (data.status){
            //   this.currentUser = new User(data.username, data.result[0].emailid);
            //   access = true;
            // }else{
            //   access=false;
            // }
            observer.next(data);
            observer.complete();

          },
          error=>{
            console.log("CATEGORY ADD response, error=>",JSON.parse(error._body));
            observer.next(JSON.parse(error._body));
            observer.complete();

          });


      });
    }

  }
  public getAll(){


      return Observable.create(observer=>{

        var access;
        let url = AppSettings.GET_ALL_CATEGORY;


        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // console.log("add category body>>>",body);


        this.http.get(url).map(res => res.json()).subscribe(
          data => {
            console.log("CATEGORY get all api response, data=>",data);
            // if (data.status){
            //   this.currentUser = new User(data.username, data.result[0].emailid);
            //   access = true;
            // }else{
            //   access=false;
            // }
            observer.next(data);
            observer.complete();

          },
          error=>{
            console.log("CATEGORY ADD response, error=>",JSON.parse(error._body));
            observer.next(JSON.parse(error._body));
            observer.complete();

          });


      });

  }


/*  // public register(categoryObj){
  //   console.log("@@@@@@@@@@",categoryObj);
  //   if (categoryObj.emailid === null) {
  //     return Observable.throw("Please insert categoryObj");
  //   } else {
  //     // At this point store the categoryObj to your backend!
  //     return Observable.create(observer=>{
  //
  //       let url = AppSettings.USER_REGISTER;
  //       var access;
  //       let body = JSON.stringify(categoryObj);
  //       // let headers = new Headers({ 'Content-Type': 'application/json' });
  //
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //
  //       this.http.post(url,body,{headers}).map(res=>res.json()).subscribe(
  //         data=>{
  //           console.log("resisterrr>>>>",data);
  //           if (data.status){
  //             access = true;
  //           }else{
  //             access=false;
  //           }
  //           observer.next(data);
  //           observer.complete();
  //         },
  //
  //         error=>{
  //           console.log("register  api response, error=>",JSON.parse(error._body));
  //
  //           observer.next(JSON.parse(error._body));
  //           observer.complete();
  //
  //         }
  //       );
  //
  //
  //     });
  //     // return Observable.create(observer => {
  //     //
  //     //
  //     //
  //     //   observer.next(true);
  //     //   observer.complete();
  //     // });
  //   }
  //
  // }
  //
  //
  //
  // public forgotPassword(emailid){
  //   console.log("@@@@@@@@@@",emailid);
  //   if (emailid === null) {
  //     return Observable.throw("Please insert categoryObj");
  //   } else {
  //     // At this point store the categoryObj to your backend!
  //     return Observable.create(observer=>{
  //
  //       let url = AppSettings.USER_FORGOT_PASSWORD+emailid;
  //       var access;
  //       let body = {};
  //       // let headers = new Headers({ 'Content-Type': 'application/json' });
  //
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //
  //       this.http.put(url,body,{headers}).map(res=>res.json()).subscribe(
  //         data=>{
  //           console.log("forgotPassword>>>>",data);
  //           if (data.status){
  //             access = true;
  //           }else{
  //             access=false;
  //           }
  //           observer.next(data);
  //           observer.complete();
  //         },
  //
  //         error=>{
  //           console.log("register  api response, error=>",JSON.parse(error._body));
  //
  //           observer.next(JSON.parse(error._body));
  //           observer.complete();
  //
  //         }
  //       );
  //
  //
  //     });
  //     // return Observable.create(observer => {
  //     //
  //     //
  //     //
  //     //   observer.next(true);
  //     //   observer.complete();
  //     // });
  //   }
  //
  // }
  // public changePassword(password){
  //   console.log("@@@@@@@@@@",password);
  //   if (password === null) {
  //     return Observable.throw("Please insert categoryObj");
  //   } else {
  //     // At this point store the categoryObj to your backend!
  //     return Observable.create(observer=>{
  //
  //       let url = AppSettings.USER_CHANGE_PASSWORD+this.currentUser.emailid;
  //       var access;
  //       let body = {password:password};
  //       // let headers = new Headers({ 'Content-Type': 'application/json' });
  //
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //
  //       this.http.put(url,body,{headers}).map(res=>res.json()).subscribe(
  //         data=>{
  //           console.log("changePassword>>>>",data);
  //           if (data.status){
  //             access = true;
  //           }else{
  //             access=false;
  //           }
  //           observer.next(data);
  //           observer.complete();
  //         },
  //
  //         error=>{
  //           console.log("changepasword  api response, error=>",JSON.parse(error._body));
  //
  //           observer.next(JSON.parse(error._body));
  //           observer.complete();
  //
  //         }
  //       );
  //
  //
  //     });
  //     // return Observable.create(observer => {
  //     //
  //     //
  //     //
  //     //   observer.next(true);
  //     //   observer.complete();
  //     // });
  //   }
  //
  // }
  //
  // public getUserInfo() : User {
  //   return this.currentUser;
  // }
  //
  // public logout() {
  //   return Observable.create(observer => {
  //     this.currentUser = null;
  //     observer.next(true);
  //     observer.complete();
  //   });
  // }*/



}
