import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteCategoryPage } from './deletecategory';

@NgModule({
  declarations: [
    DeleteCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteCategoryPage),
  ],
  exports: [
    DeleteCategoryPage
  ]
})
export class DeleteCategoryPageModule {}
