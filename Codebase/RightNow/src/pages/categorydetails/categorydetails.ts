import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';
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


  constructor(private nav: NavController, private auth: AuthService,private navParams:NavParams,
              private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
    console.log("============navParams============",navParams);

    this.categoryName=navParams.data;
    this.currentUser=auth.getUserInfo();
    console.log("get ser info>>>",this.currentUser);
    console.log("this.currentUser.subscribed===undefined",this.currentUser.subscribed===undefined);

    if(this.currentUser.subscribed===undefined){
      this.subscribedBtn=true;
    }else{

      for(var i=0;i<this.currentUser.subscribed.length;i++){
        if(this.currentUser.subscribed[i]==this.categoryName){
          this.subscribedBtn=false;
        }
      }
    }

  }
  createPost(){

    this.nav.push('AddPostPage');

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
