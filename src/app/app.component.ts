import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { take } from 'rxjs/operators'
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { Usuario } from './models/usuario.model';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DadosPage } from '../pages/dados/dados';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Session } from './services/session.service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any;

  constructor(platform: Platform, private db: AngularFirestore, private afAuth: AngularFireAuth, private session: Session) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
    });
  }

  ngOnInit() {
    this.afAuth.user.pipe(take(1)).subscribe(user => {
      if (user) {
        this.db.collection('vendedores').doc(user.uid).valueChanges().pipe(take(1)).subscribe(doc => {
          const usuario: Usuario = new Usuario(doc);
          usuario.uid = user.uid;
          this.session.create(usuario);
          if (usuario.dadosCadastrados()) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = DadosPage;
          }
        });
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}

