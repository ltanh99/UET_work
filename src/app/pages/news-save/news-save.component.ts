import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-save',
  templateUrl: './news-save.component.html',
  styleUrls: ['./news-save.component.css']
})
export class NewsSaveComponent implements OnInit {

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
