package com.uoldevs.clientmanagementapi.initializer;

import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

  private final ClienteRepository clienteRepository;

  public DatabaseSeeder(ClienteRepository clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    seedClientes();
  }

  private void seedClientes() {
    Cliente cliente1 = new Cliente("John Doe", "john_doe1@test.com", "123.456.789-00", "(11)9998-8745", "Ativo");
    Cliente cliente2 = new Cliente("John Doe", "john_doe2@test.com", "123.456.789-01", "(11)9998-8743", "Inativo");
    Cliente cliente3 = new Cliente("John Doe", "john_doe3@test.com", "123.456.789-02", "(11)9998-8742", "Aguardando ativação");
    Cliente cliente4 = new Cliente("John Doe", "john_doe4@test.com", "123.456.789-03", "(11)9998-8741", "Desativado");

    clienteRepository.save(cliente1);
    clienteRepository.save(cliente2);
    clienteRepository.save(cliente3);
    clienteRepository.save(cliente4);
  }
}
