import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'app/pages/student-info/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "http://localhost:8080/authenticate";
  constructor(private http: HttpClient) { }

  studentLogin(student: Student): Observable<any>{
    const headers = {'contest-type': 'application/json'};
    const body = student;
    return this.http.post(this.apiUrl, body,{'headers':headers})
  }
}
