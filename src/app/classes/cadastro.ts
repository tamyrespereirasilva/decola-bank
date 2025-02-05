export class Cadastro {
    constructor(
        public cpf: string = '',
        public nome: string = '',
        public email: string = '',
        public dataNascimento: string = '',
        public telefone: string = '',
        public statusCliente: number = 0,
        public cep: string = '',
        public endereco: string = '',
        public numero: string = '',
        public complemento: string = '',
        public bairro: string = '',
        public cidade: string = '',
        public senha: string = '',
        public tipoConta: string = '',
        public agencia: string = '',
        public numConta: string = ''
    ) { }
}
