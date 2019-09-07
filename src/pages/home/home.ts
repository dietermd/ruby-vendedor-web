import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DadosPage } from '../dados/dados';
import { ProdutosPage } from '../produtos/produtos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  label: string = "Home";

  constructor(public navCtrl: NavController) {

  }

  estoque() {
    this.navCtrl.push(ProdutosPage);
  }

  alterarDados() {
    this.navCtrl.push(DadosPage, {alterar: true});
  }

}
