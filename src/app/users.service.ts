import { Injectable } from '@angular/core';
import { Users } from './user.model';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private loggedName = ""

  setLoggedName(name:string){
    this.loggedName = name; 
  }

  getLoggedName():string{
    return this.loggedName
  }

  baseUrl = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUrl}/api/users`)
  }

  addUser(user:Users):Observable<Users>{
    return this.http.post<Users>(`${this.baseUrl}/api/users`, user)
  }
}
