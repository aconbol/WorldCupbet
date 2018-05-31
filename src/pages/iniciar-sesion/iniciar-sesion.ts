import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { AutenticacionServiceProvider } from '../../providers/autenticacion-service/autenticacion-service';

@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html',
})
export class IniciarSesionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public autenticacionService: AutenticacionServiceProvider,
              public alertaCtrl: AlertController) {
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
      .then(info => console.log(info))
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
