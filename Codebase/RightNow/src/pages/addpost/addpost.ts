import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NavController,NavParams,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import  { PostService } from '../../providers/post-service';


/**
 * Generated class for the AddPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'AddPostPage'})
@Component({
  selector: 'page-add-post',
  templateUrl: 'addpost.html',
})
export class AddPostPage {

  loading: Loading;
  data='';
  categoryName='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private post:PostService,
              private alertCtrl: AlertController,private loadingCtrl: LoadingController) {

    this.categoryName=navParams.data;
    console.log("categoryname:>>",this.categoryName);

  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'

    });
    this.loading.present();
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
  addPost(){
    this.showLoading();

console.log("add post add categoryname>>>",this.categoryName);
    this.post.createPost(this.data,this.categoryName).subscribe(response => {
      console.log("add post.ts>>>>//////////////////////////",response);
      if (response.status){
        this.showPopup("Success", response.message);
        this.loading.dismiss();

      } else {
        this.showPopup("Error", response.message);
        this.loading.dismiss();
      }

    });
  }



}
