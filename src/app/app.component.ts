import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from "firebase";

import { AutenticacionServiceProvider } from "../providers/autenticacion-service/autenticacion-service";

import { HomePage } from '../pages/home/home';
import { PartidosPage } from "../pages/partidos/partidos";
import { EstadiosPage } from "../pages/estadios/estadios";
import { EquipoPage } from "../pages/equipo/equipo";
import { GruposPage } from "../pages/grupos/grupos";
import { IniciarSesionPage } from "../pages/iniciar-sesion/iniciar-sesion";
import { BetsPage } from "../pages/bets/bets";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  usuarioConectado:boolean = false;
  rootPage: any = HomePage;

  pages: Array<{title: string, icono: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public autenticacionService: AutenticacionServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', icono: 'home', component: HomePage },
      { title: 'Partidos', icono: 'football', component: PartidosPage },
      { title: 'Estadios', icono: 'map', component: EstadiosPage },
      { title: 'Equipos', icono: 'people', component: EquipoPage },
      { title: 'Fase de Grupos', icono: 'globe', component: GruposPage },
    ];

  }

  initializeApp() {
    /**
     * Firebase Conexión
     */
    firebase.initializeApp({
      apiKey: "AIzaSyCzW8yPu3Dlztw_A4uxjF26NoAsIKMP_OM",
      authDomain: "worldcupbet-c1705.firebaseapp.com",
      databaseURL: "https://worldcupbet-c1705.firebaseio.com",
      projectId: "worldcupbet-c1705",
      storageBucket: "worldcupbet-c1705.appspot.com",
      messagingSenderId: "1043577611235"
    });
    /**
     * Verificar el estado de la sesión
     */
    firebase.auth().onAuthStateChanged(
      usuario => {
        if (usuario != null){
          this.usuarioConectado = true;
          this.nav.setRoot(HomePage);
        }
        else {
          this.usuarioConectado = false;
          // this.contenido.setRoot(this.iniciarSesion);
        }
      }
    );
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openPageLogin() {
    this.nav.setRoot(IniciarSesionPage);
  }

  openPageBets() {
    this.nav.setRoot(BetsPage);
  }

  terminarSesion(){
    this.autenticacionService.terminarSesion();
  }

}
