package com.uoldevs.clientmanagementapi.controller;

import com.uoldevs.clientmanagementapi.controller.dto.ClienteDto;
import com.uoldevs.clientmanagementapi.exception.ClienteNotFoundException;
import com.uoldevs.clientmanagementapi.exception.ValidacaoException;
import com.uoldevs.clientmanagementapi.service.ClienteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ClienteController.
 */
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://marchiori-app-gerenciamento-clientes.surge.sh"})
@RequestMapping("/clientes")
public class ClienteController {

  private final ClienteService clienteService;

  @Autowired
  public ClienteController(ClienteService clienteService) {
    this.clienteService = clienteService;
  }


  /**
   * Listar todos clientes.
   */
  @GetMapping
  public ResponseEntity<List<ClienteDto>> listarClientes() {
    List<ClienteDto> clientes = clienteService.listarClientes();
    return ResponseEntity.ok(clientes);
  }

  /**
   * Obter cliente por ID.
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> obterClientePorId(@PathVariable Long id) {
    try {
      ClienteDto cliente = clienteService.getClienteById(id);
      return ResponseEntity.ok(cliente);
    } catch (ValidacaoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  /**
   * Cadastrar cliente.
   */
  @PostMapping
  public ResponseEntity<?> cadastrarCliente(@RequestBody ClienteDto clienteDto) {
    try {
      ClienteDto novoCliente = clienteService.cadastrarCliente(clienteDto);
      return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    } catch ( ValidacaoException e) {
      // Retorna a mensagem de erro como uma string
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  /**
   * Atualizar cliente.
   */
  @PutMapping("/{id}")
  public ResponseEntity<?> atualizarCliente(@PathVariable Long id,
      @RequestBody ClienteDto clienteDto) {
    try {
      ClienteDto clienteAtualizado = clienteService.atualizarCliente(id, clienteDto);
      return ResponseEntity.ok(clienteAtualizado);
    } catch ( ValidacaoException e) {
      // Retorna a mensagem de erro como uma string
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (ClienteNotFoundException e) {
      // Retorna a mensagem de erro como uma string
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }
}
