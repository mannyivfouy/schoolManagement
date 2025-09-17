import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required,]]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.errorMessage = 'Please Enter Valid Credentials';
      return;
    }

    const {username, password} = this.loginForm.value;

    if(username === 'Admin'&& password === 'admin'){
      localStorage.setItem('isLoggedIn', 'true')
      this.router.navigate(['/dashboard']);
    }else{
      this.errorMessage = 'Invalid Username or Password';
    }
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
