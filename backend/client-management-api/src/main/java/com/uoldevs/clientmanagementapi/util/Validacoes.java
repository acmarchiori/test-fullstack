package com.uoldevs.clientmanagementapi.util;

import com.uoldevs.clientmanagementapi.exception.CpfInvalidoException;
import com.uoldevs.clientmanagementapi.exception.EmailInvalidoException;
import com.uoldevs.clientmanagementapi.exception.NomeInvalidoException;
import com.uoldevs.clientmanagementapi.exception.TelefoneInvalidoException;
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
      throw new NomeInvalidoException("Nome inválido");
    }
  }

  /**
   * Validação de email.
   */
  public static void validarEmailUnico(String email) {
    if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
      throw new EmailInvalidoException("Email inválido");
    }

    if (clienteRepository.existsByEmail(email)) {
      throw new EmailInvalidoException("Email já cadastrado");
    }
  }

  /**
   * Validação de formato de CPF.
   */
  public static void validarFormatoCpf(String cpf) {
    if (!cpf.matches("^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$")) {
      throw new CpfInvalidoException("CPF inválido");
    }
  }

  /**
   * Validação de CPF único.
   */
  public boolean validarCpfUnico(String cpf) {
    return !clienteRepository.existsByCpf(cpf);
  }


  /**
   * Validação de formato de telefone.
   */
  public static void validarFormatoTelefone(String telefone) {
    if (telefone != null && !telefone.matches("^\\([0-9]{2}\\)[0-9]{4,5}-[0-9]{4}$")) {
      throw new TelefoneInvalidoException("Formato de telefone inválido");
    }
  }

  /**
   * Validação de status valido.
   */
  public static boolean validarStatus(String status) {
    return status != null && (status.equals("Ativo") || status.equals("Inativo")
        || status.equals("Aguardando ativação") || status.equals("Desativado"));
  }
}
