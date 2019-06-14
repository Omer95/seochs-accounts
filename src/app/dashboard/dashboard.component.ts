import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  logout(): void {
    this.loginService.logout()
    .catch(err => {
      console.log(err);
    });
  }

}
