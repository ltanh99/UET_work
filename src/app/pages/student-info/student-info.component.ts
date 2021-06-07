import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { GetInfoService } from 'app/service/get-info.service';
import { studentInfo } from 'app/ts/student-info';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DataServiceService } from 'app/service/data-service.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css'],
  providers: [DatePipe],
})

export class StudentInfoComponent implements OnInit {

  form: any;
  normalInfomationForm: any;
  educationForm: any;
  userInfo: any;
  avatar: any;
  isEdit = false;
  colorAva = '#512DA8';
  constructor(
    private studentService: LoginService,
    private getInfoService: GetInfoService,
    private dialog: MatDialog,
    private dataService: DataServiceService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
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


    this.getInfo()
    this.colorAva = this.getRandomColor();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  getInfo(){
    let studentInfo ={
      code: localStorage.getItem('userName'),
      name: ''
    } ;

     if (localStorage.getItem("common-info")) {
      this.userInfo = JSON.parse(localStorage.getItem("common-info"));
      this.avatar = this.userInfo.fullName.charAt(0);
      const datePipe = this.datePipe.transform(this.userInfo.candidate.birthDay, 'dd/MM/yyyy')
      this.form.setValue({
        studentName: this.userInfo.fullName?this.userInfo.fullName: '',
        studentCode: this.userInfo.candidate.cardNumber?this.userInfo.candidate.cardNumber: '',
        gender: this.userInfo.candidate.gender?this.userInfo.candidate.gender:'',
        birthday: this.userInfo.candidate.birthDay?datePipe:'',
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
    // let token: string;
    // token = localStorage.getItem('token');
    // this.getInfoService.getInfo(studentInfo).subscribe(res => {
    //   console.log(res);
    // })

  }

  editInfo(){
    this.isEdit = !this.isEdit;
  }

  submit() {
    let bodyuser = this.userInfo;
    bodyuser.address = this.form.value["address"];
    bodyuser.email = this.form.value["email"];
    bodyuser.forte = this.educationForm.value["preferTechnology"];
    bodyuser.personalAchievements = this.educationForm.value["archivement"];
    bodyuser.personalExperience = this.educationForm.value["experience"];


    // let bodyParam = {
    //   "address": this.form.value["address"],
    //   "email": this.form.value["email"],
    //   candidate: {
    //     "forte": this.educationForm.value["preferTechnology"],
    //     "personalAchievements": this.educationForm.value["archivement"],
    //     "personalExperience": this.educationForm.value["experience"],
    //   }
    // }
    this.getInfoService.updateUser(bodyuser, this.userInfo.id).subscribe(res => {
      console.log(res);
      let common = JSON.stringify(bodyuser);
      localStorage.setItem("common-info", common);
      // this.getInfoService.getUserById(this.userInfo.id).subscribe(res => {
      //   this.userInfo = res;
      // })
      this.toastr.success('Thành công', 'Cập nhật thông tin');
      this.isEdit = !this.isEdit;
    },
    error => {
      this.toastr.error('Thất bại', 'Cập nhật thông tin');
    }
    );

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


