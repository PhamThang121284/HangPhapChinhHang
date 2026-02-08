import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Đăng nhập</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" placeholder="Email" />
      <input formControlName="password" placeholder="Mật khẩu" type="password" />
      <button type="submit">Đăng nhập</button>
    </form>
  `,
})
export class LoginComponent {
  form = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    this.auth.login(this.form.value as { email: string; password: string }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
