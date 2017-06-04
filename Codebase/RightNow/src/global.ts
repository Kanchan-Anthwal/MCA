/**
 * Created by kanchan on 5/28/2017.
 */

export class AppSettings{

  public static ADMIN="rightnowapp2017@gmail.com";
  public static API_ENDPOINT='http://localhost:4004/';

  // routes
  public static USER=AppSettings.API_ENDPOINT+"user/";
  public static CATEGORY=AppSettings.API_ENDPOINT+"category/";

  //api
  public static USER_LOGIN=AppSettings.USER+"login/";
  public static USER_REGISTER=AppSettings.USER+"register/";
  public static USER_FORGOT_PASSWORD=AppSettings.USER+"forgotpass/";
  public static USER_CHANGE_PASSWORD=AppSettings.USER+"changepass/";


  public static ADD_CATEGORY=AppSettings.CATEGORY;
  public static GET_CATEGORY=AppSettings.CATEGORY;
  public static GET_ALL_CATEGORY=AppSettings.CATEGORY+"getall/";
  public static DELETE_CATEGORY=AppSettings.CATEGORY;






}
