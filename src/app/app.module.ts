import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { Queries } from './services/queries.service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { DadosPage } from '../pages/dados/dados';
import { LocalizacaoPage } from '../pages/dados/localizacao/localizacao';
import { ProdutosPage } from '../pages/produtos/produtos';
import { InserirProdutoPage } from '../pages/produtos/inserirProduto/inserirProduto';
import { AlterarProdutoPage } from '../pages/produtos/alterarProduto/alterarProduto';

import { NavbarComponent } from '../components/navbar/navbar';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage,
    ProdutosPage,
    InserirProdutoPage,
    AlterarProdutoPage,

    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    HomePage,
    DadosPage,
    LocalizacaoPage,
    ProdutosPage,
    InserirProdutoPage,
    AlterarProdutoPage
  ],
  providers: [
    //SplashScreen,
    //StatusBar,
    Queries,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
