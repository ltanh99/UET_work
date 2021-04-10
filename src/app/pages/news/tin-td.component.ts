import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  {
      newsid: 1,
      newName: "tin tuyển dụng 2",
      companyid: 1,
      position: "PM",
      salary: 10000000,
      place: "Da Nang",
      description: "",
      expiredate: "2021-04-27",
      status: 1
  },
  {
      newsid: 2,
      newName: "tin tuyển dụng 3",
      companyid: 1,
      position: "Data Science",
      salary: 10000000,
      place: "Ha noi",
      description: "",
      expiredate: "2021-04-27",
      status: 1
  },
  {
      newsid: 3,
      newName: "tin tuyển dụng 4",
      companyid: 2,
      position: "developer",
      salary: 8000000,
      place: "Ha noi",
      description: "Fresher",
      expiredate: "2021-04-30",
      status: 1
  },
  {
    newsid: 0,
    newName: "tin tuyển dụng 1",
    companyid: 1,
    position: "BA",
    salary: 10000000,
    place: "Ha noi",
    description: "",
    expiredate: "2021-04-27",
    status: 1
},
{
    newsid: 1,
    newName: "tin tuyển dụng 2",
    companyid: 1,
    position: "PM",
    salary: 10000000,
    place: "Da Nang",
    description: "",
    expiredate: "2021-04-27",
    status: 1
},
{
    newsid: 2,
    newName: "tin tuyển dụng 3",
    companyid: 1,
    position: "Data Science",
    salary: 10000000,
    place: "Ha noi",
    description: "",
    expiredate: "2021-04-27",
    status: 1
},
{
    newsid: 3,
    newName: "tin tuyển dụng 4",
    companyid: 2,
    position: "developer",
    salary: 8000000,
    place: "Ha noi",
    description: "Fresher",
    expiredate: "2021-04-30",
    status: 1
},
{
  newsid: 3,
  newName: "tin tuyển dụng 4",
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
  public get half(): number {
    return Math.ceil(this.tintd.length / 2);
}
  toggle = true;
  toggleSearch = false;
enableDisableRule() {
    this.toggle = !this.toggle;
}
  clickSearch() {
    this.toggleSearch = !this.toggleSearch;
  }
}
