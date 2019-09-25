import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { take } from 'rxjs/operators';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DadosPage } from '../pages/dados/dados';

import { AngularFireAuth } from '@angular/fire/auth';
import { Queries } from './services/queries.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any;

  constructor(platform: Platform, private afAuth: AngularFireAuth, private queries: Queries) {
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
        this.queries.obterVendedor().subscribe(res => {   
          if (res) {
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

