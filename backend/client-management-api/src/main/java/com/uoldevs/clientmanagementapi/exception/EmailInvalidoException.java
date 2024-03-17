package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is already registered.
 */
public class EmailInvalidoException extends RuntimeException {

  public EmailInvalidoException(String message) {
    super(message);
  }
}
