import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailValue = '';
  passValue = '';
  RegisterForm: FormGroup;
  emailError="";
  passwordError="";
  phoneError="";
  nameError="";
  currentUrl;
  apiData;
  constructor(public fb: FormBuilder,
    private router: Router,
    private api: ApiServiceService,
    private toastrService: ToastrService) { 
    this.RegisterForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      conpassword: new FormControl('', [Validators.required])
  });
  }

  ngOnInit(): void {
  }

  Register(): void {

    if(!this.RegisterForm.get('email').value){
      this.emailError = 'Please enter your company email address';
      this.errorClear();
      return;
    }
    if(!this.RegisterForm.get('password').value){
      this.passwordError='Please enter your password';
      this.errorClear();
      return;
    }

    if(!this.RegisterForm.get('username').value){
      this.nameError = 'Please enter your name';
      this.errorClear();
      return;
    }
    if(!this.RegisterForm.get('phone').value){
      this.phoneError='Please enter your password';
      this.errorClear();
      return;
    }

    if(this.RegisterForm.get('password').value !== this.RegisterForm.get('conpassword').value){
      this.phoneError='Password and con-password should be same';
      this.errorClear();
      return;
    }

    this.apiData = {
      email : this.RegisterForm.get('email').value,
      password: this.RegisterForm.get('password').value,
      username : this.RegisterForm.get('username').value,
      phone: this.RegisterForm.get('phone').value
    }

    this.api.Register('https://devgroceryapi.spericorn.com/api/auth/register', this.apiData).subscribe((result: any) => { 
      if(!result.success){
        this.toastrService.error('', result.message, {
        });
      } else {
        this.router.navigate(['']);
      }
      },err => { 
        console.log(err);
        this.toastrService.error('', err.error.msg, {
          timeOut: 1000
        });
      })
    
  }

  errorClear(){
    setTimeout(() => {
     this.emailError='';
     this.passwordError='';
    }, 5000);
  }

}
