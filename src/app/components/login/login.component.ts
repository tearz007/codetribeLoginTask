import { Component, OnInit } from '@angular/core';
import { LoginserviseService } from '../../servises/loginservise.service'
import { Observable, of } from 'rxjs'
import { user } from '../../model/user'

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
  constructor( public auth:LoginserviseService ) { }

  ngOnInit(): void {
    //this.array = this.auth.getUser(this.user).snapshotChanges();
  }

  google() {
    this.auth.google2().then(data=> {
     this.user = data.user;
      alert(this.user.uid + this.user.email);
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
      alert(this.user.uid + this.user.email);
      this.auth.updateUser(this.user).then(() => {

      }).catch(err => {
        alert(err.message)
      })

    }).catch(err => {
      alert(err.message);
    });
  }

  phoneNumber() {
    this.auth.phoneLogin().then(data => {
      this.user = data.user;
      alert(this.user.uid + this.user.email);
      this.auth.updateUser(this.user).then(() => {

      }).catch(err => {
        alert(err.message)
      })

    }).catch(err => {
      alert(err.message);
    });
  }



  signOut() {
    this.auth.signOut().then(() => {
      alert("welcome " + this.userName);
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
      alert("registert as" + this.userName);
    }).catch(err => {
      alert(err.message);
    })
  }
}
