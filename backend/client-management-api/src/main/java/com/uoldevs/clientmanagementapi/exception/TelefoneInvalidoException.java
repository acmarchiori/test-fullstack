package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is already registered.
 */
public class TelefoneInvalidoException extends RuntimeException {

  public TelefoneInvalidoException(String message) {
    super(message);
  }
}
