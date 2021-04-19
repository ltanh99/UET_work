import { Component, OnInit } from '@angular/core';
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
  constructor(
    public dialog: MatDialog,
    public getInfoService: GetInfoService 
  ) { }

  ngOnInit(): void {

          this.getInfoService.getEducation(1,20, '').subscribe(res => {
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
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  clickSearch() {
    this.toggleSearch = !this.toggleSearch;
  }

}