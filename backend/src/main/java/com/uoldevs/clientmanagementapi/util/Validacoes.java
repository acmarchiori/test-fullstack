package com.uoldevs.clientmanagementapi.util;

import com.uoldevs.clientmanagementapi.exception.ValidacaoException;
import com.uoldevs.clientmanagementapi.models.repositories.ClienteRepository;
import org.springframework.stereotype.Component;

/**
 * Classe que contém métodos para validação de dados.
 */
@Component
public class Validacoes {

  public static ClienteRepository clienteRepository;

  public Validacoes(ClienteRepository clienteRepository) {
    Validacoes.clienteRepository = clienteRepository;
  }

  /**
   * Validação de nome.
   */
  public static void validarNome(String nome) {
    if (nome == null
        || nome.length() < 2
        || nome.length() > 100
        || !nome.matches("^[\\p{L}\\s\\-']+$")) {
      throw new ValidacaoException("Nome inválido");
    }
  }

  /**
   * Validação de email.
   */
  public static void validarEmail(String email) {
    if (email == null || !email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
      throw new ValidacaoException("Email inválido");
    }
  }

  /**
   * Validação de email único.
   */
  public static void validarEmailUnico(String email) {
    validarEmail(email);

    if (clienteRepository.existsByEmail(email)) {
      throw new ValidacaoException("Email já cadastrado");
    }
  }

  /**
   * Validação de formato de CPF.
   */
  public static void validarFormatoCpf(String cpf) {
    if (!cpf.matches("^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$")) {
      throw new ValidacaoException("CPF inválido");
    }
  }

  /**
   * Validação de CPF único.
   */
//  public boolean validarCpfUnico(String cpf) {
//    return !clienteRepository.existsByCpf(cpf);
//  }
  public static void validarCpfUnico(String cpf) {
    validarFormatoCpf(cpf);

    if (clienteRepository.existsByCpf(cpf)) {
      throw new ValidacaoException("CPF já cadastrado");
    }
  }

  /**
   * Validação de formato de telefone.
   */
  public static void validarFormatoTelefone(String telefone) {
    if (telefone != null && !telefone.matches("^\\([0-9]{2}\\)[0-9]{4,5}-[0-9]{4}$")) {
      throw new ValidacaoException("Formato de telefone inválido");
    }
  }

  /**
   * Validação de status válido.
   */
  public static void validarStatus(String status) {
    if (status == null || !status.matches("^(Ativo|Inativo|Aguardando ativação|Desativado)$")) {
      throw new ValidacaoException("Status inválido");
    }
  }
}
