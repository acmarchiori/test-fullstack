package com.uoldevs.clientmanagementapi.models.repositories;

import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * ClienteRepository.
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  boolean existsByCpf(String cpf);

  boolean existsByEmail(String email);
}
