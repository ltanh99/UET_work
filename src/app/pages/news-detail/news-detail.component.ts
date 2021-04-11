import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplyComponent } from './apply/apply.component';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(){
    let dialogRef = this.dialog.open(ApplyComponent, {
      width: '600px',
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
