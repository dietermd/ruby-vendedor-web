import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LocalizacaoPage } from '../localizacao/localizacao';


import { Session } from '../../app/services/session.service';
import { Usuario } from '../../app/models/usuario.model';


@Component({
  templateUrl: 'dados.html'
})

export class DadosPage implements OnInit {

  label: string = "Dados";
  private usuarioLogado: Usuario;
  private dadosFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private session: Session) { }

  ngOnInit() {    
    this.dadosFormGroup = new FormGroup({
      nomeResponsavel: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      nomeEstabelecimento: new FormControl('', [Validators.required])
    });
    this.session.get().then(res => {
      this.usuarioLogado = new Usuario(res);
      if(this.navParams.get('alterar')) {
        this.nomeResponsavel.setValue(this.usuarioLogado.nomeResponsavel);
        this.cnpj.setValue(this.usuarioLogado.cnpj);
        this.nomeEstabelecimento.setValue(this.usuarioLogado.nomeEstabelecimento);
      }
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