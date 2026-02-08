import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div>© 2024 Hàng Pháp Chính Hãng. Made in France, delivered in Vietnam.</div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 24px;
        text-align: center;
        color: #6b7280;
      }
    `,
  ],
})
export class FooterComponent {}
