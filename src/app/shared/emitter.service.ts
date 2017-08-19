import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class SiblingSharing {

  private sharingWhat = new BehaviorSubject<any>(null);
  private isUserLogged = new BehaviorSubject<any>(null);
  private isHomePage = new BehaviorSubject<any>(null);

  currentData = this.sharingWhat.asObservable();
  currentUser = this.isUserLogged.asObservable();
  currentHomePage = this.isHomePage.asObservable();

  constructor() { }

  changeData(data: any) { this.sharingWhat.next(data) }
  changeUser(data: any) { this.isUserLogged.next(data) }
  changeHomePage(data: any) { this.isHomePage.next(data) }

}