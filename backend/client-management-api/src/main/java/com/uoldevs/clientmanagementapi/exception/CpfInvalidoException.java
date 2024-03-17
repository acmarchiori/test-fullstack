package com.uoldevs.clientmanagementapi.exception;


/**
 * Exception to be thrown when a CPF is invalid.
 */
public class CpfInvalidoException extends RuntimeException {

  public CpfInvalidoException(String message) {

    super(message);
  }
}
