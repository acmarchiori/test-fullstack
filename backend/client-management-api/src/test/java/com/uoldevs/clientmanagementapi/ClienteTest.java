package com.uoldevs.clientmanagementapi;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

public class ClienteTest {

  @InjectMocks
  private Cliente cliente;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    cliente = new Cliente(1L, "John Doe", "john@example.com", "123.456.789-00", "(11)99999-9999", "Ativo");
  }

  @Test
  public void shouldReturnCorrectId() {
    assertEquals(1L, cliente.getId());
  }

  @Test
  public void shouldReturnCorrectName() {
    assertEquals("John Doe", cliente.getNome());
  }

  @Test
  public void shouldReturnCorrectEmail() {
    assertEquals("john@example.com", cliente.getEmail());
  }

  @Test
  public void shouldReturnCorrectCpf() {
    assertEquals("123.456.789-00", cliente.getCpf());
  }

  @Test
  public void shouldReturnCorrectTelefone() {
    assertEquals("(11)99999-9999", cliente.getTelefone());
  }

  @Test
  public void shouldReturnCorrectStatus() {
    assertEquals("Ativo", cliente.getStatus());
  }
}