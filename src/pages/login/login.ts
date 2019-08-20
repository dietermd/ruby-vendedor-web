import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';

import { AngularFireAuth } from '@angular/fire/auth';
import { Session } from '../../app/services/session.service';
import { Usuario } from '../../app/models/usuario.model';


@Component({
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    private usuario: Usuario;
    private loginFormGroup: FormGroup;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private afAuth: AngularFireAuth, private session: Session) {

    }

    ngOnInit() {
        this.loginFormGroup = new FormGroup({
            email: new FormControl('', [Validators.required]),
            senha: new FormControl('', [Validators.required])
        });
    }
    get email() { return this.loginFormGroup.get('email') }
    get senha() { return this.loginFormGroup.get('senha') }

    logar() {
        this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.senha.value).then(res => {
            console.log(res);
            this.usuario = new Usuario();
            this.usuario.uid = res.user.uid;
            this.session.create(this.usuario);
            this.navCtrl.setRoot(HomePage);
        }).catch(error => {
            const alert = this.alertCtrl.create({
                title: 'Erro',
                subTitle: 'Email ou senha incorretos',
                buttons: ['OK']
            });
            alert.present();
        });
    }

    cadastro() {
        this.navCtrl.push(CadastroPage);
    }
}