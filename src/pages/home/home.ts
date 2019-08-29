import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DadosPage } from '../dados/dados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  label: string = "Home";

  constructor(public navCtrl: NavController) {

  }

  alterarDados() {
    this.navCtrl.push(DadosPage, {alterar: true});
  }

}
