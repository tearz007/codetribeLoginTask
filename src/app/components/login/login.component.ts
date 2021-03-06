import { Component, OnInit } from '@angular/core';
import { LoginserviseService } from '../../servises/loginservise.service'
import { Observable, of } from 'rxjs'
import { user } from '../../model/user'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName;
  password;
  user:any =  {};
  array={};

  constructor(public auth: LoginserviseService, private route: Router ) { }

  ngOnInit(): void {
    //this.array = this.auth.getUser(this.user).snapshotChanges();
  }


  google() {
    this.auth.google2().then(data=> {
     this.user = data.user;
      alert("id: " + this.user.uid + "email: " + this.user.email);
      this.auth.updateUser(this.user).then(()=>{

      }).catch(err=>{
        alert(err.message)
      })

    }).catch(err=> {
     alert(err.message);
    });
  }

  facebook() {
    this.auth.facebookLogin().then(data => {
      this.user = data.user;
      alert("id: " + this.user.uid + "email: " + this.user.email);
      this.auth.updateUser(this.user).then(() => {

      }).catch(err => {
        alert(err.message)
      })

    }).catch(err => {
      alert(err.message);
    });
  }

  phoneNumber() {
    this.route.navigate(['phone']);
  }



  signOut() {
    this.auth.signOut().then(() => {
      alert("Thank you for using our side" );
    }).catch(err => {
      alert(err.message);
    })
  }


  login() {
    this.auth.authUser(this.userName, this.password).then(()=>{
      alert("welcome "+this.userName);
    }).catch(err=>{
      alert(err.message);
    })
  }

  signup(){
    this.auth.createUser(this.userName, this.password).then(() => {
      alert("registered as" + this.userName);
    }).catch(err => {
      alert(err.message);
    })
  }
}
