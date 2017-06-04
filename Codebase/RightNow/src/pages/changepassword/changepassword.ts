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
@IonicPage({name:'ChangePasswordPage'})
@Component({
  selector: 'page-ChangePassword',
  templateUrl: 'ChangePassword.html',
})
export class ChangePasswordPage {
  loading: Loading;
  createSuccess = false;
  // password='';// = { emailid: ''};
  currentPassword='';
  newPassword='';
  confirmPassword='';
  showPasswordIsChecked=false;
  showHidePassLabel='Show Password';


  constructor(private nav: NavController, private auth: AuthService,
              private alertCtrl: AlertController,private loadingCtrl: LoadingController) { }

  showPassword(inputCurrentPassword,inputNewPassword,inputConfirmPassword){
      console.log("Hide/Show Password>>>>>",inputCurrentPassword.type);
    inputCurrentPassword.type=inputNewPassword.type=inputConfirmPassword.type = inputCurrentPassword.type === 'password' ?  'text' : 'password';

    this.showHidePassLabel= inputCurrentPassword.type === 'password' ?  'Show Password' : 'Hide Password';
  }

  // showPassword(input: any,input1:any): any {
  //   console.log("Hide/Show Password>>>>>",input.type);
  //   input.type = input.type === 'password' ?  'text' : 'password';
  //   input1.type = input.type === 'password' ?  'text' : 'password';
  //   console.log("Hide/Show Password>>>>>",input.type);
  //   this.showHidePassLabel= input.type === 'password' ?  'Show Password' : 'Hide Password';
  //
  //
  //   // showHidePassLabel
  // }
  public submit() {
    this.showLoading();
    console.log("password for change emailid>>>>",this.currentPassword);
    let currentUser=this.auth.getUserInfo();
    console.log("currentUser>>>>",currentUser);
    console.log("this.currentPassword,currentUser.password",this.currentPassword,currentUser.password);

    console.log("this.currentPassword!==currentUser.password",this.currentPassword!==currentUser.password);
    if(currentUser){


      if(this.currentPassword!==currentUser.password){
        this.showPopup("Error","Current Password is Incorrect");
        this.loading.dismiss();
        return;

      }

      if(this.currentPassword===this.newPassword || this.currentPassword===this.confirmPassword){
        this.showPopup("Error","New Password is same as Current Password");
        this.loading.dismiss();
        return;
      }

      if(this.newPassword!==this.confirmPassword){
        this.showPopup("Error","New Password does not match with Confirm Password");
        this.loading.dismiss();
        return;
      }
    }

    this.auth.changePassword(this.newPassword).subscribe(response => {
        console.log("ChangePassword.ts>>>>//////////////////////////",response);
        if (response.status){
          console.log("response success>>ChangePassword.ts",response);

          this.createSuccess = true;
          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          console.log("dismiss popupdddddddddddd ChangePassword//////////////.tts");
          this.auth.setPassword(this.newPassword);
          this.showPopup("Success", response.message);

          this.loading.dismiss();

        } else {
          console.log("response fail>>ChangePassword.ts",response);
          this.createSuccess = false;
          this.showPopup("Error", response.message);
          console.log("dismiss popup fosgotpassword.tts");
          this.loading.dismiss();
        }
      console.log("CURRENT USER AFTER PASSWORD CHANGE>>>>",this.auth.getUserInfo());
      });
    console.log("USER AFTER CHANGING THE PASSWORD>>>>>>",this.auth.getUserInfo());
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
}
