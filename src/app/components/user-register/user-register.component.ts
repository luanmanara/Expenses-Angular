import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationRequestDTO } from 'src/app/_models/dto/registrationRequestDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  username?: string;
  password?: string;
  repeatPassword?: string;

  // errors
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
  }

  register(form: NgForm){

    const registrationRequestDTO: RegistrationRequestDTO =  {
      username: form.value.username,
      password: form.value.password,
      role: "admin"
    };

    this.userService.register(registrationRequestDTO).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.router.navigate(["/login"]);
        }else {
          this.errorMsg = true;
          this.errorMessages = response.errorMessages;
        }
      }
    });
  }

}
