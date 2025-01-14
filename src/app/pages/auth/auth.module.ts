import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}
