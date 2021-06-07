import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'app/service/data-service.service';
import { GetInfoService } from 'app/service/get-info.service';
import { ToastrService } from 'ngx-toastr';
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
  disableApply = false;
  // isSaved = false;
  listSaved;
  listCandidate;
  constructor(private dialog: MatDialog,
    public data: DataServiceService,
    public router: Router,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public getInfo: GetInfoService) { }
    toggle = false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("common-info"));
    this.listSaved = JSON.parse(localStorage.getItem("list-save-job"));

    this.jobId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.jobId);
    this.getInfo.getJobById(this.jobId).subscribe(res => {
      this.dataDetail = res;
    })

    this.getInfo.getCandidatesByJob(this.jobId).subscribe(res => {
      if (res) {
        this.listCandidate = res.rows;
        if (this.listCandidate.length > 0) {
          this.listCandidate.forEach(element => {
            if (element?.user?.id === this.user?.id) {
              this.disableApply = true;
            }
          });
        }
      }
    })


    if (this.listSaved) {
      this.listSaved.forEach(element => {
        if (element.id === this.user.id) {
          if ( element.list && element.list.length > 0 ) {
            element.list.forEach(e => {
              if (e.id === +this.jobId) {
                this.toggle = true;
              }
            });
          }
        }
      });
    }

  }

  unSaveNew() {
    this.toggle = !this.toggle;
    if (this.listSaved) {
      this.listSaved.forEach(element => {
        if (element.id === this.user.id) {
          if ( element.list && element.list.length > 0 ) {
            element.list.forEach(e => {
              if (e.id === +this.jobId) {
                // this.toggle = true;
                this.toastr.success('Hủy lưu thành công');
                element.list = element.list.filter(function( obj ) {
                  return obj.id !== e.id;
              });
              
              }
            });
          }
        }
      });
    }

    localStorage.setItem("list-save-job",JSON.stringify(this.listSaved) );
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
            this.toastr.success('Lưu công việc thành công');
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
    if (!this.disableApply) {
      let dialogRef = this.dialog.open(ApplyComponent, {
        width: '500px',
        height: '410px',
        data: this.jobId
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      this.toastr.error("Bạn đã đăng ký công việc này");
    }
  }
  gotoChat() {
    this.router.navigate(['tin-nhan'],{queryParams: {id: 'job'+this.dataDetail.id,name: this.dataDetail.name}})
  }
}
