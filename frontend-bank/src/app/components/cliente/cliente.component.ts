import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'] 
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  nome: string = '';
  editId: number | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    });

  }
  
  salvar() {
    const cliente = {
      id: this.editId,
      nome: this.nome
    };
    if(this.editId !== null){
      this.clienteService.atualizar({
        nome: this.nome,
        id: this.editId
      }).subscribe({
        next: (res) => {
            this.nome = '';
            this.atualizarLista();
          },
          error: (err) => {
            console.error('Erro ao atualizar cliente:', err);
          }
      });
    } else {
      this.clienteService.adicionar({ nome: this.nome }).subscribe({
          next: (res) => {
            this.nome = '';
            this.atualizarLista();
          },
          error: (err) => {
            console.error('Erro ao adicionar cliente:', err);
          }
      });
    }
    
  }

  editar(cliente: Cliente) {
    this.editId = cliente.id;
    this.nome = cliente.nome;
  }

  remover(id: number) {
    this.clienteService.remover(id).subscribe(
      () => {
        this.atualizarLista();
      }
    );
  }

  cancelar() {
    this.editId = null;
    this.nome = '';
  }
}
