import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'login-pages',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './loginPages.component.html',
  styleUrls: ['./loginPages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPagesComponent { 

  private fb = inject( FormBuilder );
  private authService = inject( AuthService )
  private router = inject( Router )
  public myForm = this.fb.group({
    email: ['fernando@google.com', [ Validators.required, Validators.email ]],
    password: [ '123456', [ Validators.required, Validators.minLength(6) ]]
  });
  
  login(){
    console.log( this.myForm.value );

    const { email, password } = this.myForm.value;
    if( !email || !password ) return;

    this.authService.login(email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
          console.log({loginError: message});
        }
      })
  }

}
