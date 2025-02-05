export class PagamentoBoleto{
 
    constructor(
        public codBarras: string = '',
        public dataVencimento: string = '',
        public valor: number = 0,
        public descricao: string = '',
       
    ){}
 
}
 