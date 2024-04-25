package com.uoldevs.clientmanagementapi;

import com.uoldevs.clientmanagementapi.exception.ValidacaoException;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import com.uoldevs.clientmanagementapi.util.Validacoes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ValidacoesTest {

  @Mock
  private ClienteRepository clienteRepository;

  @BeforeEach
  public void configurar() {
    MockitoAnnotations.openMocks(this);
    Validacoes.clienteRepository = clienteRepository;
  }

  @Test
  public void deveLancarExcecaoQuandoEmailInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarEmail("emailInvalido"));
  }

  @Test
  public void deveLancarExcecaoQuandoEmailJaRegistrado() {
    when(clienteRepository.existsByEmail("registrado@example.com")).thenReturn(true);
    assertThrows(ValidacaoException.class, () -> Validacoes.validarEmailUnico("registrado@example.com"));
  }

  @Test
  public void deveLancarExcecaoQuandoFormatoCpfInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarFormatoCpf("cpfInvalido"));
  }

  @Test
  public void deveLancarExcecaoQuandoCpfJaRegistrado() {
    when(clienteRepository.existsByCpf("cpfRegistrado")).thenReturn(true);
    assertThrows(ValidacaoException.class, () -> Validacoes.validarCpfUnico("cpfRegistrado"));
  }

  @Test
  public void deveLancarExcecaoQuandoFormatoTelefoneInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarFormatoTelefone("telefoneInvalido"));
  }

  @Test
  public void deveLancarExcecaoQuandoNomeInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarNome("")); // Nome vazio
    assertThrows(ValidacaoException.class, () -> Validacoes.validarNome("a")); // Nome com menos de 2 caracteres
    assertThrows(ValidacaoException.class, () -> Validacoes.validarNome("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut metus")); // Nome com mais de 100 caracteres
    assertThrows(ValidacaoException.class, () -> Validacoes.validarNome("John$Doe")); // Nome com caracteres especiais
  }

  @Test
  public void deveLancarExcecaoQuandoEmailUnico() {
    when(clienteRepository.existsByEmail("registrado@example.com")).thenReturn(true);
    assertThrows(ValidacaoException.class, () -> Validacoes.validarEmailUnico("registrado@example.com"));
    verify(clienteRepository).existsByEmail("registrado@example.com");
  }

  @Test
  public void deveLancarExcecaoQuandoCpfUnico() {
    try (MockedStatic<Validacoes> mocked = Mockito.mockStatic(Validacoes.class)) {
      when(clienteRepository.existsByCpf("cpfRegistrado")).thenReturn(true);
      mocked.when(() -> Validacoes.validarCpfUnico("cpfRegistrado")).thenCallRealMethod();
      assertThrows(ValidacaoException.class, () -> Validacoes.validarCpfUnico("cpfRegistrado"));
      verify(clienteRepository).existsByCpf("cpfRegistrado");
    }
  }

  @Test
  public void deveLancarExcecaoQuandoTelefoneInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarFormatoTelefone("(11)123")); // Formato de telefone inválido
    assertThrows(ValidacaoException.class, () -> Validacoes.validarFormatoTelefone("(11)12345-123")); // Formato de telefone inválido
  }

  @Test
  public void deveLancarExcecaoQuandoStatusInvalido() {
    assertThrows(ValidacaoException.class, () -> Validacoes.validarStatus("")); // Status vazio
    assertThrows(ValidacaoException.class, () -> Validacoes.validarStatus("Ativado")); // Status não permitido
  }
}