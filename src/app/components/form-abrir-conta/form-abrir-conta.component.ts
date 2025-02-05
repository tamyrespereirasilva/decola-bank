import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-abrir-conta',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-abrir-conta.component.html',
  styleUrls: ['./form-abrir-conta.component.css']
})
export class FormAbrirContaComponent {
  cpf: string = '';
  nomeCompleto: string = '';
  email: string = '';
  confirmacaoEmail: string = '';
  politica: boolean = false;
  mostrarPopup = false;

  constructor(private router: Router) {}

  fecharFormulario() {
    this.router.navigate(['/home']);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.mostrarPopup = true;
      console.log('Formulário enviado com sucesso:', form.value);
    }
  }

  concluir() {
    this.router.navigate(['/home']);
  }
}