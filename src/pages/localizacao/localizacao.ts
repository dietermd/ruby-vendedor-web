import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NavParams } from 'ionic-angular'

import leaflet from 'leaflet';

@Component({
  templateUrl: 'localizacao.html'
})

export class LocalizacaoPage implements OnInit{

  label: string = "Localização";
  @ViewChild('map') mapContainer: ElementRef
  map: any
  private marker: any = leaflet.marker()

  constructor( private navParams: NavParams) {}

  ngOnInit() {
    console.log(this.navParams.get('cnpj'))
  }

  ionViewDidEnter() {
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      this.marker.setLatLng(this.map.getCenter()).on('click', () => {
        alert('Marker clicked');
      })
      this.marker.addTo(this.map)
      }).on('locationerror', (err) => {
        alert(err.message);
      }).on('move', (e) => {
        this.marker.setLatLng(this.map.getCenter())
      })
 
  }
}