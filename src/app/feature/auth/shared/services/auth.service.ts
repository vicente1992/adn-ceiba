import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable()
export class AuthService {
  URL: string = environment.endpoint;

  constructor(
    protected http: HttpService,
  ) { }


  login({ email, password }: Login) {
    return this.http.doGet<Login[]>(`${this.URL}/login?email=${email}&password=${password}`)
      .pipe(map((response: Login[]) => {
        if (response.length === 1) {
          const token: string = this.generateToken();
          this.saveToken(token);
          return response.pop();
        } else {
          throw new Error('usuario o contraseña invalidos');
        }
      }),
      );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  generateToken() {
    const totalRandom = 36;
    const totalSub = 60;
    const totalAdd = 0;
    const token: string = Math.random().toString(totalRandom).substring(totalSub, totalAdd);
    return token + token;
  }
}
