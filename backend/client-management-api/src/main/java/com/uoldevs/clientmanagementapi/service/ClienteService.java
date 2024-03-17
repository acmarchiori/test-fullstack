package com.uoldevs.clientmanagementapi.service;

import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.ClienteNotFoundException;
import com.uoldevs.clientmanagementapi.exception.CpfDuplicadoException;
import com.uoldevs.clientmanagementapi.exception.CpfInvalidoException;
import com.uoldevs.clientmanagementapi.exception.StatusInvalidoException;
import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import com.uoldevs.clientmanagementapi.util.Validacoes;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * ClienteService.
 */
@Service
public class ClienteService {

  private final ClienteRepository clienteRepository;
  private final Validacoes validacoes;

  @Autowired
  public ClienteService(ClienteRepository clienteRepository, Validacoes validacoes) {
    this.clienteRepository = clienteRepository;
    this.validacoes = validacoes;
  }


  /**
   * Listar clientes.
   */
  public List<ClienteDto> listarClientes() {
    // Busca todos os clientes no repositório de clientes
    List<Cliente> clientes = clienteRepository.findAll();

    // Mapeia cada objeto Cliente para um ClienteDto e coleta-os em uma lista
    return clientes.stream()
        .map(ClienteDto::toCliente)
        .collect(Collectors.toList());
  }

  /**
   * Obter cliente por ID.
   */
  public ClienteDto getClienteById(Long id) {
    // Busca o cliente pelo ID fornecido no repositório de clientes
    Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(() -> new ClienteNotFoundException("Cliente não encontrado com o ID: " + id));

    // Converte o cliente para ClienteDto e retorna
    return ClienteDto.toCliente(cliente);
  }

  /**
   * Cadastrar cliente.
   */
  public ClienteDto cadastrarCliente(ClienteDto newClienteDto) {
    // Validação de formato de CPF
    Validacoes.validarFormatoCpf(newClienteDto.cpf());

    // Verifica se o CPF já está cadastrado
    if (!validacoes.validarCpfUnico(newClienteDto.cpf())) {
      throw new CpfInvalidoException("CPF já cadastrado");
    }

    // Validação do e-mail
    Validacoes.validarEmailUnico(newClienteDto.email());

    // Validação do nome
    Validacoes.validarNome(newClienteDto.nome());

    // Validação do telefone
    Validacoes.validarFormatoTelefone(newClienteDto.telefone());

    // Validação do status
    if (!Validacoes.validarStatus(newClienteDto.status())) {
      throw new StatusInvalidoException("Status inválido");
    }

    // Cria uma instância de Cliente
    Cliente newCliente = new Cliente(
        null,
        newClienteDto.nome(),
        newClienteDto.email(),
        newClienteDto.cpf(),
        newClienteDto.telefone(),
        newClienteDto.status()
    );

    // Salva o cliente no banco de dados
    Cliente clienteSalvo = clienteRepository.save(newCliente);

    // Converte e retorna o cliente salvo em ClienteDto
    return ClienteDto.toCliente(clienteSalvo);
  }


  /**
   * Atualizar cliente por ID.
   */
  public ClienteDto atualizarCliente(Long id, ClienteDto newClienteDto) {
    // Busca o cliente pelo ID fornecido no repositório de clientes
    Cliente clienteExistente = clienteRepository.findById(id)
        .orElseThrow(() -> new ClienteNotFoundException("Cliente não encontrado com o ID: " + id));

    // Verifica se o CPF do cliente atualizado já existe para outro cliente
    if (!clienteExistente.getCpf().equals(newClienteDto.cpf())
        && clienteRepository.existsByCpf(newClienteDto.cpf())) {
      throw new CpfDuplicadoException("Já existe um cliente com o CPF: " + newClienteDto.cpf());
    }

    // Verifica se o e-mail fornecido já está em uso por outro cliente
    if (!clienteExistente.getEmail().equals(newClienteDto.email())
        && clienteRepository.existsByEmail(newClienteDto.email())) {
      throw new CpfDuplicadoException("Já existe um cliente com o e-mail: "
          + newClienteDto.email());
    }

    // Atualiza as informações do cliente existente com os dados do clienteDto
    clienteExistente.setNome(newClienteDto.nome());
    clienteExistente.setEmail(newClienteDto.email());
    clienteExistente.setCpf(newClienteDto.cpf());
    clienteExistente.setTelefone(newClienteDto.telefone());
    clienteExistente.setStatus(newClienteDto.status());

    // Salva o cliente atualizado no banco de dados
    clienteExistente = clienteRepository.save(clienteExistente);

    // Converte e retorna o cliente atualizado em um objeto ClienteDto
    return ClienteDto.toCliente(clienteExistente);
  }
}
