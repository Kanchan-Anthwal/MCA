import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Changepassword } from './changepassword';

@NgModule({
  declarations: [
    Changepassword,
  ],
  imports: [
    IonicPageModule.forChild(Changepassword),
  ],
  exports: [
    Changepassword
  ]
})
export class ChangepasswordModule {}
