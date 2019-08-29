import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DadosPage } from '../pages/dados/dados';

import { Session } from './services/session.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HomePage } from '../pages/home/home';
import { Usuario } from './models/usuario.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any;

  constructor(platform: Platform, private session: Session, private db: AngularFirestore) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
    });
  }

  ngOnInit() {
    this.session.get().then(res => {
      //console.log(res);
      if (res === null) {
        this.rootPage = LoginPage;
      } else {
        this.db.collection('vendedores').doc(res.uid).valueChanges().subscribe(doc => {
          const usuario: Usuario = new Usuario(doc);
          if (usuario.dadosCadastrados()) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = DadosPage;
          }
        });
      }
    });
  }
}

