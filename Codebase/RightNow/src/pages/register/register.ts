import { Component } from '@angular/core';
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'RegisterPage'})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  loading: Loading;
  createSuccess = false;
  registerCredentials = { emailid: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

  }

  register() {
    this.showLoading();
    this.auth.register(this.registerCredentials).subscribe(response => {
        if (response.status){
           this.createSuccess = true;
          this.showPopup("Success", response.message);

        } else {
          this.createSuccess = false;
          this.showPopup("Error", response.message);
        }
      this.loading.dismiss();
      }
    )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
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
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
