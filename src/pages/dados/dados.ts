import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(private navCtrl: NavController, private session: Session) { }

  ngOnInit() {
    this.session.get().then(res => {
      this.usuarioLogado = new Usuario(res);
      console.log(this.usuarioLogado);
    });



    this.dadosFormGroup = new FormGroup({
      nomeResponsavel: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      nomeEstabelecimento: new FormControl('', [Validators.required])
    });
  }

  get nomeResponsavel() { return this.dadosFormGroup.get('nomeResponsavel'); }
  get cnpj() { return this.dadosFormGroup.get('cnpj'); }
  get nomeEstabelecimento() { return this.dadosFormGroup.get('nomeEstabelecimento') }

  inserirDados() {
    this.navCtrl.push(LocalizacaoPage, { nomeResponsvel: this.nomeResponsavel.value, cnpj: this.cnpj.value, nomeEstabelecimento: this.nomeEstabelecimento.value });
  }
}