package br.com.maxicon.api.domain.cliente;

import br.com.maxicon.api.dto.DadosAtualizarCliente;
import br.com.maxicon.api.dto.DadosCliente;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "clientes")
@Entity(name = "Cliente")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Boolean ativo;

    public Cliente(DadosCliente dados) {
        this.nome = dados.nome();
        this.ativo = true;
    }

    public void excluirCliente() {
        this.ativo = false;
    }

    public void atualizar(DadosAtualizarCliente dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
    }
}
