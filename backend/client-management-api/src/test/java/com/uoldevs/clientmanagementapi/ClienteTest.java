package com.uoldevs.clientmanagementapi;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.uoldevs.clientmanagementapi.models.entities.Cliente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ClienteTest {

  @InjectMocks
  private Cliente cliente;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    cliente = new Cliente(1L, "John Doe", "john@example.com", "123.456.789-00", "(11)99999-9999", "Ativo");
  }

  @Test
  public void deveRetornarIdCorreto() {
    assertEquals(1L, cliente.getId());
  }

  @Test
  public void deveRetornarNomeCorreto() {
    assertEquals("John Doe", cliente.getNome());
  }

  @Test
  public void deveRetornarEmailCorreto() {
    assertEquals("john@example.com", cliente.getEmail());
  }

  @Test
  public void deveRetornarCpfCorreto() {
    assertEquals("123.456.789-00", cliente.getCpf());
  }

  @Test
  public void deveRetornarTelefoneCorreto() {
    assertEquals("(11)99999-9999", cliente.getTelefone());
  }

  @Test
  public void deveRetornarStatusCorreto() {
    assertEquals("Ativo", cliente.getStatus());
  }
}