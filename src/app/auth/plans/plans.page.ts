//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, ElementRef, Renderer } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-pagos',
  templateUrl: 'plans.page.html',
  styleUrls: ['plans.page.scss']
})
export class PlansPage {

  public plans: any = '';
  public filteredPlans: any = '';
  public userPlans: any = '';
  public userActivePlan: any = '';
  public userActualPlan: any = '';
  public selectedFilter1 = false;
  public selectedFilter3 = false;
  public selectedFilter5 = false;
  public selectedFilter6 = false;

  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  customAlertOptions: any = {
    header: 'Clases'
  };

  classes: any[] = [
    {
      name: 'CrossFit'
    },
    {
      name: 'Frenetik'
    }
  ];

  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"/profile/actualplan", httpOptions)
        .subscribe((result: any) => {
          this.userActualPlan = result.data;
          console.log(this.userActualPlan);

        });
        this.http.get(SERVER_URL+"/plans?all=true", httpOptions)
        .subscribe((result: any) => {
          this.plans = result.data;
          console.log('entre todos los planes');
          console.log(this.plans);

          this.filteredPlans = this.plans.filter(plan => (plan.periodId == 1) && (plan.contractable) && (!plan.convenio) );
          console.log('filtrados:'+ this.filteredPlans);
        });

    });
  }

  planFilter(id:any){
    this.filteredPlans = this.plans.filter(
      plan => (plan.periodId == id) && (plan.contractable) && (!plan.convenio)
    );
    // this.selectedFilter1 = true;
  }

  goToDetail(id:any){
    this.router.navigate(['/home/plan-detail/'+id+'']);
  }

  goToHistorial(){
    this.router.navigate(['/home/pay-historial']);
  }


}
