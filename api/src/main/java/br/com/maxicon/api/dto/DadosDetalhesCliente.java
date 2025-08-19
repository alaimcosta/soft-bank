package br.com.maxicon.api.dto;

import br.com.maxicon.api.domain.cliente.Cliente;

public record DadosDetalhesCliente(Long id, String nome) {
    public DadosDetalhesCliente(Cliente cliente){
        this(cliente.getId(), cliente.getNome());
    }
}
