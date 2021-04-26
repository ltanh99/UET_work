import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetInfoService } from 'app/service/get-info.service';

@Component({
  selector: 'app-news-of-company',
  templateUrl: './news-of-company.component.html',
  styleUrls: ['./news-of-company.component.css']
})
export class NewsOfCompanyComponent implements OnInit {

  @Input() id: any;
  listJob: Array<any>;
  constructor(
    private getInfo: GetInfoService,
    private router: Router
  ) { }

  tintd= [
    {
      newsid: 0,
      newName: "tin tuyển dụng 1",
      companyid: 1,
      position: "BA",
      salary: 10000000,
      place: "Ha noi",
      description: "tuấn anh tuấn anh tuấn anh tuấn anh tuấn anh hidden hidden hidden hiddennnnnnnnnnnnnnnnnnnnnn hidden hiddenhidden hiddenhidden hiddenhidden hidden ",
      expiredate: "2021-04-27",
      status: 1
  },
  ]
  ngOnInit(): void {
    this.getInfo.getJobByCompanyId(this.id).subscribe(res => {
      console.log(res);
      this.listJob = res.rows;
    })
  }

  sendData(item) {
    // this.data.setMessage(item);
    this.router.navigate(['cong-viec/chi-tiet'],{queryParams: {id: item.id}})
  }
}
