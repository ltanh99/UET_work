import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetInfoService } from 'app/service/get-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  // fullname = "Nguyễn Ngọc Giỏi";
  // gender = "Nữ";
  // birthday = "27/12/1999";
  user: any;
  form: any;
  formData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplyComponent>,
    private toastr: ToastrService,
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      if (formData != null) {
        this.formData = formData;
      }
    }
  }



  apply() {
    // console.log("id", this.data);
    let profileBody = {
      "description": this.form.value.description?this.form.value.description:'',
      "cvUrl": null,
      "experience": 0,
      "favourite": "string",
      "jobExpect": "string",
      "name": "string",
      "salaryExpect": 0,
      "specialistId": 1
    }
  
    if (this.formData) {
      this.getInfo.uploadCV(this.formData).subscribe(res => {{}
        if (res) {
          console.log(res);
          if (res["fileDownloadUri"]) {
            profileBody.cvUrl = res["fileDownloadUri"];
            this.getInfo.createProfile(this.user.candidate.id, profileBody).subscribe(res => {
              let bodyJob = {
                "profileId": res.id,
                "question": ""
              }
              this.getInfo.joinJobs(this.data.id, bodyJob).subscribe(resJob => {
                // console.log(resJob);
                if (resJob?.status === 'SUCCESS') {
                  this.toastr.success('Ứng tuyển thành công');
                  this.dialogRef.close();
                } else {
                  this.toastr.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                }
              })
            })
          }else {
            this.toastr.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
          }
         
        }else {
          this.toastr.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
      })
    }else {
      this.toastr.warning('Vui lòng nhập đủ thông tin!');
    }
  }
}
