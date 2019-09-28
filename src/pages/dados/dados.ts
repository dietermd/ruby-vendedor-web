import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { LocalizacaoPage } from './localizacao/localizacao';
import { Usuario } from '../../app/models/usuario.model';

@Component({
  templateUrl: 'dados.html'
})
export class DadosPage implements OnInit {

  label: string;
  private dadosUsuario: Usuario;
  private dadosFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.dadosFormGroup = new FormGroup({
      nomeResponsavel: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      nomeEstabelecimento: new FormControl('', [Validators.required]),
      descricao: new FormControl('')
    });    
    if (this.navParams.get('alterar')) {
      this.dadosUsuario = new Usuario(this.navParams.get('dadosUsuario'));
      this.label = "Alterar Dados";
      this.nomeResponsavel.setValue(this.dadosUsuario.nome_responsavel);
      this.cnpj.setValue(this.dadosUsuario.cnpj);
      this.nomeEstabelecimento.setValue(this.dadosUsuario.nome_estabelecimento);
      this.descricao.setValue(this.dadosUsuario.descricao);     
    } else {
      this.label = "Inserir Dados";
      this.dadosUsuario = new Usuario({uid: this.afAuth.auth.currentUser.uid});
    }
  }

  get nomeResponsavel() { return this.dadosFormGroup.get('nomeResponsavel'); }
  get cnpj() { return this.dadosFormGroup.get('cnpj'); }
  get nomeEstabelecimento() { return this.dadosFormGroup.get('nomeEstabelecimento') }
  get descricao() { return this.dadosFormGroup.get('descricao') }

  inserirDados() {
    this.dadosUsuario.nome_responsavel = this.nomeResponsavel.value;
    this.dadosUsuario.nome_estabelecimento = this.nomeEstabelecimento.value;
    this.dadosUsuario.cnpj = this.cnpj.value;
    this.dadosUsuario.descricao = this.descricao.value;
    console.log(this.dadosUsuario);
    const dados = {
      alterar: this.navParams.get('alterar'),
      dadosUsuario: this.dadosUsuario
    };
    this.navCtrl.push(LocalizacaoPage, dados);
  }
}