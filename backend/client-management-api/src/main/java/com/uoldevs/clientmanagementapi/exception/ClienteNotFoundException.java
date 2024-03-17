package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is not found.
 */
public class ClienteNotFoundException extends RuntimeException {

  public ClienteNotFoundException(String message) {
    super(message);
  }
}
