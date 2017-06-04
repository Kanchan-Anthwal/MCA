import { Component } from '@angular/core';
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {AppSettings} from '../../global';
import { CategoryService } from '../../providers/category-service';
import { PlatformLocation } from '@angular/common'




@IonicPage({name:'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public myItems: Array<string>;
  private counter: number;
  emailid = '';
  hideAddCategoryBtn=true;
  categoriesList=[];
  keys=[];
  showList=true;
  loading: Loading;





  constructor(private nav: NavController, private auth: AuthService, private category: CategoryService,private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,location: PlatformLocation) {
    let info = this.auth.getUserInfo();
    //console.log("home page>>",info);
    this.emailid = info['emailid'];

    location.onPopState(() => {

      this.getAllCategory();
      // alert('pressed back!');

    });

    console.log("LOCATION>>>>",location);

    // this.myItems = [];
    // this.counter = 0;
    // for (var i = 0; i < 10; i++) {
    //   this.myItems.push("data item "+ i);
    //   this.counter = i;
    // }

    this.getAllCategory();


    if(this.emailid==AppSettings.ADMIN){
      this.hideAddCategoryBtn=false;

    }else{
      this.hideAddCategoryBtn=true;

    }
  }

  goToCategoryDetalisPage(categoryName){
    console.log("categoryName>>>>>",categoryName);
    this.nav.push('CategoryDetailsPage',categoryName);

  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'

    });
    this.loading.present();
  }
  public getAllCategory(){
    //console.log("get all category>>>>");
    this.showLoading();
    this.category.getAll().subscribe(response => {
        //console.log("getAllCategory.ts>>>>//////////////////////////",response);
        if (response.status){
          ////console.log("response success>>getAllCategory.ts",response);

          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          ////console.log("dismiss popupdddddddddddd getAllCategory",response.result);
          // this.showPopup("Success", response.message);
          this.categoriesList=response.result;
          this.keys=Object.keys(response.result);
          //console.log("&&&&&&&&&&&&&&&&&&&&&&",this.categoriesList);
          this.loading.dismiss();
          this.showList=true;


        } else {
          ////console.log("response fail>>getAllCategory.ts",response);
          // this.showPopup("Error", response.message);
          ////console.log("dismiss popup fosgotpassword.tts");
          this.showList=false;
          this.loading.dismiss();
        }
////console.log("returning response of get all category>>>>>>");
        return response;
      }
    )
  }

  addCategory(){
    this.nav.push('AddCategoryPage');
  }
  deleteCategory(){
    this.nav.push('DeleteCategoryPage');
}

  public onItemTap(args) {
    //console.log("------------------------ ItemTapped: " + args.index);
  }

  public changePassword(){
    this.nav.push('ChangePasswordPage');
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}
