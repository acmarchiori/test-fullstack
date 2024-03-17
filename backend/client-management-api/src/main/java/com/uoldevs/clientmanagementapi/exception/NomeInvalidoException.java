package com.uoldevs.clientmanagementapi.exception;


/**
 * Exception to be thrown when a name is invalid.
 */
public class NomeInvalidoException extends RuntimeException {

  public NomeInvalidoException(String message) {
    super(message);
  }
}
