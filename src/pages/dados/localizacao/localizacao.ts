import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { HomePage } from '../../home/home';
import leaflet from 'leaflet';
import { Usuario } from '../../../app/models/usuario.model';
import { Queries } from '../../../app/services/queries.service';

@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html'
})

export class LocalizacaoPage implements OnInit {

  label: string = "Localização";
  @ViewChild('map') mapContainer: ElementRef
  map: any
  private marker: any = leaflet.marker()
  private dadosUsuario: Usuario;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private querries: Queries) { }

  ngOnInit() {
    this.dadosUsuario = new Usuario(this.navParams.get('dadosUsuario'));
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  inserirDados() {
    const latLng = this.marker.getLatLng();
    this.dadosUsuario.coordenada = { x: latLng.lng, y: latLng.lat };
    if (this.navParams.get('alterar')) {
      this.querries.alterarVendedor(this.dadosUsuario).subscribe(res => {
        console.log(res);
        this.finalizarDados(true);        
      });
    } else {
      this.querries.inserirVendedor(this.dadosUsuario).subscribe(res => {
        console.log(res);
        this.finalizarDados(false);
      });
    }

  }

  private finalizarDados(alterar: boolean) {
    const toast = this.toastCtrl.create({
      message: alterar ? 'Dados atualizados!' : 'Novos dados inseridos!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  private loadmap() {
    this.map = leaflet.map("map").fitWorld();

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    if (this.navParams.get('alterar')) {
      const latLngArr = [this.dadosUsuario.coordenada.y, this.dadosUsuario.coordenada.x]
      this.map.setView(latLngArr, 18);
      this.marker.setLatLng(latLngArr).addTo(this.map);
    } else {
      this.map.locate({
        setView: true,
        maxZoom: 15
      }).on('locationfound', () => {
        this.marker.setLatLng(this.map.getCenter()).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
      });
    }

    this.map.on('move', () => {
      this.marker.setLatLng(this.map.getCenter())
    });

  }
}