import { Component, OnInit } from '@angular/core';
import { news } from 'app/ts/news';
import { GetInfoService} from '../../service/get-info.service';
import {enableProdMode} from '@angular/core';



@Component({
  selector: 'tin-td-cmp',
  moduleId: module.id,
  templateUrl: './tin-td.component.html',
  styleUrls: ['./tin-td.component.css']
})
export class TinTdComponent implements OnInit {

  tintd= [
    {
      newsid: 2,
      companyid: 1,
      position: "BA",
      salary: 10000000,
      place: "Ha noi",
      description: null,
      expiredate: "2021-04-27",
      status: 1
  },
  {
      newsid: 3,
      companyid: 1,
      position: "PM",
      salary: 10000000,
      place: "Da Nang",
      description: null,
      expiredate: "2021-04-27",
      status: 1
  },
  {
      newsid: 4,
      companyid: 1,
      position: "Data Science",
      salary: 10000000,
      place: "Ha noi",
      description: null,
      expiredate: "2021-04-27",
      status: 1
  },
  {
      newsid: 5,
      companyid: 2,
      position: "developer",
      salary: 8000000,
      place: "Ha noi",
      description: "Fresher",
      expiredate: "2021-04-30",
      status: 1
  }
  ];
  constructor() { }

  ngOnInit(): void {
    // this.getNews();
    console.log(this.tintd);
  }

  // getNews (){
  //   this.news.getNews().subscribe(res => this.tintd = res);
    
  //}

}
