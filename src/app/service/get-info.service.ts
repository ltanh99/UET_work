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

   updateUser(user,id): Observable<any> {
     return this.http.put(this.apiEducation + 'api/v1/users/' + id,user)
   }
   getUserById(id): Observable<any> {
     return this.http.get(this.apiEducation + 'api/v1/users/' + id)
   }

   getEducation(page,size,searchValue?): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/educates'+'?page='+page+'&limit='+size+ '&searchValue='+searchValue); 
   }
   joinEducation(candId, educationId): Observable<any> {
    const headers = {'contest-type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'};
    return this.http.post(this.apiEducation +'api/v1/educates/'+educationId,{candidateId: candId}, {'headers':headers}); 
   }
   getEducationByCompanyId(id): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/educates/companies'+id+'/educates'); 
   }
  createProfile(id,body): Observable<any> {
    return this.http.post(this.apiEducation +'/api/v1/profiles/users/' + id, body); 
   }
   getEducationById(id): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/educates/'+id); 
   }
   getJobById(id): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/jobs/'+id); 
   }

   getJobByCompanyId(id):Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/jobs/companies/'+id+'/jobs'); 
   }

   getJobs(page,size,searchValue?): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/jobs'+'?page='+page+'&limit='+size+ '&searchValue='+searchValue); 
   }
   joinJobs(jobId,body): Observable<any> {
    return this.http.post(this.apiEducation +'api/v1/jobs/'+jobId+'/apply',body); 
   }

   getCompanyById(id): Observable<any> {
     return this.http.get('http://202.92.4.184:8585/RecruitmentAPI/api/v1/companies/'+id);
   }

   getCompanies(page,size,searchValue?): Observable<any> {
    return this.http.get(this.apiEducation +'api/v1/companies'+'?page='+page+'&limit='+size+ '&searchValue='+searchValue);
  }

  changePass(newPass, oldPass, userid): Observable<any> {
    return this.http.patch(this.apiEducation +'api/v1/users/'+userid+'/change-password',{"newPassword": newPass, "oldPassword": oldPass});
  }
}
