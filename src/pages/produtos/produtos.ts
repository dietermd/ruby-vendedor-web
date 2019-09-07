import { Component, OnInit } from "@angular/core";
import { ModalController } from "ionic-angular";
import { Subscription } from "rxjs";

import { AngularFirestore } from "@angular/fire/firestore";
import { Session } from "../../app/services/session.service";

import { InserirProdutoPage } from "./inserirProduto/inserirProduto";
import { AlterarProdutoPage } from "./alterarProduto/alterarProduto";


@Component({
  templateUrl: 'produtos.html'
})
export class ProdutosPage implements OnInit {

  label: string = "Produtos";
  listaProdutos: any[];
  listaFiltrada: any[];
  private produtosSub: Subscription;

  constructor(private modalCtrl: ModalController, private db: AngularFirestore, private session: Session) {}

  ngOnInit() {    
    this.session.get().then(usuario => {
      this.produtosSub =  this.db.collection('produtos', ref => ref.where('uid', '==', usuario.uid)).snapshotChanges().subscribe(snap => {
        this.listaFiltrada = this.listaProdutos = snap.map(doc => {
          const id = doc.payload.doc.id;
          const data = doc.payload.doc.data();
          return { id, ...data };
        });
      });
    });
  }

  filtrarLista(event: any) {
    this.listaFiltrada = this.listaProdutos;
    const val = event.target.value;
    if(val && val.trim() != '') {
      this.listaFiltrada = this.listaProdutos.filter(produto => {
        return (produto.nomeProduto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  inserirProduto() {
    this.session.get().then(usuario => {
      const inserirProdutoModal = this.modalCtrl.create(InserirProdutoPage, {uid: usuario.uid});
      inserirProdutoModal.present();
    });
  }

  alterarProduto(produtoID: string) {
    this.session.get().then(usuario => {
      const alterarProdutoModal = this.modalCtrl.create(AlterarProdutoPage, {uid: usuario.uid, produtoID: produtoID});
      alterarProdutoModal.present();
    });    
  }

  ionViewDidLeave() {
    this.produtosSub.unsubscribe();
  }
}