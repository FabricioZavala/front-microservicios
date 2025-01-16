import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGatewayService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthGatewayService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.toastr.success('Login exitoso', 'Éxito');
          this.router.navigate(['dashboard/default']);
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error inesperado. Intenta nuevamente.';
          this.toastr.error(errorMessage, 'Error');
        },
      });
    } else {
      this.toastr.warning(
        'Por favor completa todos los campos requeridos.',
        'Advertencia'
      );
    }
  }
}
