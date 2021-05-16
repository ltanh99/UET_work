import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetInfoService } from 'app/service/get-info.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    private getInfoService: GetInfoService,
    public router: Router
  ) { }

  form: any;
  companies;
  cover = [
    "https://cdn.nhanlucnganhluat.vn/uploads/images/74c337f8/720-400/2018-11/cong-ty-tnhh-phan-mem-fpt-softwave-vingarden-1.jpg"
  , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZLEuZFwzQ-Qytvg4SmNc09rtU0CVp1KbAA&usqp=CAU"
  ]
  img = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFx0pzEoOcvEJv49Qe2cDBGaa8nL2UtCsGQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJgW6m0i824p7j57H8jfagYDo4jC75xsAhA&usqp=CAU"

  ]
  ngOnInit(): void {
    this.form = new FormGroup({
      nameCompany: new FormControl("", null),
    })
    this.getInfoService.getCompanies(1,20,'').subscribe(res=> {
      this.companies = res.rows;
    })
  }

  searchCompany(){
    this.getInfoService.getCompanies(1,20,this.form.value["nameCompany"]).subscribe(res=> {
      this.companies = res.rows;
    })
  }
  showDetail(company) {
    this.router.navigate(['cong-ty/chi-tiet'],{queryParams: {id: company.company.id}})
  }
}
