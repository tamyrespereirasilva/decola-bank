import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Extrato } from '../../../../classes/extrato';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-extrato',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-extrato.component.html',
  styleUrls: ['./view-extrato.component.css']
})
export class ViewExtratoComponent implements OnInit {
  transacoes: Extrato[] = [];
  modalAberto: boolean = false;
  email: string = '';

  constructor(private router: Router) {}

ngOnInit(): void {
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state?.['transacoes']) {
    this.transacoes = navigation.extras.state['transacoes'];
  } else {
    const storedTransacoes = sessionStorage.getItem('transacoes');
    this.transacoes = storedTransacoes ? JSON.parse(storedTransacoes) : [];
  }

  console.log('Transações carregadas na view:', this.transacoes);
}

  ngOnDestroy(): void {
    sessionStorage.removeItem('transacoes');
  }

  imprimirExtrato() {
    window.print();
  }
  cancelar(){
    this.router.navigate(['/extrato']);
  }

  gerarPDF() {
    const doc = new jsPDF();
    doc.text('Extrato de Transações', 10, 10);

    const colunas = ["Titular", "Valor", "Data", "Tipo", "Código", "Status", "Tarifa"];
    const linhas = this.transacoes.map(transacao => [
      transacao.titularConta,
      transacao.valor.toFixed(2),
      transacao.dataTransacao,
      transacao.tipoTransacao,
      transacao.codigoTransacao,
      transacao.statusTransacao,
      transacao.tarifa
    ]);

    (doc as any).autoTable({
      head: [colunas],
      body: linhas,
      startY: 20
    });

    // Gerar nome do arquivo concatenado com data, hora e minuto
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // AAAA-MM-DD
    const timeStr = now.toTimeString().slice(0, 5).replace(':', '-'); // HH-MM
    const fileName = `extrato_${dateStr}_${timeStr}.pdf`;

    doc.save(fileName);
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  enviarEmail() {
    if (this.email) {
      // Lógica para enviar o extrato por email
      alert(`Extrato enviado para ${this.email}`);
      this.fecharModal();
    } else {
      alert('Por favor, insira um email válido.');
    }
  }
}