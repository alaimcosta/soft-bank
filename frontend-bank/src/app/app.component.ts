import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Cliente</a> |
      <a routerLink="/solicitacaoEmprestimo">Solicitação Emprestimo</a>
    </nav>
    <hr />
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      background-color: #144F9E;
      padding: 12px;

      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      border-radius: 12px;
    }

    nav a {
      color: #fff;
      margin: 0 8px;
      text-decoration: none;
      font-weight: 500;
    }

    nav a:hover {
      text-decoration: underline;
    }

    hr {
      margin: 20px 0;
    }
  `]
})
export class AppComponent {
  title = 'frontend-bank';
}
