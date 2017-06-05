import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common'

// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';
import  { PostService } from '../../providers/post-service';

import {NavController,NavParams,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';



/**
 * Generated class for the CategorydetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'CategoryDetailsPage'})
@Component({
  selector: 'page-categorydetails',
  templateUrl: 'categorydetails.html',
})
export class CategoryDetailsPage {

  categoryName='';
  currentUser;
  subscribedBtn=true;
  loading: Loading;
  postList=[];
  keys=[];


  constructor(private nav: NavController, private auth: AuthService,private post:PostService,private navParams:NavParams,
              private alertCtrl: AlertController,private loadingCtrl: LoadingController,location: PlatformLocation) {
    console.log("============navParams============",navParams);

    this.categoryName=navParams.data;
    this.currentUser=auth.getUserInfo();
    console.log("get ser info>>>",this.currentUser);
    console.log("this.currentUser.subscribed===undefined",this.currentUser.subscribed===undefined);

    location.onPopState(() => {

      this.getAllPost(this.categoryName);
      // alert('pressed back!');

    });



    if(this.currentUser.subscribed===undefined){
      this.subscribedBtn=true;
    }else{

      for(var i=0;i<this.currentUser.subscribed.length;i++){
        if(this.currentUser.subscribed[i]==this.categoryName){
          this.subscribedBtn=false;
        }
      }

      this.getAllPost(this.categoryName);
    }

  }

  public getAllPost(categoryName){
    this.showLoading();
    this.post.getAll(categoryName).subscribe(response => {
        if (response.status){

          this.postList=response.result;
          this.keys=Object.keys(response.result);
          this.loading.dismiss();


        } else {

          this.loading.dismiss();
        }
        return response;
      }
    )
  }
  createPost(){

    this.nav.push('AddPostPage',this.categoryName);

  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            /* if (this.createSuccess) {
             this.nav.popToRoot();
             }*/
          }
        }
      ]
    });
    alert.present();
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'

    });
    this.loading.present();
  }
   subscribe() {
    this.showLoading();

    let currentUser=this.auth.getUserInfo();
    this.auth.subscribe(this.categoryName).subscribe(response => {
      if (response.status){
         this.showPopup("Success", response.message);
        this.subscribedBtn=false;

        this.loading.dismiss();

      } else {
        this.showPopup("Error", response.message);
        this.loading.dismiss();
      }

    });
  }
  unSubscribe(){

    this.showLoading();

    this.auth.unSubscribe(this.categoryName).subscribe(response => {
      console.log("unsubscribe.ts>>>>//////////////////////////",response);
      if (response.status){
        this.showPopup("Success", response.message);
        this.subscribedBtn=true;
        this.loading.dismiss();

      } else {
        this.showPopup("Error", response.message);
        this.loading.dismiss();
      }

    });
  }
}
