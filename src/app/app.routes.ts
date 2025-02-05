import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginClienteComponent } from './components/cliente/login-cliente/login-cliente.component';
import { FormAbrirContaComponent } from './components/form-abrir-conta/form-abrir-conta.component';
import { GerenteComponent } from './components/gerente/gerente.component';
import { ClienteNovoComponent } from './components/gerente/cliente-novo/cliente-novo.component';
import { ClienteAlteracaoComponent } from './components/gerente/cliente-alteracao/cliente-alteracao.component';
import { ContaComponent } from './components/conta/conta.component';
import { ExtratoComponent } from './components/conta/extrato/extrato.component';
import { TelaInicialClienteComponent } from './components/cliente/tela-inicial-cliente/tela-inicial-cliente.component';
import { LoginGerenteComponent } from './components/gerente/login-gerente/login-gerente.component';
import { SaqueComponent } from './components/cliente/tela-inicial-cliente/saque/saque.component';
import { PagamentoComponent } from './components/cliente/tela-inicial-cliente/pagamento/pagamento.component';
import { DepositoComponent } from './components/cliente/tela-inicial-cliente/deposito/deposito.component';
import { TransferenciaComponent } from './components/cliente/tela-inicial-cliente/transferencia/transferencia.component';
import { PixComponent } from './components/cliente/tela-inicial-cliente/pix/pix.component';
import { ViewExtratoComponent } from './components/conta/extrato/view-extrato/view-extrato.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent},
  { path: 'tela-inicial-cliente', component: TelaInicialClienteComponent, canActivate: [AuthGuard] },
  { path: 'abrirconta', component: FormAbrirContaComponent },
  { path: 'login/cliente', component: LoginClienteComponent},
  { path: 'login/gerente', component: LoginGerenteComponent },
  
  {path: 'clientes', component: GerenteComponent}, // tabela crud na tela inicial após autenticação do gerente
  {path: 'clientes/novo', component: ClienteNovoComponent}, // button acima da tabela CREATE
  {path: 'clientes/alterar/:id', component: ClienteAlteracaoComponent}, // ícone do lápis UPDATE
  {path: 'clientes/conta/:id', component: ContaComponent}, // icone da lupa ou olho para exibir detalhes da conta do respectivo cliente na tabela READ
  {path: 'clientes/conta/extrato/:id', component: ExtratoComponent}, // ícone extrato para consultar o extrato relacionado ao cliente READ 
  
  { path: 'saque', component: SaqueComponent, canActivate: [AuthGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [AuthGuard] },
  { path: 'extrato', component: ExtratoComponent, canActivate: [AuthGuard] },
  { path: 'view-extrato', component: ViewExtratoComponent, canActivate: [AuthGuard] },
  { path: 'deposito', component: DepositoComponent, canActivate: [AuthGuard] },
  { path: 'transferencia', component: TransferenciaComponent, canActivate: [AuthGuard] },
  { path: 'pix', component: PixComponent, canActivate: [AuthGuard] }

  
];
