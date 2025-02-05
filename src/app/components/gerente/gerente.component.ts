import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

@Component({
  selector: 'app-gerente',
  imports: [ClientesListaComponent],
  templateUrl: './gerente.component.html',
  styleUrl: './gerente.component.css'
})
export class GerenteComponent {
  constructor(private router: Router) {}

  novo(): void {
    this.router.navigate(['/clientes/novo']);
  }
}
