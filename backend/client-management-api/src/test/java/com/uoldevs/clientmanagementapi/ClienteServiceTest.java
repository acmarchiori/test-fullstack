package com.uoldevs.clientmanagementapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;


import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.CpfInvalidoException;
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
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.Answer;

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

//  @Test
//  void testCadastrarCliente() {
//    // Criar um novo cliente DTO
//    ClienteDto clienteDto = new ClienteDto(null, "John Doe", "john@example.com", "123.456.789-00", "(11)9998-8745", "Ativo");
//
//    // Mock do retorno do método validarCpfUnico para sempre retornar true
//    when(validacoes.validarCpfUnico("123.456.789-00")).thenReturn(true);
//
//// Mock do retorno do repositório ao salvar o cliente
//    Cliente clienteSalvo = new Cliente();
//    clienteSalvo.setId(1L); // Definindo um ID válido
//    when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteSalvo);
//
//    // Chamar o método de cadastrarCliente
//    ClienteDto clienteCadastrado = clienteService.cadastrarCliente(clienteDto);
//
//    // Verificar se o cliente foi cadastrado corretamente
//    assertEquals(clienteDto.nome(), clienteCadastrado.nome());
//    assertEquals(clienteDto.email(), clienteCadastrado.email());
//    assertEquals(clienteDto.cpf(), clienteCadastrado.cpf());
//    assertEquals(clienteDto.telefone(), clienteCadastrado.telefone());
//    assertEquals(clienteDto.status(), clienteCadastrado.status());
//  }



  @Test
  void testCadastrarCliente_CpfDuplicado() {
    // Criar um novo cliente DTO com CPF duplicado
    ClienteDto clienteDto = new ClienteDto(null, "John Doe", "john@example.com", "123.456.789-00", "(11)9999-9999", "Ativo");

    // Mock do retorno do método validarCpfUnico() para lançar CpfInvalidoException
    when(validacoes.validarCpfUnico("123.456.789-00")).thenThrow(new CpfInvalidoException("CPF já cadastrado"));

    // Criar uma instância do serviço
    ClienteService clienteService = new ClienteService(clienteRepository, validacoes);

    // Verificar se a exceção é lançada ao tentar cadastrar um cliente com CPF duplicado
    assertThrows(CpfInvalidoException.class, () -> {
      clienteService.cadastrarCliente(clienteDto);
    });
  }




//  @Test
//  void testAtualizarCliente() {
//    // Criar um cliente existente e um cliente DTO com dados atualizados
//    Cliente clienteExistente = new Cliente(1L, "John Doe", "john@example.com", "123.456.789-00", "(11)9999-9999", "Ativo");
//    ClienteDto clienteDtoAtualizado = new ClienteDto(1L, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo");
//
//    // Mock das validações
//    when(validacoes.validarFormatoCpf("123.456.789-01")).thenReturn(true);
//    when(validacoes.validarCpfUnico("123.456.789-01")).thenReturn(true);
//    when(validacoes.validarEmailUnico("jane@example.com")).thenReturn(true);
//    when(validacoes.validarNome("Jane Doe")).thenReturn(true);
//    when(validacoes.validarFormatoTelefone("(11)8888-8888")).thenReturn(true);
//    when(validacoes.validarStatus("Inativo")).thenReturn(true);
//
//    // Mock do retorno do repositório ao buscar o cliente pelo ID
//    when(clienteRepository.findById(1L)).thenReturn(Optional.of(clienteExistente));
//
//    // Mock do retorno do repositório ao salvar o cliente atualizado
//    Cliente clienteAtualizado = new Cliente(1L, "Jane Doe", "jane@example.com", "123.456.789-01", "(11)8888-8888", "Inativo");
//    when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteAtualizado);
//
//    // Chamar o método de atualizarCliente
//    ClienteDto clienteAtualizadoDto = clienteService.atualizarCliente(1L, clienteDtoAtualizado);
//
//    // Verificar se o cliente foi atualizado corretamente
//    assertEquals(clienteDtoAtualizado.nome(), clienteAtualizadoDto.nome());
//    assertEquals(clienteDtoAtualizado.email(), clienteAtualizadoDto.email());
//    assertEquals(clienteDtoAtualizado.cpf(), clienteAtualizadoDto.cpf());
//    assertEquals(clienteDtoAtualizado.telefone(), clienteAtualizadoDto.telefone());
//    assertEquals(clienteDtoAtualizado.status(), clienteAtualizadoDto.status());
//  }
}
