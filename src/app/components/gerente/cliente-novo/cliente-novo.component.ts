import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GerenteService } from '../../../services/gerente.service';
// import { ContaService } from '../../../services/conta.service';
// import { Cliente } from '../../../classes/cliente';
// import { Conta } from '../../../classes/conta';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Cadastro } from '../../../classes/cadastro';
import { CepService } from '../../../services/cep.service';
declare var bootstrap: any;
// import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cliente-novo',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent {


  cpf: string = '';
  nome: string = '';
  email: string = '';
  dataNascimento: string = '';
  telefone: string = '';
  statusCliente: number = 1;
  cep: string = '';
  endereco: string = '';
  numero: string = '';
  complemento: string = '';
  bairro: string = '';
  cidade: string = '';
  senha: string = '';
  tipoConta: string = '';
  agencia: string = '';
  numConta: string = '';
  idAdmin: number = parseInt(localStorage.getItem('idAdmin')?? '');

  mensagemErro: string = '';
  mensagemSucesso: string = '';

  cadastro: Cadastro = new Cadastro(
    this.cpf, this.nome, this.email, this.dataNascimento, this.telefone, this.statusCliente, this.cep, this.endereco, this.complemento, this.bairro, 
    this.cidade,this.senha, this.tipoConta, this.agencia
  );

  constructor(
    private gerenteService: GerenteService,
    private router: Router, private cepService: CepService
  ) {}

  concluir() {
    this.cadastro = new Cadastro(
      this.cpf, this.nome, this.email, this.dataNascimento, this.telefone,
      this.statusCliente, this.cep, this.endereco, this.numero,
      this.complemento, this.bairro, this.cidade, this.senha, this.tipoConta, this.agencia, this.numConta
    );
  
    this.gerenteService.postCliente(this.cadastro, this.idAdmin).subscribe(
      response => {
        console.log("Resposta do servidor:", response);
        this.numConta = this.extrairNumeroConta(response);
        var modal = new bootstrap.Modal(document.getElementById('sucessoModal'));
        modal.show();
        // this.fechar();
      },
      error => {
        console.error("Erro ao cadastrar cliente:", error);
        this.mensagemErro = "Erro ao cadastrar cliente: " + (error.error?.message || error.message);
        window.alert(this.mensagemErro);
      }
    );
  }
  

  fechar() {
    this.router.navigate(['/clientes']);  
  }

  extrairNumeroConta(response: string): string {
    const match = response.match(/Conta:\s(\d+)/);
    return match ? match[1] : 'Desconhecido';
  }

  
  buscarEndereco() {
    if (this.cep.length === 8) {
      this.cepService.buscarCep(this.cep).subscribe(
        data => {
          if (data) {
            this.endereco = data.logradouro;
            this.bairro = data.bairro;
            this.cidade = data.localidade;
          }
        },
        error => {
          console.error('Erro ao buscar o CEP:', error);
        }
      );
    }
  }
}