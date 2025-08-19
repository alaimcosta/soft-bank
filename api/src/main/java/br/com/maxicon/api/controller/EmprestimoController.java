package br.com.maxicon.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.maxicon.api.domain.emprestimo.Emprestimo;
import br.com.maxicon.api.dto.DadosAtualizarEmprestimo;
import br.com.maxicon.api.dto.DadosDetalhamentoEmprestimo;
import br.com.maxicon.api.dto.DadosSolicitacaoEmprestimo;
import br.com.maxicon.api.repository.ClienteRepository;
import br.com.maxicon.api.repository.EmprestimoRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("emprestimo")
public class EmprestimoController {
    
    @Autowired
    private EmprestimoRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<List<DadosDetalhamentoEmprestimo>> listar(){
        var emprestimos = repository.findByAtivoTrue()
            .stream()
            .map(DadosDetalhamentoEmprestimo::new)
            .toList();
        return ResponseEntity.ok(emprestimos);
    }

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosSolicitacaoEmprestimo dados){
        var cliente = clienteRepository.findById(dados.clienteId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        var emprestimo = new Emprestimo(dados, cliente);
        repository.save(emprestimo);
        return ResponseEntity.ok(emprestimo);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        var emprestimo = repository.getReferenceById(id);
        emprestimo.inativarEmprestimo();
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizarEmprestimo dados){
        var empr = repository.getReferenceById(dados.id());
        empr.atualizarInformacoesEmprestimo(dados);
        return ResponseEntity.ok(new DadosDetalhamentoEmprestimo(empr));
    }

}
