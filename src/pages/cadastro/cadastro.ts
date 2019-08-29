import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, ToastController } from 'ionic-angular'
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { LoginPage } from '../login/login';

@Component({
    templateUrl: 'cadastro.html'
})
export class CadastroPage implements OnInit {
    
    label: string = "Cadastro";
    private cadastroFormGroup: FormGroup

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController, private afAuth: AngularFireAuth, private db: AngularFirestore) { }

    ngOnInit() {
        let EMAIL_VALIDATION = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        this.cadastroFormGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_VALIDATION)]),
            senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmaSenha: new FormControl('', [Validators.required])
        })
    }

    get email() { return this.cadastroFormGroup.get('email') }
    get senha() { return this.cadastroFormGroup.get('senha') }
    get confirmaSenha() { return this.cadastroFormGroup.get('confirmaSenha') }

    inscrever() {
        if (this.senha.value !== this.confirmaSenha.value) {
          const alert = this.alertCtrl.create({
              title: 'Senhas Diferentes!',
              subTitle: 'Verifique as senhas',
              buttons: ['OK']
          });
          alert.present()
          return
        }
        this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.senha.value).then(res => {
          this.db.collection('vendedores').doc(res.user.uid).set({});
          const toast = this.toastCtrl.create({
            message: 'Usuário cadastrado com sucesso!',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.setRoot(LoginPage);

        }).catch(error => {
            if(error.code === 'auth/email-already-in-use') {
              const alert = this.alertCtrl.create({
                title: 'Email já utilizado',
                subTitle: 'Este email já possui uma conta',
                buttons: ['OK']
              });
            alert.present();      
            }
        });
    }
}