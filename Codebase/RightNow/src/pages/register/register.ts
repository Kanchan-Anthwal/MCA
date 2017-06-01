import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import  { AuthService } from '../../providers/auth-service';

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
  createSuccess = false;
  registerCredentials = { emailid: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(response => {
      console.log("register.ts>>>>",response);
        if (response.status){
          console.log("response success>>register.ts",response);

      this.createSuccess = true;
          this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
        } else {
          console.log("falseeeee");
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
