import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@feature/auth/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (localStorage.getItem('token')) {
      this.goToHome();
    }
  }

  isInvalid(nameControl: string) {
    return this.loginForm.controls[nameControl].invalid
      && this.loginForm.controls[nameControl].touched;
  }


  public login() {
    this.authService.login(this.loginForm.value).subscribe(() => this.goToHome());
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }



}
