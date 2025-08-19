package br.com.maxicon.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DadosSolicitacaoEmprestimo(
    Long clienteId,
    LocalDate dataEmprestimo,
    String moeda,
    BigDecimal valorObtidoEmprestimo,
    BigDecimal taxaConversao,
    LocalDate dataVencimentoEmprestimo,
    int quantidadeMeses,
    BigDecimal taxaJurosMensal,
    BigDecimal valorTotal
) {}
