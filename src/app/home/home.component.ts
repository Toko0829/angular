import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service'; 
import { Users } from '../user.model'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: Users[] = [];
  newUsers = {id:0,name:"",email:"",role:"",password:""}
  loginEmail = "";
  loginPassword = ""

  roles = ["frontend","backend"];

  constructor(private UsersService: UsersService, private router:Router){}

  ngOnInit(){
    return this.UsersService.getUsers().subscribe((user)=>{
      this.users = user;
    })
  }

  addUser(){

    const email = this.users.some(x => x.email === this.newUsers.email);
    if(email){
      alert(`ესეთი მეილი უკვე არსებობს`)
      return
    }

    if(this.newUsers.name == "" || this.newUsers.email == "" || this.newUsers.role == ""){
      alert(`შეავსეთ ყველა ველი`)
      return
    }


    return this.UsersService.addUser(this.newUsers).subscribe((user)=>{
      this.users.push(this.newUsers);
      this.newUsers = {id:0,name:"",email:"",role:"",password:""}
       console.log(this.users)

    })

  }

  login(){
    const loginAcc = this.users.some(user => {
      return user.email === this.loginEmail && user.password === this.loginPassword;
    });

    
    if(loginAcc){
      const loggedAcc = this.users.find(user => user.email === this.loginEmail)?.name
      this.UsersService.setLoggedName(loggedAcc || "")
      alert(`შესვლა`)
      this.router.navigate(['/profile']);
    } else{
      alert(`შექმენით ექაუნთი`)
      console.log()
    }
  }

}
