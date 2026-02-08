import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Đặt lại mật khẩu</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="password" placeholder="Mật khẩu mới" type="password" />
      <button type="submit">Đặt lại</button>
    </form>
  `,
})
export class ResetPasswordComponent {
  form = this.fb.group({
    password: [''],
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  submit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.api.post('/auth/reset-password', { token, password: this.form.value.password }).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
