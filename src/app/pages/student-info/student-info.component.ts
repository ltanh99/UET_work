import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { GetInfoService } from 'app/service/get-info.service';
import { studentInfo } from 'app/ts/student-info';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DataServiceService } from 'app/service/data-service.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})

export class StudentInfoComponent implements OnInit {

  form: any;
  normalInfomationForm: any;
  educationForm: any;
  userInfo: any;
  avatar: any;
  name: any;
  isEdit = false;
  constructor(
    private studentService: LoginService,
    private getInfoService: GetInfoService,
    private dialog: MatDialog,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      studentName: new FormControl('Nguyễn Ngọc Giỏi', null),
      studentCode: new FormControl('17020708', null),
      gender: new FormControl('Nữ', null),
      birthday: new FormControl('27/12/1999', null),
      email: new FormControl('17020708@vnu.edu.vn', null),
      address: new FormControl('144 Xuân Thủy, Cầu Giấy, Hà Nội', null)
    });
    this.normalInfomationForm = new FormGroup({
      level: new FormControl('Đại học', null),
      typeOfEducate: new FormControl('Chính quy', null),
      education: new FormControl('Chuẩn', null),
      field: new FormControl('Công nghệ thông tin', null),
      course: new FormControl('QH-2017', null),
      class: new FormControl('K62CD', null)
    });
    this.educationForm = new FormGroup({
      gpa: new FormControl('3.55', null),
      preferTechnology: new FormControl('Đọc sách, nghe nhạc', null),
      archivement: new FormControl('', null),
      experience: new FormControl('', null),
    });

    this.avatar = 'NG';
    this.name = 'Nguyễn Ngọc Giỏi';
    //this.getInfo()
  }

  getInfo(){
    
    let studentInfo ={
      code: localStorage.getItem('userName'),
      name: ''
    } ;



     if (localStorage.getItem("common-info")) {
      this.userInfo = JSON.parse(localStorage.getItem("common-info"));
      this.form.setValue({
        studentName: this.userInfo.fullName?this.userInfo.fullName: '',
        studentCode: this.userInfo.candidate.cardNumber?this.userInfo.candidate.cardNumber: '',
        gender: this.userInfo.candidate.gender?this.userInfo.candidate.gender:'',
        birthday: this.userInfo.candidate.birthDay?this.userInfo.candidate.birthDay:'',
        email: this.userInfo.email?this.userInfo.email:'',
        address: this.userInfo.address?this.userInfo.address:''
      });

      this.normalInfomationForm.setValue({
        level: this.userInfo.candidate.level?this.userInfo.candidate.level: '',
        typeOfEducate: this.userInfo.candidate.formsOfTraining?this.userInfo.candidate.formsOfTraining: '',
        education: this.userInfo.candidate.trainingProgram?this.userInfo.candidate.trainingProgram: '',
        field: this.userInfo.candidate.specialist.name?this.userInfo.candidate.specialist.name: '',
        course: this.userInfo.candidate.course?this.userInfo.candidate.course: '',
        class: this.userInfo.candidate.classManage?this.userInfo.candidate.classManage: ''
      });

      this.educationForm.setValue({
        gpa: this.userInfo.candidate.gpa?this.userInfo.candidate.gpa: '',
        preferTechnology: this.userInfo.candidate.forte?this.userInfo.candidate.forte: '',
        archivement: this.userInfo.candidate.personalAchievements?this.userInfo.candidate.personalAchievements: '',
        experience: this.userInfo.candidate.personalExperience?this.userInfo.candidate.personalExperience: '',
      });
     }
    // this.dataService.getMessage().subscribe(mes => {
    //   console.log(mes);
    //   this.normalInfomationForm["level"] = mes.candidate.level;
    // })

    
    let token: string;
    token = localStorage.getItem('token');
    this.getInfoService.getInfo(studentInfo).subscribe(res => {
      console.log(res);
    })
  }

  editInfo(){
    this.isEdit = !this.isEdit;
  }

  submit() {

    let bodyuser = this.userInfo;
    bodyuser.address = this.form.value["address"];
    bodyuser.email = this.form.value["email"];
    bodyuser.candidate.forte = this.educationForm.value["preferTechnology"];
    bodyuser.candidate.personalAchievements = this.educationForm.value["archivement"];
    bodyuser.candidate.personalExperience = this.educationForm.value["experience"];
    let bodyParam = {
      "address": this.form.value["address"],
      "email": this.form.value["email"],
      candidate: {
        "forte": this.educationForm.value["preferTechnology"],
        "personalAchievements": this.educationForm.value["archivement"],
        "personalExperience": this.educationForm.value["experience"],
      }
    }
    this.getInfoService.updateUser(bodyuser, this.userInfo.id).subscribe(res => {
      console.log(res);
      localStorage.setItem("common-info", bodyuser);
      this.getInfoService.getUserById(this.userInfo.id).subscribe(res => {
        this.userInfo = res;
      })
    });
  }

  openDialog() {
    // const dialogConfig = new MatDialogConfig();
    // this.dialog.open(ChangePasswordComponent, dialogConfig);
    // console.log(e);
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      height: '350px',
      data: {id: this.userInfo.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}


