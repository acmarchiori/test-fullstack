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
  public void shouldListAllClients() {
    ClienteDto clienteDto = new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo");
    when(clienteService.listarClientes()).thenReturn(Arrays.asList(clienteDto));

    ResponseEntity<List<ClienteDto>> response = clienteController.listarClientes();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(1, response.getBody().size());
  }

  @Test
  public void shouldGetClientById() throws ClienteNotFoundException {
    ClienteDto clienteDto = new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo");
    when(clienteService.getClienteById(anyLong())).thenReturn(clienteDto);

    ResponseEntity<?> response = clienteController.obterClientePorId(1L);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(clienteDto, response.getBody());
  }

  @Test
  public void shouldCreateClient() throws ValidacaoException {
    ClienteDto clienteDto = new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo");
    when(clienteService.cadastrarCliente(any(ClienteDto.class))).thenReturn(clienteDto);

    ResponseEntity<?> response = clienteController.cadastrarCliente(clienteDto);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(clienteDto, response.getBody());
  }

  @Test
  public void shouldReturnBadRequestWhenCreatingInvalidClient() throws ValidacaoException {
    when(clienteService.cadastrarCliente(any(ClienteDto.class))).thenThrow(new ValidacaoException("Invalid CPF"));

    ResponseEntity<?> response = clienteController.cadastrarCliente(new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo"));

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("Invalid CPF", response.getBody());
  }

  @Test
  public void shouldUpdateClient() throws ValidacaoException, ClienteNotFoundException {
    ClienteDto clienteDto = new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo");
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenReturn(clienteDto);

    ResponseEntity<?> response = clienteController.atualizarCliente(1L, clienteDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(clienteDto, response.getBody());
  }

  @Test
  public void shouldReturnBadRequestWhenUpdatingInvalidClient() throws ValidacaoException, ClienteNotFoundException {
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenThrow(new ValidacaoException("Invalid CPF"));

    ResponseEntity<?> response = clienteController.atualizarCliente(1L, new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo"));

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("Invalid CPF", response.getBody());
  }

  @Test
  public void shouldReturnNotFoundWhenUpdatingNonExistentClient() throws ValidacaoException, ClienteNotFoundException {
    when(clienteService.atualizarCliente(anyLong(), any(ClienteDto.class))).thenThrow(new ClienteNotFoundException("Client not found"));

    ResponseEntity<?> response = clienteController.atualizarCliente(1L, new ClienteDto(1, "Test Name", "test@email.com", "123.456.789-01", "(13)3471-1189", "Ativo"));

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals("Client not found", response.getBody());
  }
}