import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetInfoService } from 'app/service/get-info.service';
import { DetailEducationComponent } from './detail-education/detail-education.component';

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
  constructor(
    public dialog: MatDialog,
    public getInfoService: GetInfoService 
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchEdu : new FormControl("", null),
    })
          this.getInfoService.getEducation(1,20, '').subscribe(res => {
            if (res) {
              console.log(res);
              this.listSeminar = res.rows
            }
          })
    
  }
  searchEdu(){
    this.getInfoService.getEducation(1,20, this.form.value["searchEdu"]).subscribe(res => {
      if (res) {
        console.log(res);
        this.listSeminar = res.rows
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
    let user = JSON.parse(localStorage.getItem("common-info"));
    this.getInfoService.joinEducation(user.id,item.id).subscribe(res => {
      console.log(res);
    })
  }

}