import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Đăng ký</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="fullName" placeholder="Họ và tên" />
      <input formControlName="email" placeholder="Email" />
      <input formControlName="phone" placeholder="Số điện thoại" />
      <input formControlName="password" placeholder="Mật khẩu" type="password" />
      <button type="submit">Tạo tài khoản</button>
    </form>
  `,
})
export class RegisterComponent {
  form = this.fb.group({
    fullName: [''],
    email: [''],
    phone: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    this.auth.register(this.form.value as any).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
