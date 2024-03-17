package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is not found.
 */
public class CpfDuplicadoException extends RuntimeException {

  public CpfDuplicadoException(String message) {
    super(message);
  }
}
