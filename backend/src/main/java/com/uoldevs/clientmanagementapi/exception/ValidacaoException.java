package com.uoldevs.clientmanagementapi.exception;

/**
 * Exception to be thrown when a client is already registered.
 */
public class ValidacaoException extends RuntimeException {

  public ValidacaoException(String message) {
    super(message);
  }
}
