import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed : boolean = true;
  isLoggedIn  : any;

  constructor(private userSerive: UserService,
              private router    : Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userSerive.isLoggedIn;
  }

  logout(){
    if (this.userSerive.isLoggedIn.value){
      this.userSerive.logout();
      this.router.navigate(['/login']);
    }

  }

}
