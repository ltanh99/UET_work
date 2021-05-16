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
  selector: 'tin-td-cmp',
  moduleId: module.id,
  templateUrl: './tin-td.component.html',
  styleUrls: ['./tin-td.component.css']
})
export class TinTdComponent implements OnInit {

  tintd: Array<any>;
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
    // this.getNews();
    // console.log(this.tintd);
    // let tmp = this.datePipe.transform(this.now,'dd-MM-yyyy');
    // this.upadetTime = tmp;
    this.getInfoService.getJobs(1,20,"").subscribe(res=> {
      this.tintd = res.rows;
      this.totalPage = res.totalPage;
      for (let i = 0; i <this.totalPage; i++) {
        this.pageArr.push(i+1);
      }
    })
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
