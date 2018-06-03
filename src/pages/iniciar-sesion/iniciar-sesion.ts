import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { AutenticacionServiceProvider } from '../../providers/autenticacion-service/autenticacion-service';
import 'firebase/firestore';
import { GlobalsProvider } from "../../providers/globals/globals";

import { Fixtures } from "../../app/config/fixtures";

@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html',
})
export class IniciarSesionPage {

  private fixtures = Fixtures;
  public db;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public autenticacionService: AutenticacionServiceProvider,
              public alertaCtrl: AlertController,
              public globalProvider: GlobalsProvider) {
    this.db = this.globalProvider.firestoreDB;
  }

  iniciarSesion(formLogin: NgForm){
    this.autenticacionService.iniciarSesion(
            formLogin.value.correo,
            formLogin.value.clave)
      .then(info => console.log(info))
      .catch(error => {
        let alerta = this.alertaCtrl.create({
          title: 'ERROR DE INICIO DE SESION',
          subTitle: 'Revisar Usuario y Contraseña',
          message: 'El Correo o Contraseña no son correctos' + error,
          buttons: ['Ok']
        });
        alerta.present();
      })
  }

  registrarUsuario(formulario: NgForm) {
    this.autenticacionService.registrarUsuario(
      formulario.value.correo,
      formulario.value.clave )
      .then(info => {
        this.db.collection('apuestas')
            .doc(formulario.value.correo)
            .set(this.fixtures);
        console.log(info)
      })
      .catch(error => {
        let alerta = this.alertaCtrl.create({
          title: 'ERROR DE INICIO DE SESION',
          subTitle: 'Error en autenticación',
          message: 'Error en autenticación' + error,
          buttons: ['Ok']
        });
        alerta.present();
      })
  }

}
