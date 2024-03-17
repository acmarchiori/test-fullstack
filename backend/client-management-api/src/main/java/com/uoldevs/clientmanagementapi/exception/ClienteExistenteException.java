package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is already registered.
 */
public class ClienteExistenteException extends RuntimeException {

  public ClienteExistenteException(String message) {

    super(message);
  }
}
