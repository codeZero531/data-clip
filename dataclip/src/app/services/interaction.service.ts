import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private teacherMessageSource  = new Subject<any>();
  teacherMessage$ = this.teacherMessageSource.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this.teacherMessageSource.next(message);
  }
}
