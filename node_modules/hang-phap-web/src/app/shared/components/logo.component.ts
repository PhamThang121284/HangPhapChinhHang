import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo">
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 6L20 46H44L32 6Z"
          stroke="#1f2937"
          stroke-width="3"
          stroke-linejoin="round"
        />
        <rect x="26" y="46" width="12" height="12" fill="#f472b6" />
        <rect x="24" y="34" width="16" height="6" fill="#f472b6" />
      </svg>
      <div class="wordmark">Hang Phap Chinh Hang</div>
    </div>
  `,
  styles: [
    `
      .logo {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .wordmark {
        font-weight: 700;
        font-size: 16px;
      }
    `,
  ],
})
export class LogoComponent {}
