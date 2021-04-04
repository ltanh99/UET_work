import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Student} from './student-info/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private apiUrl: string = "localhost:8080/authenticate";
  constructor(private http: HttpClient) { }

  studentLogin(student: Student): Observable<any>{
    const headers = {'contest-type': 'application/json'};
    const body = JSON.stringify(student);
    console.log("body");
    return this.http.post(this.apiUrl + 'student', body,{'headers':headers})
  }
}
