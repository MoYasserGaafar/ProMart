import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signupValidators } from '../../shared/validators/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {
  isBtnSubmit: boolean = false
  errorMessage: string = ""
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  login: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    password: [null, signupValidators.password]
  })

  sendData = () => {
    this.isBtnSubmit = true
    if (this.login.valid) {
      this._AuthService.signin(this.login.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            localStorage.setItem('token', res.token)
            this._AuthService.saveUserData()
            //Navigate to <home>.
            this._Router.navigate(['/home'])
          }
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message
          this.isBtnSubmit = false
        }
      })
    }
  }
}