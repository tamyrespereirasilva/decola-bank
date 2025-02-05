import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pix } from '../classes/pix';
import { PagamentoBoleto } from '../classes/pagamentoBoleto';



@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  private baseUrl: string = "http://localhost:8081/transacao";
  private baseUrlBoleto: string = "http://localhost:8081/boleto";

  constructor(private http: HttpClient) { }
  //Saque
  public realizarSaqueApi(valor: number, id: number): Observable<string> {
    if (!id) {
      return throwError(() => new Error("Usuário não logado."));
    }
    const url = `${this.baseUrl}/saque/${id}`;
    return this.http.post<string>(url, { valor }, { responseType: 'text' as 'json' });
  }
  
  //Depósito
  public realizarDepositoApi(valor: number, id: number): Observable<string> {
    if (!id) {
      return throwError(() => new Error("Usuário não logado."));
    }
    const url = `${this.baseUrl}/deposito/${id}`;
    return this.http.post<string>(url, { valor }, { responseType: 'text' as 'json' });
  }

  //Pix
  public realizarPixApi(id: number, chavePixDestino: string, valor: number): Observable<string> {
    const url = `${this.baseUrl}/pix/${id}/${chavePixDestino}`;
    return this.http.post<string>(url, { valor }, { responseType: 'text' as 'json' });

}

//Pagamento de boleto
public realizarPagamentoApi(id: number, pagamentoBoleto: PagamentoBoleto): Observable<string> {
  const url = `${this.baseUrlBoleto}/novo/pagamento/${id}`;  
  return this.http.post<string>(url, pagamentoBoleto,{ responseType: 'text' as 'json' } );
 
 
}
 

public realizarTransferenciaApi(valor: number, id: number, numContaDestino : string): Observable<string> {
  const url = `${this.baseUrl}/transferencia/${id}/${numContaDestino}`;
  return this.http.post<string>(url, { valor }, { responseType: 'text' as 'json' });

}
}
