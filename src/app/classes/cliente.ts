export class Endereco {
    constructor(
      public cep: string = '',
      public endereco: string = '',
      public numero: string = '',
      public complemento: string = '',
      public bairro: string = '',
      public cidade: string = ''
    ) {}
  }
  
  export class Cliente {
    constructor(
      public cpf: string = '',
      public nome: string = '',
      public email: string = '',
      public dataNascimento: string = '',
      public telefone: string = '',
      public statusCliente?: number,
      public endereco: Endereco = new Endereco(),
      public senha: string = '',
      public id?: number
    ) {}
  
}

