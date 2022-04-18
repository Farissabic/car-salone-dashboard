import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  isLoggedInGuard :boolean = false;

  constructor(private auth : AngularFireAuth, private router :Router) { }

  login(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email,password).then(()=>{
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(error=>{
      window.alert('Incorect email or password');
    })
  }

  loadUser(){
    this.auth.authState.subscribe(user=>{
      let userEmail = JSON.parse(JSON.stringify(user)).email;
      localStorage.setItem('user', userEmail);
      console.log(userEmail);
    })
  }

  logout(){
    this.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })
  }

  IsLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
