import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from  '@angular/router';



@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  constructor( public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    //console.log('entre amigos mios a la clase id:');
     //console.log(this.activatedRoute.snapshot);
     console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  // input = document.getElementById('inputEdit');

  focusInput(){
    document.getElementById('inputEdit').focus();
  }

}
