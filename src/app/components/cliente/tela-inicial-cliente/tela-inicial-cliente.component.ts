import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Conta } from '../../../classes/conta';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/clientes.service';

@Component({
  selector: 'app-tela-inicial-cliente',
  imports: [NgOptimizedImage,CommonModule, RouterLink],
  templateUrl: './tela-inicial-cliente.component.html',
  styleUrls: ['./tela-inicial-cliente.component.css']
})
export class TelaInicialClienteComponent implements OnInit {
  conta: Conta = new Conta('', '', 0, new Date(), 0, 0, '', '');
  saldo: number = 0;
  nomeCliente: string = '';
  numConta : string = localStorage.getItem('numConta')?? '';

  constructor(private authService: AuthService, private router: Router, private clienteService : ClienteService) {}

  ngOnInit(): void {
    this.obterConta(this.numConta);
}

obterConta(numConta: string): void {
  this.clienteService.obterConta(numConta).subscribe(
    (conta: Conta) => {
      this.conta = conta;
      this.authService.setNumConta(numConta);
      console.log('Dados da Conta:', this.conta);
      console.log('numConta:', this.numConta)
      this.router.navigate(['/tela-inicial-cliente']);
    },
    (error) => {
      console.error('Erro ao obter conta:', error);
    }
  ); 
}

}
