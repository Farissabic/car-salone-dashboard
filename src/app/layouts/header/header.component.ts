import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : string | null = '';
  IsLoggedIn$: Observable<boolean> | undefined;
  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
   this.IsLoggedIn$ = this.authService.IsLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}
