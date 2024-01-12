import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequestDTO } from '../_models/dto/loginRequestDTO';
import { APIResponse } from '../_models/apiresponse';
import { LoginResponseDTO } from '../_models/dto/loginResponseDTO';
import { BehaviorSubject } from 'rxjs';
import { RegistrationRequestDTO } from '../_models/dto/registrationRequestDTO';
import { UserDTO } from '../_models/dto/userDTO';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrlEndpoint: string = environment.apiUrl;
  public  currentUserBS = new BehaviorSubject<LoginResponseDTO|null>(null);
  public  isLoggedIn    = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(loginRequestDTO : LoginRequestDTO){
      return this.http.post<APIResponse<LoginResponseDTO>>(this.apiUrlEndpoint + "auth/login", loginRequestDTO);
  }

  register(registrationRequestDTO: RegistrationRequestDTO){
    return this.http.post<APIResponse<UserDTO>>(this.apiUrlEndpoint + "auth/register", registrationRequestDTO);
  }

}
