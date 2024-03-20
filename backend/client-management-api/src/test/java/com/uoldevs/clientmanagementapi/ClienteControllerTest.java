package com.uoldevs.clientmanagementapi;

import com.uoldevs.clientmanagementapi.controller.ClienteController;
import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.*;
import com.uoldevs.clientmanagementapi.service.ClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ClienteControllerTest {

  @InjectMocks
  private ClienteController clienteController;

  @Mock
  private ClienteService clienteService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void deveriaListarTodosOsClientes() {
    ClienteDto clienteDto = new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01",
        "(13)3471-1189", "Ativo");
    when(clienteService.listarClientes()).thenReturn(Arrays.asList(clienteDto));

    ResponseEntity<List<ClienteDto>> resposta = clienteController.listarClientes();

    assertEquals(HttpStatus.OK, resposta.getStatusCode());
    assertEquals(1, resposta.getBody().size());
  }

  @Test
  public void deveriaObterClientePorId() throws ClienteNotFoundException {
    ClienteDto clienteDto = new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01",
        "(13)3471-1189", "Ativo");
    when(clienteService.getClienteById(anyLong())).thenReturn(clienteDto);

    ResponseEntity<?> resposta = clienteController.obterClientePorId(1L);

    assertEquals(HttpStatus.OK, resposta.getStatusCode());
    assertEquals(clienteDto, resposta.getBody());
  }

  @Test
  public void deveriaCriarCliente() throws ValidacaoException {
    ClienteDto clienteDto = new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01",
        "(13)3471-1189", "Ativo");
    when(clienteService.cadastrarCliente(any(ClienteDto.class))).thenReturn(clienteDto);

    ResponseEntity<?> resposta = clienteController.cadastrarCliente(clienteDto);

    assertEquals(HttpStatus.CREATED, resposta.getStatusCode());
    assertEquals(clienteDto, resposta.getBody());
  }

  @Test
  public void deveriaRetornarBadRequestAoCriarClienteInvalido() throws ValidacaoException {
    when(clienteService.cadastrarCliente(any(ClienteDto.class))).thenThrow(
        new ValidacaoException("CPF Inválido"));

    ResponseEntity<?> resposta = clienteController.cadastrarCliente(
        new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01", "(13)3471-1189",
            "Ativo"));

    assertEquals(HttpStatus.BAD_REQUEST, resposta.getStatusCode());
    assertEquals("CPF Inválido", resposta.getBody());
  }

  @Test
  public void deveriaAtualizarCliente() throws ValidacaoException, ClienteNotFoundException {
    ClienteDto clienteDto = new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01",
        "(13)3471-1189", "Ativo");
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenReturn(clienteDto);

    ResponseEntity<?> resposta = clienteController.atualizarCliente(1L, clienteDto);

    assertEquals(HttpStatus.OK, resposta.getStatusCode());
    assertEquals(clienteDto, resposta.getBody());
  }

  @Test
  public void deveriaRetornarBadRequestAoAtualizarClienteInvalido()
      throws ValidacaoException, ClienteNotFoundException {
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenThrow(
        new ValidacaoException("CPF Inválido"));

    ResponseEntity<?> resposta = clienteController.atualizarCliente(1L,
        new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01", "(13)3471-1189",
            "Ativo"));

    assertEquals(HttpStatus.BAD_REQUEST, resposta.getStatusCode());
    assertEquals("CPF Inválido", resposta.getBody());
  }

  @Test
  public void deveriaRetornarNotFoundAoAtualizarClienteInexistente()
      throws ValidacaoException, ClienteNotFoundException {
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenThrow(
        new ClienteNotFoundException("Cliente não encontrado"));

    ResponseEntity<?> resposta = clienteController.atualizarCliente(1L,
        new ClienteDto(1, "Nome de Teste", "teste@email.com", "123.456.789-01", "(13)3471-1189",
            "Ativo"));

    assertEquals(HttpStatus.NOT_FOUND, resposta.getStatusCode());
    assertEquals("Cliente não encontrado", resposta.getBody());
  }
}