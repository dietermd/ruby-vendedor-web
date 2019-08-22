import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(private navCtrl: NavController, private session: Session) {
    //console.log('Hello NavbarComponent Component');
  }

  ngOnInit() {
    this.session.get().then(res => {
      if(res) {
        this.usuarioLogado = true;
      } else {
        this.usuarioLogado = false;
      }
    })
    
  }

  logout() {
    this.session.remove();
    this.navCtrl.setRoot(LoginPage);
  }

}
