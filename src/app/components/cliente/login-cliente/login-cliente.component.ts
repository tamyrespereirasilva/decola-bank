import { Component } from '@angular/core';
import { ClienteService } from '../../../services/clientes.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {

  senha: string = '';
  numConta: string = '';

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.numConta) {
      this.fazerLogin(this.numConta);
    } else {
      console.log('Número da conta inválido');
    }
  }

  fazerLogin(numConta: string): void {
    localStorage.setItem('numConta', numConta);
    this.router.navigate(['/tela-inicial-cliente']);
  }

 }
