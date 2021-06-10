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
  
  form!: FormGroup;
  loginInvalid = false;
  hide:any;
 
  loading$ = this.loader.loading$;

  constructor(
    private router: Router,
    private loginservice: AuthentificationService,
    public loader:LoadingService
  ) {}

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

  Login() {

    this.loginservice
      .authentificate(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          this.loginInvalid = false;
          this.router.navigate(['/client']);
          sessionStorage.setItem('password',this.password.value);
        },
        (error) => {
          this.loginInvalid = true;
          console.log('errr')
        }
      );
  }
  logOut() {
    sessionStorage.removeItem('username');
    console.log("loggeed out")
  }
}