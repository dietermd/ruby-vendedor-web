import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FIREBASE_CONFIG } from './environments/environment';

import { IonicStorageModule } from '@ionic/storage';
import { Session } from './services/session.service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { DadosPage } from '../pages/dados/dados';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage
  ],
  providers: [
    //SplashScreen,
    //StatusBar,  
    AngularFireDatabase,
    Session,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
