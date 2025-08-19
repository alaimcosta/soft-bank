package br.com.maxicon.api.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarCliente(
    @NotNull
    Long id, String nome){}
