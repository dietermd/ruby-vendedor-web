import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CONFIG } from './environments/environment';

import { IonicStorageModule } from '@ionic/storage';
import { Session } from './services/session.service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { DadosPage } from '../pages/dados/dados';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';

import { NavbarComponent } from '../components/navbar/navbar';
import { NavbarPopoverPage } from '../pages/navbar-popover/navbar-popover';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage,

    NavbarComponent,
    NavbarPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage,

    NavbarPopoverPage
  ],
  providers: [
    //SplashScreen,
    //StatusBar,
    Session,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
