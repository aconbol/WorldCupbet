import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';

import { EquiposMonks } from "../../app/config/equiposMonks";

import firebase from "firebase";
import 'firebase/firestore';
import {GlobalsProvider} from "../../providers/globals/globals";

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html',
})
export class BetsPage {

  public db;
  public userLogin;
  public fixtures;
  public equipos = EquiposMonks;
  public grupos; //  se llama a grupos desde el html

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertaCtrl: AlertController,
              public globalProvider: GlobalsProvider) {
    let user = firebase.auth().currentUser;
    this.userLogin = user.email;
    this.db = this.globalProvider.firestoreDB;
    // const settings = { timestampsInSnapshots: true };
    // this.db.settings( settings );
    console.log('en bets.ts verificar login-correo', this.userLogin);
    this.db.collection('apuestas').doc(this.userLogin)
      .get()
      .then( partidos => {
        this.fixtures = partidos.data().data;
        console.log('Fixtures - constructor de bets.ts', partidos.data());
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BetsPage');
  }

  ionViewWillEnter(){
    this.grupos = '185';
  }

  getSrcBanderaEquipo(id: number): string {
    let srcB = null;
    this.equipos.forEach( equipo => {
      if (equipo.id === id) srcB = equipo.logo_path;
    });
    return srcB;
  }

  getNombreEquipo(id: number): string {
    let nomEq = null;
    this.equipos.forEach( equipo => {
      if (equipo.id === id) nomEq = equipo.name;
    });
    return nomEq;
  }

  guardarBets(fixtureBet) {
    let fix = { 'data': fixtureBet };
    // fix.data.push(fixtureBet);
    console.log('Un breve control - mus be delete', fix);
    this.db.collection('apuestas').doc(this.userLogin)
      .update(fix)
      .then(dato => {
        let alerta = this.alertaCtrl.create({
          title: 'GUARDADO RESULTADOS',
          subTitle: 'Sus predicciones se guardaron correctamente',
          message: 'Puede camnbiarlos si desea hacerlo, podrá efectuar sus actualizaciones ' +
                  'hasta un día antes de la inauguración',
          buttons: ['Ok']
        });
        alerta.present();
      })
      .catch( error => {
        console.log('Error en el update ', error)
      });
  }

}
