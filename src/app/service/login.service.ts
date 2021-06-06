import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'app/pages/student-info/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private apiUrl: string = "http://128.199.207.230:8585/RecruitmentAPI/api/v1/authentication/login";
  private apiUrl: string = "http://202.92.4.184:8585/RecruitmentAPI/api/v1/authentication/login";
  constructor(private http: HttpClient) { }

  studentLogin(student: Student): Observable<any>{
    // const headers = {'contest-type': 'application/json'};
    // const body = student;
    // return this.http.post(this.apiUrl, body,{'headers':headers})
    return this.http.post(this.apiUrl,{"username":student.username,"password":student.password});
  }
}
