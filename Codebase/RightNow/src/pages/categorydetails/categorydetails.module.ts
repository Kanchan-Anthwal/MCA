import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryDetailsPage } from './categorydetails';

@NgModule({
  declarations: [
    CategoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryDetailsPage),
  ],
  exports: [
    CategoryDetailsPage
  ]
})
export class CategorydetailsPageModule {}
