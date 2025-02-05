
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../classes/conta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl: string = "http://localhost:8081/cliente";

  constructor(private http: HttpClient) { }

  obterConta(numConta: string): Observable<Conta> {
    const url = `${this.baseUrl}/home`;
    return this.http.post<Conta>(url, { numConta });
  }
}