package br.com.maxicon.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maxicon.api.domain.emprestimo.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    List<Emprestimo> findByAtivoTrue();

}
