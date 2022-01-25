import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailId: any = null;
  employeeId: any = null;
  otpNum: any = null;
  newPassword: any = null;
  confirmPassword: any = null;
  showPage: any = 'forgot';

  constructor() { }

  ngOnInit() {
    // --------otp section------
    $(".otp-inputbar").keypress(function (e) {
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          $("#errmsg").html("Digits Only").show().fadeOut("slow");
          return false;
      }
    });
    $(".otp-inputbar").on("keyup keydown keypress", function (e) {
      if ($(this).val()) {
          $(this).next().focus();
      }
      var KeyID = e.keyCode;
      switch (KeyID) {
          case 8:
              $(this).val("");
              $(this).prev().focus();
              break;
          case 46:
              $(this).val("");
              $(this).prev().focus();
              break;
          default:
              break;
      }
    });
  }

  gotoPage(type?: any) {
    this.showPage = type;
  }

  onOtpChange(event?: any) {
    
  }

}
