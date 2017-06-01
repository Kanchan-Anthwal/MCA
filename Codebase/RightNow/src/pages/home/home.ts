import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@IonicPage({name:'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public myItems: Array<string>;
  private counter: number;
  emailid = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    console.log("home page>>",info);
    this.emailid = info['emailid'];

    this.myItems = [];
    this.counter = 0;
    for (var i = 0; i < 10; i++) {
      this.myItems.push("data item "+ i);
      this.counter = i;
    }
  }
  public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
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
