import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  label: string = "Home";

  constructor(public navCtrl: NavController) {

  }

}
