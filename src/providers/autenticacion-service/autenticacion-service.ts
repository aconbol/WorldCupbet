import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AutenticacionServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AutenticacionServiceProvider Provider');
  }

  registrarUsuario(correo: string, clave: string) {
    return firebase.auth().createUserWithEmailAndPassword(correo, clave);
  }

  iniciarSesion(correo: string, clave: string){
    return firebase.auth().signInWithEmailAndPassword(correo, clave);
  }

  terminarSesion(){
    return firebase.auth().signOut();
  }
}
