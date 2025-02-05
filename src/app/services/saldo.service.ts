import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private baseUrl: string = 'http://localhost:8081/cliente';
  private saldo: number = 0; 

  constructor(private http: HttpClient) {}

  getSaldo(idConta: number): Observable<number> {
    const url = `${this.baseUrl}/home`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        // Extraia o saldo da resposta de texto
        const match = response.match(/R\$ (\d+,\d+)/);
        return match ? parseFloat(match[1].replace(',', '.')) : 0;
      })
    );
  }


  atualizarSaldo(valor: number): void {
    this.saldo += valor;
  
  }
}






  
