import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Session } from '../../app/services/session.service';

import { LoginPage } from '../../pages/login/login';



/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html',
})
export class NavbarComponent implements OnInit {

  @Input() label: string;
  usuarioLogado: boolean;

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private session: Session) {
    //console.log('Hello NavbarComponent Component');
  }

  ngOnInit() {
    this.session.get().then(usuario => {
      this.usuarioLogado = usuario ? true : false;
    })
    
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.session.remove();
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
