import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular'

import { AngularFirestore } from '@angular/fire/firestore';

import { HomePage } from '../../home/home';

import leaflet from 'leaflet';

@Component({
  templateUrl: 'localizacao.html'
})

export class LocalizacaoPage implements OnInit{

  label: string = "Localização";
  @ViewChild('map') mapContainer: ElementRef
  map: any
  private marker: any = leaflet.marker()
  private dadosUsuario;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private db: AngularFirestore) {}

  ngOnInit() {
    this.dadosUsuario = this.navParams.get('dadosUsuario');
  }

  ionViewDidEnter() {
    this.loadmap();
  }
 
  inserirDados() {
    const latlng = this.marker.getLatLng();
    this.dadosUsuario.localizacao = latlng.lat + '|' + latlng.lng;
    this.db.collection('vendedores').doc(this.navParams.get('uid')).set(this.dadosUsuario);
    const toast = this.toastCtrl.create({
      message: 'Novos dados inseridos!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    if (this.navParams.get('alterar')) {
      const latLngArr = this.dadosUsuario['localizacao'].split('|');
      this.map.setView(latLngArr, 18);
      this.marker.setLatLng(latLngArr).addTo(this.map);
    } else {
      this.map.locate({
        setView: true,
        maxZoom: 15
      }).on('locationfound', (e) => {
        this.marker.setLatLng(this.map.getCenter()).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
      });
    }

    this.map.on('move', (e) => {
      this.marker.setLatLng(this.map.getCenter())
    })
 
  }
}