import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject ( HttpClient );

  //Usando Signals
  private _currentUser = signal<User|null>(null);
  //Estado de autenticacion en mi aplicacion
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //!Algo al mundo exterior
  //De esta forma nadie va a poder cambiar el estado de mis variables desde fuera de mi aplicacion
  //Computed Cree una señal computed que devuelva un valor reactivo a partir de una expresión.
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: User, token: string ): boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem( 'token', token );

    return true;
  }

  login( email: string, password: string): Observable<boolean>{

    const url = `${ this.baseUrl }/auth/login`;

    //creo un objeto donde igualo mis variables del login con las del backend 
    const body = {
      email: email,
      password: password
    };

    return this.http.post<LoginResponse>(url, body)
                .pipe(
                  map( (response) => this.setAuthentication( response.user, response.token )),
                  //Errores
                  catchError(err =>  throwError( () => err.error.message )
                  )
                );
  }

  checkAuthStatus():Observable<boolean> {

    const url   = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setAuthentication( user, token )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );


  }

  logout(){
    const token = localStorage.getItem('token');

    localStorage.removeItem('token');

    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    
  }

}
