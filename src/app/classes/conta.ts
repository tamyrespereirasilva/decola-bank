export class Conta {
    constructor(
      public agencia: string = '',
      public numConta: string = '',
      public saldo: number = 0,
      public dataCriacao: Date = new Date(),
      public tipoConta: number = 0,
      public idCliente: number = 0,
      public nomeCliente: string = '',
      public cpfCliente: string = '',
      public id?: number,
    ) {} 
  }

