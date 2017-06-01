/**
 * Created by kanchan on 6/1/2017.
 */


export class Utility{

 public static showLoading(instance) {
   instance.loading = instance.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
   instance.loading.present();
  }

}
