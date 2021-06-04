import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { news } from 'app/ts/news';
import { GetInfoService} from '../../service/get-info.service';
import {enableProdMode} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DataServiceService } from 'app/service/data-service.service';
import { FormControl, FormGroup } from '@angular/forms';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-news-save',
  templateUrl: './news-save.component.html',
  styleUrls: ['./news-save.component.css']
})
export class NewsSaveComponent implements OnInit {
  tintd: any;
  user: any;
  totalPage;
  pageArr: Array<any>=[];
  searchForm: any;
  constructor(
    private getInfoService: GetInfoService,
    public router: Router,
    public data: DataServiceService
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl("", null),
    })

    this.user = JSON.parse(localStorage.getItem("common-info"))

    let tintdTmp = localStorage.getItem("list-save-job")? localStorage.getItem("list-save-job") : null;
    if (tintdTmp) {
      let listtd = JSON.parse(tintdTmp);
      if (listtd) {
        listtd.forEach(e => {
          if (e.id === this.user.id) {
            if (e.list) {
              this.tintd = e?.list;
            }
          }
        });
      }
    }
    
    // this.getNews();
    // console.log(this.tintd);
    // let tmp = this.datePipe.transform(this.now,'dd-MM-yyyy');
    // this.upadetTime = tmp;
    // this.getInfoService.getJobs(1,20,"").subscribe(res=> {
    //   this.tintd = res.rows;
    //   this.totalPage = res.totalPage;
    //   for (let i = 0; i <this.totalPage; i++) {
    //     this.pageArr.push(i+1);
    //   }
    // })
  }

  // getNews (){
  //   this.news.getNews().subscribe(res => this.tintd = res);
    
  //}
//   public get half(): number {
//     return Math.ceil(this.tintd.length / 2);
// }
  toggle = true;
  toggleSearch = false;
  toggleHeart() {
    this.toggle = !this.toggle;
}
  clickSearch() {
    this.toggleSearch = !this.toggleSearch;
  }


  sendData(item) {
    // this.data.setMessage(item);
    this.router.navigate(['cong-viec/chi-tiet'],{queryParams: {id: item.id}})
  }

  searchJob(){
    this.getInfoService.getJobs(1,20,this.searchForm.value["name"]).subscribe(res=> {
      this.tintd = res.rows;
      // this.totalPage = res.totalPage;
      // for (let i = 0; i <this.totalPage; i++) {
      //   this.pageArr.push(i+1);
      // }
    })
  }
  // showDetail(id) {
  //   this.router.navigate(['login']);
  // }
  
}
