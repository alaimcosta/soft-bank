package br.com.maxicon.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maxicon.api.domain.cliente.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByAtivoTrue();
    
}
