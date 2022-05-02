import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  //login Method Define
  logIn() {
    this.http.get<any>("http://localhost:3000/posts")
      .subscribe(res => {
        // we needs to match with url id and passwrod with the registration.
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password

        })
        if (user) {
          alert("Login Successfull ");
          this.loginForm.reset();
          this.router.navigate(['homepage'])
        } else {
          alert("User Not Found Please check enter valid details")
        }
      }, err => {
        alert("Something went wrong, Serverside")
      })
  }

}
