import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DadosPage } from '../dados/dados';
import { ProdutosPage } from '../produtos/produtos';

import { Queries } from '../../app/services/queries.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  label: string = "Home";

  constructor(private navCtrl: NavController, private queries: Queries) {}

  estoque() {     
    this.navCtrl.push(ProdutosPage);
  }

  alterarDados() {
    this.queries.obterVendedor().subscribe(res => {
      this.navCtrl.push(DadosPage, { alterar: true, dadosUsuario: res });
    });    
  }

}
