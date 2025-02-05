import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenteService } from '../../../services/gerente.service';
import { Cliente } from '../../../classes/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-alteracao',
  imports: [FormsModule],
  templateUrl: './cliente-alteracao.component.html',
  styleUrl: './cliente-alteracao.component.css'
})
export class ClienteAlteracaoComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private gerenteService: GerenteService) {}

    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.gerenteService.getCliente(this.id).subscribe(res => this.cliente = res);
    }

    id!: number;
    cliente: Cliente = new Cliente();

    fechar(): void {
      this.router.navigate(['/clientes']);
    }

    alterar(cliente: Cliente): void {
      this.gerenteService.putClientes(cliente, this.id)
        .subscribe(() => this.fechar());
    }
  
}
