import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NavController,NavParams,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';


/**
 * Generated class for the InvitationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'InvitationPage'})
@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {

  loading: Loading;
  data='';
  categoryName='';
  toemailid='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthService,
              private alertCtrl: AlertController,private loadingCtrl: LoadingController) {

    this.categoryName=navParams.data;

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


    this.auth.invite(this.toemailid).subscribe(response => {
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
