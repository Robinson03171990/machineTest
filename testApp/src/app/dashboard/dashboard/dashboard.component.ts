import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: {
    "id": null,
    "firstName": '',
    "lastName": '',
    "username": "",
    "email": "",
    "phone": "",
    "profilePic": null
}
  constructor(private router: Router,
    private api: ApiServiceService,
    private toastrService: ToastrService) { }
  
  ngOnInit(): void {
    this.api.getUserDetails('https://devgroceryapi.spericorn.com/api/user').subscribe((result: any) => { 
      if(result.success){
        this.userData = result.data.userData
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

  logout(){
    this.router.navigate(['']);
  }

}
