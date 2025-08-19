
import { Routes } from '@angular/router'; 
import { ClienteComponent } from './components/cliente/cliente.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';

export const routes: Routes = [
    /* { path: 'detalhe/:id', component: DetalhesSolicitacaoComponent }, */
    { path: '', component: ClienteComponent },
    { path: 'solicitacaoEmprestimo', component: EmprestimoComponent }
    
];
