import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { GetInfoService } from 'app/service/get-info.service';
import { studentInfo } from 'app/ts/student-info';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})

export class StudentInfoComponent implements OnInit {

  constructor(
    private studentService: LoginService,
    private getInfoService: GetInfoService
  ) { }

  ngOnInit(): void {
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
}
