import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentInfo} from '../ts/student-info';
import { news }       from '../ts/news';
@Injectable({
  providedIn: 'root'
})
export class GetInfoService {
  private apiUrl: string = "http://localhost:8080/search";
  private apiNews: string = "http://localhost:8080/news";
  private apiEducation: string = "http://202.92.4.184:8585/RecruitmentAPI/";
  constructor(private http: HttpClient) {
  }

  getInfo(studentInfo: studentInfo): Observable<any>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 
                  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
                  };
    const body = studentInfo;
    return this.http.post(this.apiUrl, body,{'headers':headers});
   }
   getNews(): Observable<any>{
    const headers = {'contest-type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'};
    const body = [{"companyid": 1},{"companyid": 2}];
    return this.http.post(this.apiNews, body, {'headers':headers});
   }

   getEducation(page,size,searchValue?): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/educates'+'?page='+page+'&limit='+size+ '&searchValue='+searchValue); 
   }

   getCompanyById(id): Observable<any> {
     return this.http.get('http://202.92.4.184:8585/RecruitmentAPI/api/v1/companies/'+id);
   }
}
