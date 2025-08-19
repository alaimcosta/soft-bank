package br.com.maxicon.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.maxicon.api.domain.cliente.Cliente;
import br.com.maxicon.api.dto.DadosAtualizarCliente;
import br.com.maxicon.api.dto.DadosCliente;
import br.com.maxicon.api.dto.DadosDetalhesCliente;
import br.com.maxicon.api.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("cliente")
public class ClienteController {
    
    @Autowired
    private ClienteRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody DadosCliente dados) {
        var cliente = new Cliente(dados);
        repository.save(cliente);
        return ResponseEntity.ok().body(dados);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listar(){
        var listaClients = repository.findByAtivoTrue();
        return ResponseEntity.ok(listaClients);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        var cliente = repository.getReferenceById(id);
        cliente.excluirCliente();
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizarCliente dados) {
        var cliente = repository.getReferenceById(dados.id());
        cliente.atualizar(dados);
        return ResponseEntity.ok(new DadosDetalhesCliente(cliente));
    }
}
