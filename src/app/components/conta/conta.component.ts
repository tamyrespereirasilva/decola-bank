import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GerenteService } from '../../services/gerente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../classes/cliente';
declare var bootstrap: any;

@Component({
  selector: 'app-conta',
  imports: [CommonModule, RouterLink],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})

export class ContaComponent implements OnInit {
  contas: any = {};
  private modalInstance: any; // Guardar a instância do modal
  cliente: Cliente = new Cliente();
  id!: number;
 
  constructor(
    private gerenteService: GerenteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('id');
    if (cpf !== null) {
      const cpfNumber = +cpf;
      this.gerenteService.getContasPorIdCliente(cpfNumber).subscribe((resposta) => {
        this.contas = resposta;
      });
    }
  }
 
  abrirModal(): void {
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }
 
  fecharModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
 
 
  encerrarConta(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.gerenteService.deleteConta(this.id).subscribe({
      complete: () => {
        this.cliente.statusCliente = 2;
        this.fecharModal();
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Erro ao solicitar encerramento da conta:', err);
      },
    });
  }
 
  getTipoContaDescricao(status?: number): string {
    return status === 1 ? 'Simples' : 'Especial';
  }
}
 