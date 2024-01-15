import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent implements OnInit {

  username?: string;
  password?: string;

  // errors
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private userService : UserService,
              private router      : Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    
    this.errorMsg = false;

    this.userService.login(form.value).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.userService.setCurrentUser(response.result);
          this.router.navigate(['/wallets']);
        }else {
          this.errorMsg = true;
          this.errorMessages?.push(response.errorMessages[0]);
        }
      }
    });
  }

}
