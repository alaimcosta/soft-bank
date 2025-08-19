package br.com.maxicon.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.maxicon.api.domain.cliente.Cliente;

public record DadosAtualizarEmprestimo(
    Long id,
    Cliente cliente,
    LocalDate dataEmprestimo,
    String moeda,
    BigDecimal valorObtidoEmprestimo,
    BigDecimal taxaConversao,
    LocalDate dataVencimentoEmprestimo,
    int quantidadeMeses,
    BigDecimal taxaJurosMensal
) {}
