 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransacaoService } from '../../../../services/transacao.service';
import { ClienteService } from '../../../../services/clientes.service';
import { Conta } from '../../../../classes/conta';
import { PagamentoBoleto } from '../../../../classes/pagamentoBoleto';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
 
 
@Component({
  selector: 'app-pagamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
 
  valor: number = 0;
  codigoPagamento: string = '';
  dataVencimento: string = '';
  descricao: string = '';
  mensagemErro: string = '';
  mensagemSucesso: string = '';
  numConta: string = localStorage.getItem('numConta')?? '';
  conta : Conta = new Conta();
  pagamentoBoleto : PagamentoBoleto = new PagamentoBoleto();
 
 
  constructor(private router: Router,
     private transacaoService : TransacaoService,
      private clienteService : ClienteService,
      private authService : AuthService) {}
 
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
 
 
    pagar(): void {
 
      this.pagamentoBoleto = new PagamentoBoleto(this.codigoPagamento,this.dataVencimento,this.valor,this.descricao);
 
 
      if (!this.conta) {
        this.mensagemErro = 'Erro: Conta não encontrada.';
        return;
      }
 
      if (this.valor <= 0) {
        this.mensagemErro = 'Erro: O valor do pagamento deve ser maior que zero.';
        return;
      }
 
      const contaId = this.conta.id;
      if (contaId === undefined) {
        this.mensagemErro = 'Erro: ID da conta inválido.';
        return;
      }
 
      // Realizar a transação de pagamento na API
      this.transacaoService.realizarPagamentoApi(contaId, this.pagamentoBoleto).subscribe(
        (resposta: string) => {
          this.mensagemSucesso = resposta; // Mensagem de sucesso retornada da API
          Swal.fire('Sucesso', this.mensagemSucesso, 'success');
          console.log(resposta) // Mensagem de sucesso retornada da API
          setTimeout(() => {
            this.router.navigate(['/tela-inicial-cliente']); // Volta para tela inicial
          }, 3000); // Espera 2 segundos antes de voltar
        },
        (error) => {
          console.error('Erro ao processar o pagamento', error);
          this.mensagemErro = 'Erro ao processar o pagamento.';
          Swal.fire('Erro', this.mensagemErro, 'error');
        }
      );
     
    }
   
 
  voltar(): void {
    this.router.navigate(['/tela-inicial-cliente']);
  }
 
}
 