package com.uoldevs.clientmanagementapi;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.ClienteNotFoundException;
import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import com.uoldevs.clientmanagementapi.service.ClienteService;
import com.uoldevs.clientmanagementapi.util.Validacoes;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class ClienteServiceTest {

  @Mock
  private ClienteRepository clienteRepository;

  @Mock
  private Validacoes validacoes;

  @InjectMocks
  private ClienteService clienteService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    // Mock do clienteRepository dentro de validacoes
    validacoes.clienteRepository = clienteRepository;
  }

  @Test
  void testListarClientes() {
    // Mock dos clientes retornados pelo repositório
    List<Cliente> clientes = new ArrayList<>();
    clientes.add(new Cliente(1L, "John Doe", "john@example.com", "123.456.789-00", "(11)9999-9999", "Ativo"));
    clientes.add(new Cliente(2L, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo"));

    // Simulação do comportamento do repositório
    when(clienteRepository.findAll()).thenReturn(clientes);

    // Chama o método do serviço a ser testado
    List<ClienteDto> result = clienteService.listarClientes();

    // Verifica se o resultado não está vazio
    assertFalse(result.isEmpty());
    // Verifica se a quantidade de clientes retornados está correta
    assertEquals(clientes.size(), result.size());
    // Verifica se os detalhes dos clientes estão corretos
    assertEquals("John Doe", result.get(0).nome());
    assertEquals("john@example.com", result.get(0).email());
    assertEquals("123.456.789-00", result.get(0).cpf());
    assertEquals("(11)9999-9999", result.get(0).telefone());
    assertEquals("Ativo", result.get(0).status());
    assertEquals("Jane Doe", result.get(1).nome());
    assertEquals("jane@example.com", result.get(1).email());
    assertEquals("123.456.789-01", result.get(1).cpf());
    assertEquals("(11)8888-8888", result.get(1).telefone());
    assertEquals("Inativo", result.get(1).status());
  }

  @Test
  void shouldReturnClienteDtoWhenCadastrado() {
    ClienteDto clienteDto = new ClienteDto(null, "John Doe", "john@example.com", "123.456.789-99", "(11)9999-9999", "Ativo");
    Cliente cliente = new Cliente(1L, "John Doe", "john@example.com", "123.456.789-99", "(11)9999-9999", "Ativo");

    // Configurar o mock para retornar true ao validar CPF único
    when(validacoes.validarCpfUnico("123.456.789-99")).thenReturn(true);

    when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

    ClienteDto result = clienteService.cadastrarCliente(clienteDto);

    assertEquals(cliente.getNome(), result.nome());
    assertEquals(cliente.getEmail(), result.email());
    assertEquals(cliente.getCpf(), result.cpf());
    assertEquals(cliente.getTelefone(), result.telefone());
    assertEquals(cliente.getStatus(), result.status());
  }

  @Test
  void shouldReturnClienteDtoWhenAtualizado() {
    ClienteDto clienteDto = new ClienteDto(1, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo");
    Cliente cliente = new Cliente(1L, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo");
    when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
    when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

    ClienteDto result = clienteService.atualizarCliente(1L, clienteDto);

    assertEquals(cliente.getNome(), result.nome());
    assertEquals(cliente.getEmail(), result.email());
    assertEquals(cliente.getCpf(), result.cpf());
    assertEquals(cliente.getTelefone(), result.telefone());
    assertEquals(cliente.getStatus(), result.status());
  }

  @Test
  void shouldThrowClienteNotFoundExceptionWhenAtualizadoIdDoesNotExist() {
    ClienteDto clienteDto = new ClienteDto(1, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo");
    when(clienteRepository.findById(1L)).thenReturn(Optional.empty());

    assertThrows(ClienteNotFoundException.class, () -> {
      clienteService.atualizarCliente(1L, clienteDto);
    });
  }

  @Test
  void shouldReturnClienteDtoWhenGetClienteById() {
    Cliente cliente = new Cliente(1L, "John Doe", "john@example.com", "123.456.789-00", "(11)9999-9999", "Ativo");
    when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

    ClienteDto result = clienteService.getClienteById(1L);

    assertEquals(cliente.getNome(), result.nome());
    assertEquals(cliente.getEmail(), result.email());
    assertEquals(cliente.getCpf(), result.cpf());
    assertEquals(cliente.getTelefone(), result.telefone());
    assertEquals(cliente.getStatus(), result.status());
  }

  @Test
  void shouldThrowClienteNotFoundExceptionWhenGetClienteByIdNotFound() {
    when(clienteRepository.findById(1L)).thenReturn(Optional.empty());

    assertThrows(ClienteNotFoundException.class, () -> {
      clienteService.getClienteById(1L);
    });
  }
}
