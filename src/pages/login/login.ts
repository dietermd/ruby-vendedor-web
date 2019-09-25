import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { DadosPage } from '../dados/dados';

import { AngularFireAuth } from '@angular/fire/auth';
import { Queries } from '../../app/services/queries.service';


@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  label: string = "Login";
  private loginFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private afAuth: AngularFireAuth, private queries: Queries) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });    
  }
  get email() { return this.loginFormGroup.get('email') }
  get senha() { return this.loginFormGroup.get('senha') }

  logar() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.senha.value).then(authRes => {
      this.queries.obterVendedor().subscribe(res => {
        if (res) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.setRoot(DadosPage);
        }
      });
    }).catch((error) => {
      if(error.code = 'auth/wrong-password'){
        const alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Email ou senha incorretos',
          buttons: ['OK']
        });
        alert.present();
      }      
    });
  }

  cadastro() {
    this.navCtrl.push(CadastroPage);
  }
}