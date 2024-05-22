import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../shared/input-text/input-text.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  login(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.loginMessage = 'Por favor, preencha os campos de usuário e senha';
      return;
    }

    this.loginMessage = `Olá, ${this.username}! Você está logado com sucesso!`;
  }
}