import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-education',
  templateUrl: './detail-education.component.html',
  styleUrls: ['./detail-education.component.css']
})
export class DetailEducationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailEducationComponent>
  ) { }

  ngOnInit(): void {
    console.log("a");
  }

}