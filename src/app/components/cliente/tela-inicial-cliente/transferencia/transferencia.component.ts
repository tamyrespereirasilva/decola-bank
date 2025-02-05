import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Conta } from '../../../../classes/conta';
import { TransacaoService } from '../../../../services/transacao.service';
import { AuthService } from '../../../../services/auth.service';
import { ClienteService } from '../../../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  imports: [CommonModule, FormsModule],
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  agenciaDestinatario: string = ''; 
  numContaDestino: string = '';
  valor: number = 0; 
  conta : Conta = new Conta();
  numConta : string = localStorage.getItem('numConta')?? '';
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private router: Router,
    private transacaoService : TransacaoService,
    private authService : AuthService,
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

  transferir() {
    if (this.valor === null || this.valor <= 0) {
      this.mensagemErro = 'Erro: O valor da transferência deve ser maior que zero.';
      Swal.fire('Erro', this.mensagemErro, 'error');
    } else if (this.valor > this.conta.saldo) {
      this.mensagemErro = 'Erro: O valor digitado é maior que o saldo disponível.';
      Swal.fire('Erro', this.mensagemErro, 'error');
    } else {

      this.mensagemErro = '';
      
          const contaId = this.conta.id;
          if (contaId === undefined) {
            this.mensagemErro = 'Erro: ID da conta inválido.';
            return;
          }
      
          // Realizar a transação de saque na API
          this.transacaoService.realizarTransferenciaApi(this.valor, contaId, this.numContaDestino).subscribe(
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
  }

  voltar(): void {
    this.router.navigate(['/tela-inicial-cliente']);
  }

}

