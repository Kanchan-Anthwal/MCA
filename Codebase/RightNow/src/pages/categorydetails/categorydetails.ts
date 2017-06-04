import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategorydetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({name:'CategoryDetailsPage'})
@Component({
  selector: 'page-categorydetails',
  templateUrl: 'categorydetails.html',
})
export class CategoryDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("========================",navCtrl);

  }



}
