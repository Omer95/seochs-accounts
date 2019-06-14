import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: [undefined, Validators.email],
      password: [undefined, Validators.required]
    })
  }

  submit(): void {
    console.log(this.loginForm.get('username').value + ' ' + this.loginForm.get('password').value);
    this.loginService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
  }

}
