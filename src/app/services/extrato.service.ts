import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extrato } from '../classes/extrato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8081/conta"; 

  public getTransacoesApi(id: number, numConta : string, dias : number): Observable<Extrato[]> { 
      return this.http.get<Extrato[]>(`${this.baseUrl}/extrato/${numConta}/${dias}`);
    }
}