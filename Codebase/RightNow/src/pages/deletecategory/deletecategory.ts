import { Component } from '@angular/core';
import {NavController,AlertController,LoadingController,Loading,IonicPage} from 'ionic-angular';
import  { CategoryService } from '../../providers/category-service';

/**
 * Generated class for the AddcategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'DeleteCategoryPage'})
@Component({
  selector: 'page-deletecategory',
  templateUrl: 'deletecategory.html',
})
export class DeleteCategoryPage {

  loading: Loading;
  createSuccess = false;
  showList=true;
  categoryObj={name:'',description:''};
  categories='';
  categoriesList=[];
  keys=[];
  selectedCategories=[];

  constructor(private nav: NavController, private category: CategoryService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

    // //console.log("get all category>>>>>>>>>>");
    var dummy=this.getAllCategory();
    // //console.log("get all category>>>>>>>>>>",this.categoriesList);


  }


  checkList(element) {
    console.log("checkbox clicked>>tttttttttt", element, this.selectedCategories.length);
    this.selectedCategories=[];
    this.selectedCategories.push(element);
    console.log("this.selectedCategories ",this.selectedCategories);

/*    let deleted=false;

    if (this.selectedCategories.length <= 0) {
      this.selectedCategories.push(element);
    } else {

    for (let i = 0; i < this.selectedCategories.length; i++) {
      // console.log("element===this.selectedCategories[i]", element === this.selectedCategories[i]);
      if (element === this.selectedCategories[i]) {
        console.log("before deleting>>>>>>>>>>>>",this.selectedCategories);
        console.log("deleted>>>>>>>>>>>><<<<<<<<<<<<<",element);
        this.selectedCategories.splice(i,1);
        deleted=true;
        console.log("after deleting>>>>>>>>>>>>",this.selectedCategories);

      }
    }
    if(!deleted){
      this.selectedCategories.push(element);
    }
  }*/
    console.log("checkbox final>>",this.selectedCategories);

  }

  public deleteCategory() {
    if(this.selectedCategories && this.selectedCategories.length<=0){
      this.showPopup("Info", "Please Select Category");
    }else{
    this.showLoading();
    this.category.delete(this.selectedCategories).subscribe(response => {
        //console.log("deletecategory.ts>>>>//////////////////////////",response);
        if (response.status){
          //console.log("response success>>deletecategory.ts",response);

          this.createSuccess = true;
          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          //console.log("dismiss popupdddddddddddd deletecategory//////////////.tts");
          this.showPopup("Success", response.message);

          this.loading.dismiss();

        } else {
          //console.log("response fail>>deletecategory.ts",response);
          this.createSuccess = false;
          this.showPopup("Error", response.message);
          //console.log("dismiss popup fosgotpassword.tts");
          this.loading.dismiss();
        }
        this.selectedCategories=[];
        this.categoriesList=[];
        this.keys=[];
        this.getAllCategory();

      }/*,
       error => {/////////////
       this.showPopup("Error", error);
       });*/
    )
  }
  }

  public getAllCategory(){
    console.log("get all category>>>>");
    this.showLoading();
    this.category.getAll().subscribe(response => {
        console.log("getAllCategory.ts>>>>//////////////////////////",response);
        if (response.status){
          //console.log("response success>>getAllCategory.ts",response);

          this.createSuccess = true;
          // this.showPopup("Success", response.message);
          // this.nav.push('LoginPage')
          //console.log("dismiss popupdddddddddddd getAllCategory",response.result);
          // this.showPopup("Success", response.message);
this.categoriesList=response.result;
this.keys=Object.keys(response.result);
console.log("&&&&&&&&&&&&&&&&&&&&&&",this.categoriesList);
          this.loading.dismiss();
          this.showList=true;


        } else {
          //console.log("response fail>>getAllCategory.ts",response);
          this.createSuccess = false;
          // this.showPopup("Error", response.message);
          //console.log("dismiss popup fosgotpassword.tts");
          this.showList=false;
          this.loading.dismiss();
        }
//console.log("returning response of get all category>>>>>>");
        return response;
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
