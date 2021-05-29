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
    private route: ActivatedRoute,
    public getInfo: GetInfoService,
    public router: Router,
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

  goToMessage() {
    this.router.navigate(['tin-nhan'],{queryParams: {id: 'c'+ this.data.id + '$u'+ this.user.id,name: '$'+this.data.fullName+'$'+this.user.fullName}})
  }

}
