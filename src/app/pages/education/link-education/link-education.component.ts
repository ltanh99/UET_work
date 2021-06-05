import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-link-education',
  templateUrl: './link-education.component.html',
  styleUrls: ['./link-education.component.css']
})
export class LinkEducationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {data: any},
    public dialogRef: MatDialogRef<LinkEducationComponent>,
  ) { }

  ngOnInit(): void {
  }

}
