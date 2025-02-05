import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../classes/cliente';
import { Cadastro } from '../classes/cadastro';
import { Conta } from '../classes/conta';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  constructor(private http: HttpClient) { }


  baseUrl: string = "http://localhost:8081/gerente";


  public getClientes(): Observable<Cliente[]> {
    const url: string = "listar/clientes";
    return this.http.get<Cliente[]>(`${this.baseUrl}/${url}`);
  }

  public getCliente(id: number): Observable<Cliente> {
    const url = `buscar/cliente/${id}`;
    return this.http.get<Cliente>(`${this.baseUrl}/${url}`);
  }

  public getContasPorIdCliente(id: number): Observable<Conta[]>{
    const url = `${this.baseUrl}/buscar/conta/${id}`;
    return this.http.get<Conta[]>(url);
  }

  public postCliente(cadastro: Cadastro, id: number): Observable<string>{
    const url = `${this.baseUrl}/novo/clientes/${id}`;
    return this.http.post(url, cadastro, {responseType: 'text'});
  }

  public putClientes(cliente: Cliente, id: number): Observable<Cliente> {
    const url = `alterar/${id}`;
    return this.http.put<Cliente>(`${this.baseUrl}/${url}`, cliente);
  }

  public deleteConta(id: number): Observable<String> {
    const url = `${this.baseUrl}/remover/cliente/${id}`;
    return this.http.put(url, {}, {responseType: 'text'}); 
  }
}
