import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private messageSource = new Subject<any>();

  constructor() { }

  messageSource$ = this.messageSource.asObservable();

  public getMessage(): Observable<any> {
    return this.messageSource.asObservable();
  }

  public setMessage(message: any) {
    return this.messageSource.next(message);
  }
}
