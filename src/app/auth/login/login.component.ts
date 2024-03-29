import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form :any){
    this.authService.login(form.email, form.password);
  }

}
