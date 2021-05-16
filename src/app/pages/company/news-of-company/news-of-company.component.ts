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
