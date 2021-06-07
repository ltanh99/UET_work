import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetInfoService } from 'app/service/get-info.service';
import { ToastrService } from 'ngx-toastr';
import { DetailEducationComponent } from './detail-education/detail-education.component';
import { LinkEducationComponent } from './link-education/link-education.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  listSeminar: Array<any>;
  listCompany: Array<any> = [1];
  listCompanyData: Array<any> = [];
  toggleSearch = false;
  form: any;
  user: any;
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public getInfoService: GetInfoService 
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("common-info"));
    this.form = new FormGroup({
      searchEdu : new FormControl("", null),
    })
    this.searchEdu();
          // this.getInfoService.getEducation(1,20, '').subscribe(res => {
          //   if (res) {
          //     console.log(res);
          //     this.listSeminar = res.rows
          //   }
          // })
    
  }
  searchEdu(){
    // this.user = JSON.parse(localStorage.getItem("common-info"));
    this.getInfoService.getEducation(1,20, this.form.value["searchEdu"]).subscribe(res => {
      if (res) {
        // console.log(res);
        this.listSeminar = res.rows;
        if (this.listSeminar) {
          this.listSeminar.forEach(e => {
            e.registed = false;
            this.getInfoService.getAllCandidateOfEducation(e.id).subscribe(resp => {
              if (resp) {
                console.log(resp)
                let candidates = resp.rows;
                candidates.forEach(element => {
                  if (element.user.id === this.user.id) {
                    e.registed = true;
                  }
                });
              }
            })
          })
        }
      }
    })
  }

  viewDetail(e) {
    console.log(e);
    let dialogRef = this.dialog.open(DetailEducationComponent, {
      width: '500px',
      height: '400px',
      data: {data: e},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  clickSearch() {
    this.toggleSearch = !this.toggleSearch;
  }

  joinEducation(item) {
    // let user = JSON.parse(localStorage.getItem("common-info"));
    this.getInfoService.joinEducation(this.user.id,item.id).subscribe(res => {
      // console.log(res);
      this.searchEdu();
      this.toastr.success('Đăng ký thành công');
    }, error => {
      this.toastr.success('Đăng ký thất bại');
    })
  }

  showLink(item) {
    let dialogRef = this.dialog.open(LinkEducationComponent, {
      width: '700px',
      height: '400px',
      data: {data: item},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}