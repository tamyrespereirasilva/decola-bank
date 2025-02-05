import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransacaoService } from '../../../../services/transacao.service';
import { AuthService } from '../../../../services/auth.service';
import { ClienteService } from '../../../../services/clientes.service';
import { Pix } from '../../../../classes/pix';
import { Conta } from '../../../../classes/conta';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pix',
  imports:[CommonModule, FormsModule],
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {
  chavePix: string = '';
  valorPix: number = 0;
  selectedOption: string = '';
  mensagemErro: string = '';
  conta: Conta = new Conta();
  numConta: string = localStorage.getItem('numConta') ?? '';
  mensagemSucesso: string = '';

  pix: Pix = new Pix();

  constructor(
    private router: Router, 
    private transacaoService: TransacaoService,
    private authService: AuthService,
    private clienteService: ClienteService
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
        console.log('numConta:', this.numConta);
      },
      (error) => {
        console.error('Erro ao obter conta:', error);
      }
    ); 
  }

  realizarPix() {
    this.pix = new Pix(this.chavePix, this.valorPix);

    if (this.valorPix <= 0) {
      this.mensagemErro = 'Erro: O valor do Pix deve ser maior que zero.';
      Swal.fire('Erro', this.mensagemErro, 'error');
    } else if (this.valorPix > this.conta.saldo) {
      this.mensagemErro = 'Erro: O valor do Pix é maior que o saldo disponível.';
      Swal.fire('Erro', this.mensagemErro, 'error');
    } else if (this.conta.id === undefined) {
      this.mensagemErro = 'Erro: ID da conta inválido.';
      Swal.fire('Erro', this.mensagemErro, 'error');
    } else {
      this.transacaoService.realizarPixApi(this.conta.id, this.chavePix, this.valorPix).subscribe(
        (resposta: string) => {
          this.mensagemSucesso = resposta; // Retorna mensagem da API
          Swal.fire('Sucesso', this.mensagemSucesso, 'success');
          setTimeout(() => {
            this.router.navigate(['/tela-inicial-cliente']); // Volta para tela inicial
          }, 3000); // Espera 3 segundos antes de voltar
        },
        (error) => {
          console.error('Erro ao processar Pix', error);
          this.mensagemErro = 'Erro ao processar o Pix.';
          Swal.fire('Erro', this.mensagemErro, 'error');
        }
      );
    }

  }
  voltar(): void {
    this.router.navigate(['/tela-inicial-cliente']);
  }
    
  }
  
