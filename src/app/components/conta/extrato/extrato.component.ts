import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExtratoService } from '../../../services/extrato.service';
import { Extrato } from '../../../classes/extrato';
import { ClienteService } from '../../../services/clientes.service';
import { Conta } from '../../../classes/conta';
import { AuthService } from '../../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-extrato',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  selectedOption: number = 0;
  mensagemErro: string = '';
  conta : Conta = new Conta();
  transacoes: Extrato[] = []; // Lista de transações
  numConta: string = localStorage.getItem('numConta')?? '';
  

  constructor(private router: Router,
     private extratoService: ExtratoService,
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

  visualizarExtrato() {
    const contaId = this.conta.id;
    
    if (contaId === undefined) {
      this.mensagemErro = 'Erro: ID da conta inválido.';
      Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }
  
    const dias = this.selectedOption;
    if (isNaN(dias)) {
      this.mensagemErro = 'Selecione uma opção válida.';
      Swal.fire('Erro', this.mensagemErro, 'error');
      return;
    }
  
    this.extratoService.getTransacoesApi(contaId, this.numConta, this.selectedOption).subscribe({
      next: (resposta) => {
        this.transacoes = resposta;
  
        if (this.transacoes.length === 0) {
          this.mensagemErro = 'Nenhuma transação encontrada para o período selecionado.';
          Swal.fire('Erro', this.mensagemErro, 'error');
        } else {
          this.mensagemErro = '';
  
          // Salva as transações no sessionStorage antes de navegar
          console.log('Transações antes de salvar no sessionStorage:', this.transacoes);
          sessionStorage.setItem('transacoes', JSON.stringify(this.transacoes));

  
          this.router.navigate(['/view-extrato']);
        }
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao obter transações.';
        Swal.fire('Erro', this.mensagemErro, 'error');
        console.error('Erro:', err);
      }
    });
  }

voltar(): void {
  this.router.navigate(['/tela-inicial-cliente']);
}
  
}