import { Component, OnInit } from '@angular/core';
import { Emprestimo } from '../../models/emprestimo.model';
import { EmprestimoService } from '../../services/emprestimo.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Moeda } from '../../models/moeda.model';

@Component({
  standalone: true,
  selector: 'app-emprestimo',
  imports: [CommonModule, FormsModule],
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css'] 
})
export class EmprestimoComponent implements OnInit {
  clientes: Cliente[] = [];
  emprestimos: Emprestimo[] = [];

  // Campos do formulário
  editId: number | null = null;
  clienteId!: number;
  dataEmprestimo!: string;
  moeda: string = 'BRL';
  valorObtidoEmprestimo!: number;
  taxaConversao!: number;
  taxaJurosMensal!: number; // taxa de juros mensal em %
  dataVencimentoEmprestimo!: string;
  valorTotal!: number;
  
  opcoesMoeda: Moeda[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.emprestimoService.listarMoedas().subscribe({
      next: (moedas) => {
        this.opcoesMoeda = moedas;
      },
      error: (err) => {
        console.error('Erro ao carregar moedas', err);
        this.opcoesMoeda = [];
      }
    });
    this.atualizarLista();
  }

  onMoedaChange(){
    if (!this.moeda || !this.dataEmprestimo) {
      return;
    }
    const dataFormatada = new Date(this.dataEmprestimo).toLocaleDateString('en-US');

    this.emprestimoService.cotacaoMoeda(this.moeda, dataFormatada).subscribe({
      next: (cotacao) => {
        console.log(cotacao)
        this.taxaConversao = cotacao;
      },
      error: (err) => {
        console.log("Erro ao carregar cotação ", err);
        console.error("Erro no carregamento da cotação");
      }
    });
  }

  getNomeCliente(clienteId: number): string {
    return this.clientes?.find(c => c.id === clienteId)?.nome ?? '';
  }

  atualizarLista() {
    this.emprestimoService.listar().subscribe({
      next: (dados) => {
        this.emprestimos = dados.map(e => ({
          ...e,
          dataEmprestimo: new Date(e.dataEmprestimo),
          dataVencimentoEmprestimo: new Date(e.dataVencimentoEmprestimo)
        }));
      }
    })
  }

  salvar(): void {
    if (!this.validarFormulario()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const meses = this.emprestimoService.calcularMeses(
      new Date(this.dataEmprestimo),
      new Date(this.dataVencimentoEmprestimo)
    );

    const valorEmReais = this.valorObtidoEmprestimo * this.taxaConversao;

    this.valorTotal = this.emprestimoService.calcularValorFinal(
      valorEmReais,
      this.taxaJurosMensal,
      meses
    );

    const emprestimo: Omit<Emprestimo, 'id'> = {
      clienteId: this.clienteId,
      dataEmprestimo: new Date(this.dataEmprestimo),
      moeda: this.moeda,
      valorObtidoEmprestimo: this.valorObtidoEmprestimo,
      taxaConversao: this.taxaConversao,
      dataVencimentoEmprestimo: new Date(this.dataVencimentoEmprestimo),
      taxaJurosMensal: this.taxaJurosMensal,
      valorTotal: this.valorTotal
    };

    if(this.editId){
      const emprestimoEditado: Emprestimo = {
        id: this.editId,
        clienteId: this.clienteId,
        dataEmprestimo: new Date(this.dataEmprestimo),
        moeda: this.moeda,
        valorObtidoEmprestimo: this.valorObtidoEmprestimo,
        taxaConversao: this.taxaConversao,
        dataVencimentoEmprestimo: new Date(this.dataVencimentoEmprestimo),
        taxaJurosMensal: this.taxaJurosMensal,
        valorTotal: this.valorTotal
      };

      this.emprestimoService.atualizar(emprestimoEditado).subscribe({
        next: () => {
          this.limparFormulario();
          this.atualizarLista();
        },
        error: (err) => {
          console.error('Erro ao atualizar empréstimo: ', err);
          alert('Não foi possível atualizar o empréstimo.');
        }
      });
    } else {
      this.emprestimoService.adicionar(emprestimo).subscribe({
        next: () => {
          this.limparFormulario();
          this.atualizarLista();
        },
        error: (err) => {
          console.error('Erro ao salvar empréstimo: ', err);
          alert('Não foi possível salvar o empréstimo.')
        }
      });
    }
    
  }
  validarFormulario(): boolean {
    return (
      this.clienteId != null &&
      this.dataEmprestimo != null &&
      this.moeda !== '' &&
      this.valorObtidoEmprestimo > 0 &&
      this.taxaConversao > 0 &&
      this.dataVencimentoEmprestimo != null &&
      this.taxaJurosMensal != null &&
      this.taxaJurosMensal >= 0
    );
  }
  editar(emprestimo: Emprestimo){    
    this.editId = emprestimo.id;
    this.clienteId = emprestimo.clienteId;
    this.dataEmprestimo = emprestimo.dataEmprestimo.toISOString().slice(0, 10);
    this.moeda = emprestimo.moeda;
    this.valorObtidoEmprestimo = emprestimo.valorObtidoEmprestimo;
    this.taxaConversao = emprestimo.taxaConversao;
    this.dataVencimentoEmprestimo = emprestimo.dataVencimentoEmprestimo.toISOString().slice(0, 10);
    this.taxaJurosMensal = emprestimo.taxaJurosMensal;
  }

  remover(id: number) {
    this.emprestimoService.remover(id).subscribe({
      next: () => {
        this.atualizarLista();
      },
      error: (err) => {
        console.error('Erro ao tentar excluir empréstimo: ', err);
        alert('Não foi possível excluir o empréstimo.')
      }
    });
    
  }

  cancelar() {
    this.editId = null;
    this.limparFormulario();
  }

  limparFormulario() {
    this.clienteId = 0;
    this.dataEmprestimo = '';
    this.moeda = 'BRL';
    this.valorObtidoEmprestimo = 0;
    this.taxaConversao = 0;
    this.dataVencimentoEmprestimo = '';
    this.taxaJurosMensal = 0;
  }

  mesesEntre(emprestimo: Emprestimo): number {
    return this.emprestimoService.calcularMeses(emprestimo.dataEmprestimo, emprestimo.dataVencimentoEmprestimo);
  }
}
