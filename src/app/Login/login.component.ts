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
  ngOnInit(): void {
    this.student.username = '';
    this.student.password = '';
    this.setLocalStorage();
  
  }

  login(student: Student){
    if(this.student.username == ""){
      this.toastr.error('Vui lòng nhập tên đăng nhập!');
    }else 
    if(this.student.password == ""){
      this.toastr.error('Vui lòng nhập mật khẩu!');
    }else{

    let token1: string;
    this.studentService.studentLogin(this.student).subscribe(res => {
      console.log(this.student.username);
      console.log(res);
      localStorage.setItem('session', '');
      localStorage.setItem('common-info', '');
      if (res.username  && !res.isCompany) {
        
        let now = new Date();
        localStorage.setItem('session', this.addMinutes(now, 30).getTime().toString());
        localStorage.setItem('common-info', JSON.stringify(res));
        this.router.navigate(['cong-viec']);
        this.dataService.setMessage(res);
      }
      else{
        this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    
    },
    error => {
      localStorage.setItem('session', '');
      localStorage.setItem('common-info', '');
      this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng');
    })
  }
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
