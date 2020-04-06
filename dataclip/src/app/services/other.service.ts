import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtherService {
  private _prevRouter: string;

  get prevRouter(): string {
    return this._prevRouter;
  }

  set prevRouter(value: string) {
    this._prevRouter = value;
  }


  constructor() {
    console.log(this._prevRouter)
  }
}
