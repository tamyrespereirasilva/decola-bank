import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Conta } from '../../../../classes/conta';
import { AuthService } from '../../../../services/auth.service';
import { TransacaoService } from '../../../../services/transacao.service';
import { ClienteService } from '../../../../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  imports: [CommonModule, FormsModule],
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {
   valor: number = 0;
   mensagemErro: string = '';
   mensagemSucesso: string = ''; 
   conta: Conta = new Conta();
   numConta : string = localStorage.getItem('numConta')?? '';
   agencia : string = '';

  constructor(private router: Router,
    private authService : AuthService,
    private transacaoService : TransacaoService,
    private clienteService : ClienteService) {}

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
      },
      (error) => {
        console.error('Erro ao obter conta:', error);
      }
    ); 
  }

  verificarSaldo(): void {
    if (!this.conta) {
      this.mensagemErro = 'Erro: Conta não encontrada.';
      Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }

    if (this.valor <= 0) {
      this.mensagemErro = 'Erro: O valor do depósito deve ser maior que zero.';
      Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }
    this.mensagemErro = '';

    const contaId = this.conta.id;
    if (contaId === undefined) {
      this.mensagemErro = 'Erro: ID da conta inválido.';
      Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }

    // Realizar a transação de saque na API
    this.transacaoService.realizarDepositoApi(this.valor, contaId).subscribe(
      (resposta: string) => {
        this.mensagemSucesso = resposta; // Mensagem de sucesso retornada da API
         Swal.fire('Sucesso', this.mensagemSucesso, 'success');
        setTimeout(() => {
          this.router.navigate(['/tela-inicial-cliente']); // Volta para tela inicial
        }, 3000); // Espera 2 segundos antes de voltar
      },
      (error) => {
        console.error('Erro ao processar saque', error);
        this.mensagemErro = 'Erro ao processar o saque.';
        Swal.fire('Erro', this.mensagemErro, 'error');
      }
    );    
    
  }
  voltar(): void {
    this.router.navigate(['/tela-inicial-cliente']);
  }

}