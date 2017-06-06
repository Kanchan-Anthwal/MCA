import { Component } from '@angular/core';
import {AuthService} from '../../providers/auth-service';
import {NavController,AlertController,LoadingController,Loading,IonicPage,Alert,Platform} from 'ionic-angular';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var navigator: any;
declare var Connection: any;

@IonicPage({name:'LoginPage'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  loading: Loading;
  showHidePassLabel='Show Password';
  registerCredentials = { emailid: '', password: '' };
  showPasswordIsChecked=false;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,private platform: Platform) {

  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
    this.showHidePassLabel= input.type === 'password' ?  'Show Password' : 'Hide Password';
  }

  checkNetwork() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      let alert = this.alertCtrl.create({
        title: "Connection Status",
        subTitle:states[networkState],
        buttons: ['OK']
      });
      alert.present();
    });
  }

  forgotPassword() {
    this.nav.push('ForgotPasswordPage');
  }

   login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(response => {
        if (response.status) {
          this.nav.push('HomePage');
        } else {
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
