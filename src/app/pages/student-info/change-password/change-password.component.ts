import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { NotifierService } from 'angular-notifier';
import { GetInfoService } from 'app/service/get-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  student = localStorage.getItem("common-info");
  password =  JSON.parse(this.student).password;

  chagePasswordForm: any;
  // private readonly notifier: NotifierService;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public getInfo: GetInfoService,
    private toastr: ToastrService,
    public router: Router,
    // public notifierService: NotifierService
  ) {

    // this.notifier = notifierService;
   }

  ngOnInit(): void {
    this.chagePasswordForm = new FormGroup({
      newPassword: new FormControl('', null),
      oldPassword: new FormControl('', null),
      confirmPassword: new FormControl('', null)
    });
  }

  submit() {
    const formValue = this.chagePasswordForm.value;
    let newPass= formValue.newPassword;
    let oldPass= formValue.oldPassword;
    let confirmPass= formValue.confirmPassword;
    if(oldPass != this.password){
      this.toastr.error( 'Mật khẩu cũ không chính xác','Đổi mật khẩu thất bại');
    }else 
    if(newPass == ""){
      this.toastr.error( 'Mật khẩu mới không được để trống');
    } else
    if(newPass == oldPass){
      this.toastr.error( 'Mật khẩu không được đặt trùng mật khẩu cũ','Đổi mật khẩu thất bại');
    }
     else if (confirmPass != newPass) {
      this.toastr.error( 'Mật khẩu mới và xác nhận mật khẩu không khớp nhau','Đổi mật khẩu thất bại');
      // this.notifier.notify('error', 'Mật khẩu mới không khớp!');
      // console.log("Mật khẩu mới không khớp")
    } else {
      this.getInfo.changePass(newPass,oldPass,this.data.id).subscribe(res => {
        // this.notifier.show({
        //   type: 'success',
        //   message: 'Thay đổi mật khẩu thành công',
        //   // id: 'THAT_NOTIFICATION_ID',
        // });
        this.toastr.success('Vui lòng đăng nhập lại!                                                                                                                                                                                                                                                           ', 'Đổi mật khẩu thành công');
        this.dialogRef.close();  
        this.router.navigate(['login']);
        localStorage.setItem("session", "");

      },
      error => {
        this.toastr.error( 'Có lỗi xảy ra. Bạn Vui lòng nhập lại!');
      }
      )
    }
  }
}
