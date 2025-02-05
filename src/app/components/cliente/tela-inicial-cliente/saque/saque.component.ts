import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransacaoService } from '../../../../services/transacao.service';
import { AuthService } from '../../../../services/auth.service';
import { Conta } from '../../../../classes/conta';
import { ClienteService } from '../../../../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {


  valor: number = 0;
  mensagemErro: string = '';
  mensagemSucesso: string = ''; 
  conta: Conta = new Conta('', '', 0, new Date(), 0, 0, '', '', 0,);
  numConta : string = localStorage.getItem('numConta')?? '';

  constructor(
    private router: Router, 
    private transacaoService: TransacaoService,
    private authService: AuthService,
    private clienteService : ClienteService
  ) {}

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
      this.mensagemErro = 'Erro: O valor do saque deve ser maior que zero.';
       Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }

    if (this.valor > this.conta.saldo) {
      this.mensagemErro = 'Erro: O valor digitado é maior que o saldo disponível.';
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
    this.transacaoService.realizarSaqueApi(this.valor, contaId).subscribe(
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
