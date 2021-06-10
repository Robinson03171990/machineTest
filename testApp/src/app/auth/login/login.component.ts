import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailValue = '';
  passValue = '';
  loginForm: FormGroup;
  emailError="";
  passwordError="";
  currentUrl;
  apiData;
  constructor(private router: Router,
    private api: ApiServiceService,
    public fb: FormBuilder,
    private toastrService: ToastrService) { 
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });
    }

  ngOnInit(): void {
  }

  login(): void{
    if(!this.loginForm.get('email').value){
      this.emailError = 'Please enter your company email address';
      this.errorClear();
      return;
    }
    if(!this.loginForm.get('password').value){
      this.passwordError='Please enter your password';
      this.errorClear();
      return;
    }

    this.apiData = {
      email : this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.loginCall()

  }

  errorClear(){
    setTimeout(() => {
     this.emailError='';
     this.passwordError='';
    }, 5000);
  }
  
  loginCall(){ 
      this.api.login('https://devgroceryapi.spericorn.com/api/auth/login', this.apiData).subscribe((result: any) => { 
        console.log('re', result.message)
        if(!result.success){
          this.toastrService.error('', result.message, {
          });
        } else {
          this.router.navigate(['dashboard']);
        }
        },err => { 
          console.log(err);
          this.toastrService.error('', err.error.msg, {
            timeOut: 1000
          });
        })
  }

  register(){
    this.router.navigate(['register']);
  }

}
