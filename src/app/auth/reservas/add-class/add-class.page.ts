import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})
export class AddClassPage implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  goToDay() {
    this.router.navigate(['/home/add-day']);
  }

}
