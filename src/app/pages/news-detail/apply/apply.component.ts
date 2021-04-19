import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  work = "Tuyển dụng 123";
  fullname = "Nguyễn Ngọc Giỏi";
  gender = "Nữ";
  birthday = "27/12/1999";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplyComponent>
  ) { }

  ngOnInit(): void {
    console.log("a");
  }

}
