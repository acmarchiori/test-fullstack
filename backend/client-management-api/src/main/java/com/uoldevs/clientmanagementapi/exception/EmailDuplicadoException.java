package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is not found.
 */
public class EmailDuplicadoException extends RuntimeException {
  public EmailDuplicadoException(String message) {
    super(message);
  }
}
