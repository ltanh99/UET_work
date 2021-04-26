import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private dialog: MatDialog,
    public data: DataServiceService,
    public route: ActivatedRoute,
    public getInfo: GetInfoService) { }

  ngOnInit(): void {
    // this.data.getMessage().subscribe(res=> {
    //   console.log(res);
    //   this.dataDetail = res;
    // })

    this.jobId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.jobId);
    this.getInfo.getJobById(this.jobId).subscribe(res => {
      this.dataDetail = res;
    })
  }

  openDialog(){
    let dialogRef = this.dialog.open(ApplyComponent, {
      width: '800px',
      height: '500px',
      data: this.jobId
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
