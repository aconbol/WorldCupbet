import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { GoogleMaps } from "@ionic-native/google-maps";

import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { AutenticacionServiceProvider } from "../providers/autenticacion-service/autenticacion-service";

import { HomePage } from '../pages/home/home';
import { PartidosPage } from "../pages/partidos/partidos";
import { EstadiosPage } from "../pages/estadios/estadios";
import { EstadioGeoposPage } from "../pages/estadio-geopos/estadio-geopos";
import { ListaPartidosPage } from "../pages/lista-partidos/lista-partidos";
import { GruposPage } from "../pages/grupos/grupos";
import { EquipoPage } from "../pages/equipo/equipo";
import { JugadoresPage } from "../pages/jugadores/jugadores";
import { IniciarSesionPage } from "../pages/iniciar-sesion/iniciar-sesion";
import { BetsPage } from "../pages/bets/bets";
import { EstadisticasPage } from "../pages/estadisticas/estadisticas";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PartidosPage,
    EstadiosPage,
    EstadioGeoposPage,
    ListaPartidosPage,
    GruposPage,
    EquipoPage,
    JugadoresPage,
    EstadisticasPage,
    IniciarSesionPage,
    BetsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PartidosPage,
    EstadiosPage,
    EstadioGeoposPage,
    ListaPartidosPage,
    GruposPage,
    EquipoPage,
    JugadoresPage,
    EstadisticasPage,
    IniciarSesionPage,
    BetsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
    AutenticacionServiceProvider
  ]
})
export class AppModule {}
