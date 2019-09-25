import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalController } from "ionic-angular";

import { InserirProdutoPage } from "./inserirProduto/inserirProduto";
import { AlterarProdutoPage } from "./alterarProduto/alterarProduto";

import { Queries } from "../../app/services/queries.service";


@Component({
  templateUrl: 'produtos.html'
})
export class ProdutosPage implements OnInit {

  label: string = "Produtos";
  private listaProdutos: any[];
  listaFiltrada: any[];
  @ViewChild('searchBar') searchBar: ElementRef;

  constructor(private modalCtrl: ModalController, private queries: Queries) {}

  ngOnInit() {
    this.preencherLista();
  }

  private preencherLista() {
    this.queries.obterTodosProdutos().subscribe((res: any[]) => {
      this.listaProdutos = res;
      this.filtrarLista();
    });
  }

  filtrarLista() {
    this.listaFiltrada = this.listaProdutos;
    //const val = event.target.value;
    const val = this.searchBar['_searchbarInput'].nativeElement.value;
    if(val && val.trim() != '') {
      this.listaFiltrada = this.listaProdutos.filter(produto => {
        return (produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  inserirProduto() {
    new Promise(resolve => {
      const inserirProdutoModal = this.modalCtrl.create(InserirProdutoPage, {uid: this.queries.obterUid(), resolve: resolve});
      inserirProdutoModal.present();
    }).then(inseriu => {
      if(inseriu) {
        this.preencherLista();
      }
    });  
  }

  alterarProduto(produtoID: number) {
    this.queries.obterProduto(produtoID).subscribe(res => {
      new Promise(resolve => {
        const alterarProdutoModal = this.modalCtrl.create(AlterarProdutoPage, {produto: res, resolve: resolve});
        alterarProdutoModal.present();
      }).then(alterou => {
        if(alterou) {
          this.preencherLista();
        }
      });
    });
  }
}