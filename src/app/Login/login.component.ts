import { EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotifierService } from 'angular-notifier';
import { DataServiceService } from 'app/service/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../pages/student-info/student';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private studentService: LoginService, 
    public router: Router,
    private toastr: ToastrService,
    public dataService: DataServiceService) { }


   public student = new Student();
   public userName;
  ngOnInit(): void {
    this.student.username = '';
    this.student.password = '';
    this.setLocalStorage();
  
  }

  login(student: Student){

    let token1: string;
    this.studentService.studentLogin(this.student).subscribe(res => {
      console.log(this.student.username);
      console.log(res);
      if (res.username  && !res.isCompany) {
        localStorage.setItem('session', '');
        localStorage.setItem('common-info', '');
        let now = new Date();
        localStorage.setItem('session', this.addMinutes(now, 30).getTime().toString());
        localStorage.setItem('common-info', JSON.stringify(res));
        this.router.navigate(['cong-viec']);
        this.dataService.setMessage(res);
      }
    //   token1 = res.token;
    //   localStorage.setItem('token', token1);
    //   localStorage.setItem('userName', student.username);
    //   localStorage.setItem('password', student.password);
    //   const helper = new JwtHelperService();

    //   const decoded= helper.decodeToken(token1);

    // console.log(decoded);
    // this.userName = decoded.sub;
    // console.log(localStorage.getItem('token'));
    // this.router.navigate(['cong-viec']);
    },
    error => {
      this.toastr.error('Đăng nhập thất bại');
      // this.notifier.notify('error', 'Đăng nhập thất bại');
    })
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  setLocalStorage(){
    localStorage.setItem('token', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('password', '');
  }
}
