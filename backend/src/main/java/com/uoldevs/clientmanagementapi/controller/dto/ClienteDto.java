package com.uoldevs.clientmanagementapi.controller.dto;

import com.uoldevs.clientmanagementapi.models.entities.Cliente;

/**
 * Cliente DTO.
 */
public record ClienteDto(
    Integer id,
    String nome,
    String email,
    String cpf,
    String telefone,
    String status) {

  /**
   * Cliente DTO.
   */
  public static ClienteDto toCliente(Cliente cliente) {
    return new ClienteDto(
        cliente.getId().intValue(),
        cliente.getNome(),
        cliente.getEmail(),
        cliente.getCpf(),
        cliente.getTelefone(),
        cliente.getStatus());
  }
}
