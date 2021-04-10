import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { GetInfoService } from 'app/service/get-info.service';
import { studentInfo } from 'app/ts/student-info';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})

export class StudentInfoComponent implements OnInit {

  form: any;
  normalInfomationForm: any;
  educationForm: any;
  avatar: any;
  isEdit = false;
  constructor(
    private studentService: LoginService,
    private getInfoService: GetInfoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      studentName: new FormControl('', null),
      studentCode: new FormControl('', null),
      gender: new FormControl('', null),
      birthday: new FormControl('', null),
      email: new FormControl('', null),
      address: new FormControl('', null)
    });
    this.normalInfomationForm = new FormGroup({
      level: new FormControl('', null),
      typeOfEducate: new FormControl('', null),
      education: new FormControl('', null),
      field: new FormControl('', null),
      course: new FormControl('', null),
      class: new FormControl('', null)
    });
    this.educationForm = new FormGroup({
      gpa: new FormControl('', null),
      preferTechnology: new FormControl('', null),
      archivement: new FormControl('', null),
      experience: new FormControl('', null),
    });

    this.avatar = 'LA';
    this.getInfo()
  }

  getInfo(){
    let studentInfo ={
      code: localStorage.getItem('userName'),
      name: ''
    } ;
    let token: string;
    token = localStorage.getItem('token');
    this.getInfoService.getInfo(studentInfo).subscribe(res => {
      console.log(res);
    })

  }

  editInfo(){
    this.isEdit = !this.isEdit;
  }

  openDialog() {
    // const dialogConfig = new MatDialogConfig();
    // this.dialog.open(ChangePasswordComponent, dialogConfig);
    // console.log(e);
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}


