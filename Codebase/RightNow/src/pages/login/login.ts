import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'LoginPage'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;
  registerCredentials = { emailid: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  public createAccount() {
    console.log(">>>>>>>>>>>");
    this.nav.push('RegisterPage');
  }

  public forgotPassword() {
    console.log(">>>>>>>>>>>");
    this.nav.push('ForgotPasswordPage');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(response => {
        console.log("login.ts>>>>",response);
        if (response.status) {
          console.log("response success>>login.ts",response);
          this.nav.push('HomePage');
        } else {
          console.log("response fail>>login.ts",response);
          this.showError(response.message);
        }
      })

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',

      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
