import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-login-gerente',
  imports:[FormsModule, CommonModule, RouterLink],
  templateUrl: './login-gerente.component.html',
  styleUrls: ['./login-gerente.component.css']
})
export class LoginGerenteComponent implements OnInit {
 
  senha: string = '';
  idAdmin! : number;
 
  constructor(private router : Router) {}
 
  ngOnInit(): void {}
 
  validateLength(event: Event, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
 
  onSubmit(): void {
    if (this.idAdmin) {
      this.fazerLogin(this.idAdmin);
    } else {
      console.log('idAdmin inválido');
    }
  }
 
  fazerLogin(idAdmin: number): void {
    localStorage.setItem('idAdmin', idAdmin.toString());
    this.router.navigate(['/clientes']);
  }
}
 