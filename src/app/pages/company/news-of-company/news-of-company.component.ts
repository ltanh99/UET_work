import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-of-company',
  templateUrl: './news-of-company.component.html',
  styleUrls: ['./news-of-company.component.css']
})
export class NewsOfCompanyComponent implements OnInit {

  constructor() { }

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
  }

}
