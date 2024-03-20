package com.uoldevs.clientmanagementapi.service;

import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.*;
import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import com.uoldevs.clientmanagementapi.util.Validacoes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

  private final ClienteRepository clienteRepository;

  @Autowired
  public ClienteService(ClienteRepository clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  public List<ClienteDto> listarClientes() {
    List<Cliente> clientes = clienteRepository.findAll();
    return clientes.stream()
        .map(ClienteDto::toCliente)
        .collect(Collectors.toList());
  }

  public ClienteDto getClienteById(Long id) {
    Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(() -> new ClienteNotFoundException("Cliente não encontrado com o ID: " + id));
    return ClienteDto.toCliente(cliente);
  }

  public ClienteDto cadastrarCliente(ClienteDto newClienteDto) {
    Validacoes.validarFormatoCpf(newClienteDto.cpf());
    Validacoes.validarEmailUnico(newClienteDto.email());
    Validacoes.validarNome(newClienteDto.nome());
    Validacoes.validarFormatoTelefone(newClienteDto.telefone());
    Validacoes.validarStatus(newClienteDto.status());

    Cliente newCliente = new Cliente(
        null,
        newClienteDto.nome(),
        newClienteDto.email(),
        newClienteDto.cpf(),
        newClienteDto.telefone(),
        newClienteDto.status()
    );

    Cliente clienteSalvo = clienteRepository.save(newCliente);
    return ClienteDto.toCliente(clienteSalvo);
  }

  public ClienteDto atualizarCliente(Long id, ClienteDto newClienteDto) {
    Cliente clienteExistente = clienteRepository.findById(id)
        .orElseThrow(() -> new ClienteNotFoundException("Cliente não encontrado com o ID: " + id));

    Validacoes.validarFormatoCpf(newClienteDto.cpf());
    Validacoes.validarNome(newClienteDto.nome());
    Validacoes.validarFormatoTelefone(newClienteDto.telefone());
    Validacoes.validarStatus(newClienteDto.status());

    // Atualiza os dados do cliente existente
    clienteExistente.setNome(newClienteDto.nome());
    clienteExistente.setEmail(newClienteDto.email());
    clienteExistente.setCpf(newClienteDto.cpf());
    clienteExistente.setTelefone(newClienteDto.telefone());
    clienteExistente.setStatus(newClienteDto.status());

    // Salva as alterações no banco de dados
    clienteExistente = clienteRepository.save(clienteExistente);
    return ClienteDto.toCliente(clienteExistente);
  }
}

