import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';

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

  createSuccess = false;
  emailid='';// = { emailid: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

  public register() {
    console.log("emailid>>>>",this.emailid);
    this.auth.forgotPassword(this.emailid).subscribe(response => {
        console.log("forgotPassword.ts>>>>",response);
        if (response.status){
          console.log("response success>>forgotPassword.ts",response);

          this.createSuccess = true;
          this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
        } else {
          console.log("response fail>>forgotPassword.ts",response);
          this.createSuccess = false;
          this.showPopup("Error", response.message);
        }
      }/*,
       error => {
       this.showPopup("Error", error);
       });*/
    )
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
