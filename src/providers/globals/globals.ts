import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
  public firestoreDB: any;
  constructor() {
    console.log('Hello GlobalsProvider Provider');
  }

}
