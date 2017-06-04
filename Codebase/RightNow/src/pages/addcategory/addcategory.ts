import { Component } from '@angular/core';
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import  { CategoryService } from '../../providers/category-service';

/**
 * Generated class for the AddcategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'AddCategoryPage'})
@Component({
  selector: 'page-addcategory',
  templateUrl: 'addcategory.html',
})
export class AddcategoryPage {

  loading: Loading;
  createSuccess = false;
  categoryObj={name:'',description:''};

  constructor(private nav: NavController, private category: CategoryService, private alertCtrl: AlertController,private loadingCtrl: LoadingController) { }

  public addCategory() {
    this.showLoading();
    this.category.add(this.categoryObj).subscribe(response => {
        console.log("Addcategory.ts>>>>//////////////////////////",response);
        if (response.status){
          console.log("response success>>Addcategory.ts",response);

          this.createSuccess = true;
          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          console.log("dismiss popupdddddddddddd Addcategory//////////////.tts");
          this.showPopup("Success", response.message);

          this.loading.dismiss();

        } else {
          console.log("response fail>>Addcategory.ts",response);
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
