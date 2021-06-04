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
  content;
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
    this.router.navigate(['tin-nhan'],{queryParams: {id: 'c'+ this.data.id + '-u'+ this.user.id,name: '--c'+this.data.fullName+'--u'+this.user.fullName, company: this.data.username}})
  }

  addRate() {
    if (this.content) {
      let body = {
        "content": this.content,
        "createdDate": new Date(),
        "namePerson": this.user.fullName
      }

      this.getInfo.addRate(body,this.data.id).subscribe(res => {
        if (res) {
          this.getInfo.getCompanyById(this.companyId).subscribe(res=> {
            this.data = res;
          })
        }
      })
    }
  }

}
