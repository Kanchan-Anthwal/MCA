import { Component } from '@angular/core';
// import { IonicPage, NavController, AlertController } from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';
import { Utility } from '../../assets/utilities/utility'
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'ForgotPasswordPage'})
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotPasswordPage {
  loading: Loading;
  createSuccess = false;
  emailid='';// = { emailid: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,private loadingCtrl: LoadingController) { }

  public submit() {
    console.log("emailid for forgot emailid>>>>",this.emailid);
    this.showLoading();
    this.auth.forgotPassword(this.emailid).subscribe(response => {
        console.log("forgotPassword.ts>>>>",response);
        if (response.status){
          console.log("response success>>forgotPassword.ts",response);

          this.createSuccess = true;
          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          console.log("dismiss popupdddddddddddd fosgotpassword.tts");
          this.showPopup("Success", response.message);

          this.loading.dismiss();

        } else {
          console.log("response fail>>forgotPassword.ts",response);
          this.createSuccess = false;
          this.showPopup("Error", response.message);
          console.log("dismiss popup fosgotpassword.tts");
          this.loading.dismiss();
        }

      }/*,
       error => {/////////////
       this.showPopup("Error", error);
       });*/
    )
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
