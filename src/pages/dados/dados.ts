import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators'

import { LocalizacaoPage } from './localizacao/localizacao';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  templateUrl: 'dados.html'
})

export class DadosPage implements OnInit {

  label: string;
  private usuarioLogado = null;
  private dadosFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {    
    this.dadosFormGroup = new FormGroup({
      nomeResponsavel: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      nomeEstabelecimento: new FormControl('', [Validators.required])
    });
    this.afAuth.user.pipe(take(1)).subscribe(user => {
      this.db.collection('vendedores').doc(user.uid).get().pipe(take(1)).subscribe(doc => {
        //console.log(doc.id, user.uid)
        this.usuarioLogado = doc.data();
        this.usuarioLogado.uid = doc.id;
        if(this.navParams.get('alterar')) {
          this.label = "Alterar Dados";
          this.nomeResponsavel.setValue(this.usuarioLogado.nomeResponsavel);
          this.cnpj.setValue(this.usuarioLogado.cnpj);
          this.nomeEstabelecimento.setValue(this.usuarioLogado.nomeEstabelecimento);
        } else {
          this.label = "Inserir Dados";
        }
      });
    });
  }

  get nomeResponsavel() { return this.dadosFormGroup.get('nomeResponsavel'); }
  get cnpj() { return this.dadosFormGroup.get('cnpj'); }
  get nomeEstabelecimento() { return this.dadosFormGroup.get('nomeEstabelecimento') }

  inserirDados() {
    const dados = {
      alterar: this.navParams.get('alterar'),
      uid: this.usuarioLogado.uid, 
      dadosUsuario: { nomeResponsavel: this.nomeResponsavel.value, cnpj: this.cnpj.value, nomeEstabelecimento: this.nomeEstabelecimento.value, localizacao: this.usuarioLogado.localizacao }
    };
    this.navCtrl.push(LocalizacaoPage, dados);
  }
}