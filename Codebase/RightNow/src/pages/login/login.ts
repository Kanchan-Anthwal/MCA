import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              private loadingCtrl: LoadingController,private platform: Platform) { }

  public createAccount() {
    console.log(">>>>>>>>>>>");
    this.nav.push('RegisterPage');
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';

    this.showHidePassLabel= input.type === 'password' ?  'Show Password' : 'Hide Password';


    // showHidePassLabel
  }

  checkNetwork() {
    console.log("checking internet connection");
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
      // let alert = Alert.create({
      //   title: "Connection Status",
      //   subTitle: states[networkState],
      //   buttons: ["OK"]
      // });

      let alert = this.alertCtrl.create({
        title: "Connection Status",
        subTitle:states[networkState],
        buttons: ['OK']
      });
      alert.present();
    });
  }

  public forgotPassword() {
    console.log(">>>>>>>>>>>");
    this.nav.push('ForgotPasswordPage');
  }

  public login() {
    this.showLoading();
    // this.checkNetwork();
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
