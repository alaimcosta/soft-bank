package br.com.maxicon.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.maxicon.api.domain.cliente.Cliente;
import br.com.maxicon.api.domain.emprestimo.Emprestimo;

public record DadosDetalhamentoEmprestimo(
    Long id,
    Long clienteId,
    LocalDate dataEmprestimo,
    String moeda,
    BigDecimal valorObtidoEmprestimo,
    BigDecimal taxaConversao,
    LocalDate dataVencimentoEmprestimo,
    int quantidadeMeses,
    BigDecimal taxaJurosMensal,
    BigDecimal valorTotal,
    Boolean ativo) {

    public DadosDetalhamentoEmprestimo(Emprestimo e){
        this(e.getId(), 
            e.getCliente().getId(),
            e.getDataEmprestimo(), 
            e.getMoeda(), 
            e.getValorObtidoEmprestimo(), 
            e.getTaxaConversao(), 
            e.getDataVencimentoEmprestimo(), 
            e.getQuantidadeMeses(), 
            e.getTaxaJurosMensal(),
            e.getValorTotal(), 
            e.getAtivo()
        );

    }
}
