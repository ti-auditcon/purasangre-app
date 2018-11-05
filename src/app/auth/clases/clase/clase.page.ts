import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // input = document.getElementById('inputEdit');

  focusInput(){
    document.getElementById('inputEdit').focus();
  }

}
