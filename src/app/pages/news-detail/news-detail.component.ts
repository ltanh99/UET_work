import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'app/service/data-service.service';
import { GetInfoService } from 'app/service/get-info.service';
import { ApplyComponent } from './apply/apply.component';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  dataDetail: any;
  jobId;
  user: any;
  constructor(private dialog: MatDialog,
    public data: DataServiceService,
    public router: Router,
    public route: ActivatedRoute,
    public getInfo: GetInfoService) { }
    toggle = false;
  ngOnInit(): void {
    // this.data.getMessage().subscribe(res=> {
    //   console.log(res);
    //   this.dataDetail = res;
    // })
   

    this.user = JSON.parse(localStorage.getItem("common-info"))

    this.jobId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.jobId);
    this.getInfo.getJobById(this.jobId).subscribe(res => {
      this.dataDetail = res;
    })
  }

  saveNew() {
    this.toggle = !this.toggle;
    let currentSaveJob = localStorage.getItem("list-save-job");
    var isHave = false;
    if (currentSaveJob) {
      let listcurrentSaveJob = JSON.parse(currentSaveJob);
      listcurrentSaveJob.forEach(element => {
        if (element.id === this.user.id) {
          isHave = true;
          if (this.dataDetail) {
            element?.list?.unshift(this.dataDetail);
          }
        }
      });
      if (!isHave) {
        let listTmp = [];
        listTmp.push(this.dataDetail);
        listcurrentSaveJob.push({"id": this.user?.id, "list": listTmp});
      }

      localStorage.setItem("list-save-job",JSON.stringify(listcurrentSaveJob) );
    } else {
      localStorage.setItem("list-save-job",JSON.stringify([]));
      this.saveNew();
    }
  }

  openDialog(){
    let dialogRef = this.dialog.open(ApplyComponent, {
      width: '500px',
      height: '410px',
      data: this.jobId
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  gotoChat() {
    this.router.navigate(['tin-nhan'],{queryParams: {id: 'job'+this.dataDetail.id,name: this.dataDetail.name}})
  }
}
