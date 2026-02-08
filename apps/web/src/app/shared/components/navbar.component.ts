import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LogoComponent } from './logo.component';
import { vi } from '../i18n/vi';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, LogoComponent],
  template: `
    <mat-toolbar color="primary">
      <div class="toolbar">
        <a class="brand" routerLink="/">
          <app-logo></app-logo>
        </a>
        <nav class="nav-links">
          <a mat-button routerLink="/">{{ labels.nav.home }}</a>
          <a mat-button routerLink="/products">{{ labels.nav.products }}</a>
          <a mat-button routerLink="/cart">{{ labels.nav.cart }}</a>
          <a mat-button routerLink="/account">{{ labels.nav.account }}</a>
          <a mat-button routerLink="/admin">{{ labels.nav.admin }}</a>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-links a {
        color: white;
        margin-left: 8px;
      }
      .brand {
        color: white;
        text-decoration: none;
      }
    `,
  ],
})
export class NavbarComponent {
  labels = vi;
}
