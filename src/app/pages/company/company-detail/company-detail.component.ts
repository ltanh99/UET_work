import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetInfoService } from 'app/service/get-info.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  isIntroTab = true;
  companyId;
  data;
  user;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public getInfo: GetInfoService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("common-info"));
    this.companyId = this.route.snapshot.queryParamMap.get("id");
    this.getInfo.getCompanyById(this.companyId).subscribe(res=> {
      this.data = res;
    })
  }

  changeTab(e) {
    if (e == 0) {
      this.isIntroTab = true;
    } else {
      this.isIntroTab = false;
    }
  }

  gotoChat() {
    this.router.navigate(['tin-nhan'],{queryParams: {id: 'c'+this.data.id +'s'+ this.user.id,name: this.data.fullName + '$' + this.data.id + '$' + this.user.fullName +'$'+ this.user.id, company: this.data.username}})
  }

}
