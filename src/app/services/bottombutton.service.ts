import { Platform } from "@ionic/angular";

export class BottomButtonService {

  isIos: boolean = false;

  constructor(private platform: Platform){

    platform.ready().then(() => {
      if (this.platform.is('ios')){

        this.isIos = true;

      }
    });

  }


}
