import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AuthentificationService } from 'src/app/services/login/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;

  constructor(
    private router: Router,
    private loginservice : AuthentificationService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  checkLogin() {
    console.log(this.username.value);
    this.loginservice
      .authentificate(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          this.loginInvalid = false;
          this.router.navigate(['/overview']);
        },
        (error) => {
          this.loginInvalid = true;
        }
      );
  }

}
