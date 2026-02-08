import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Quên mật khẩu</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" placeholder="Email" />
      <button type="submit">Gửi liên kết</button>
    </form>
  `,
})
export class ForgotPasswordComponent {
  form = this.fb.group({
    email: [''],
  });

  constructor(private fb: FormBuilder, private api: ApiService) {}

  submit(): void {
    this.api.post('/auth/forgot-password', this.form.value).subscribe();
  }
}
