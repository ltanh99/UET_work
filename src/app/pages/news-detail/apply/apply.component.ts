import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetInfoService } from 'app/service/get-info.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  // work = "Tuyển dụng 123";
  // fullname = "Nguyễn Ngọc Giỏi";
  // gender = "Nữ";
  // birthday = "27/12/1999";
  user: any;
  form: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplyComponent>,
    private getInfo: GetInfoService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("common-info"))
    this.form = new FormGroup({
      salaryExpect: new FormControl('', null),
      preferTechnology: new FormControl('', null),
      archivement: new FormControl('', null),
      jobExpect: new FormControl('', null),
      experience: new FormControl('', null),
      salary: new FormControl('', null),
      description: new FormControl('', null),
      question: new FormControl('', null),
    });
  }

  apply() {
    console.log("id", this.data);
    let profileBody = {
      "description": this.form.value.description?this.form.value.description:'',
      "experience": this.form.value.experience?this.form.value.experience:'',
      "favourite": this.form.value.preferTechnology?this.form.value.preferTechnology:'',
      "jobExpect": this.form.value.jobExpect?this.form.value.jobExpect:'',
      "name": 'CV'+this.data,
      "salaryExpect": this.form.value.salaryExpect?this.form.value.salaryExpect:'',
      "specialistId": this.user.candidate.specialist.id?this.user.candidate.specialist.id:''
    }
    this.getInfo.createProfile(this.user.id, profileBody).subscribe(res => {
      let bodyJob = {
        "profileId": res.id,
        "question": this.form.value.question?this.form.value.question:''
      }
      this.getInfo.joinJobs(this.data, bodyJob).subscribe(resJob => {
        console.log(resJob);
      })
    })
  }
}
