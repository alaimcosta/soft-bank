package br.com.maxicon.api.domain.emprestimo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;

import br.com.maxicon.api.domain.cliente.Cliente;
import br.com.maxicon.api.dto.DadosAtualizarEmprestimo;
import br.com.maxicon.api.dto.DadosSolicitacaoEmprestimo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "emprestimos")
@Entity(name = "Emprestimo")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    private LocalDate dataEmprestimo;
    private String moeda;
    private BigDecimal valorObtidoEmprestimo;
    private BigDecimal taxaConversao;
    private LocalDate dataVencimentoEmprestimo;
    private int quantidadeMeses;
    private BigDecimal taxaJurosMensal;
    private BigDecimal valorTotal;
    private Boolean ativo;

    public Emprestimo(DadosSolicitacaoEmprestimo dados, Cliente clienteExistente) {
        if (clienteExistente == null) {
            throw new IllegalArgumentException("Cliente não pode ser nulo.");
        }
        this.cliente = clienteExistente;
        this.dataEmprestimo = dados.dataEmprestimo();
        this.moeda = dados.moeda();
        this.valorObtidoEmprestimo = dados.valorObtidoEmprestimo();
        this.taxaConversao = dados.taxaConversao();
        this.dataVencimentoEmprestimo = dados.dataVencimentoEmprestimo();
        Period per = Period.between(this.dataEmprestimo, this.dataVencimentoEmprestimo);
        this.quantidadeMeses = per.getYears() * 12 + per.getMonths();
        this.taxaJurosMensal = dados.taxaJurosMensal();
        this.valorTotal = dados.valorTotal();
        this.ativo = true;
    }

    public void inativarEmprestimo() {
        this.ativo = false;
    }

    public void atualizarInformacoesEmprestimo(DadosAtualizarEmprestimo dados) {
        if (dados.cliente() != null){
            this.cliente = dados.cliente();
        }
        if (dados.dataEmprestimo() != null) {
            this.dataEmprestimo = dados.dataEmprestimo();
        }
        if (dados.moeda() != null) {
            this.moeda = dados.moeda();
        }
        if (dados.valorObtidoEmprestimo() != null) {
            this.valorObtidoEmprestimo = dados.valorObtidoEmprestimo();
        }
        if (dados.taxaConversao() != null) {
            this.taxaConversao = dados.taxaConversao();
        }
        if (dados.dataVencimentoEmprestimo() != null) {
            this.dataVencimentoEmprestimo = dados.dataVencimentoEmprestimo();
        }
        if (dados.taxaJurosMensal() != null) {
            this.taxaJurosMensal = dados.taxaJurosMensal();
        }
    }



    
}
