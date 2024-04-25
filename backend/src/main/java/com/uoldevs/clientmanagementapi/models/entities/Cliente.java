package com.uoldevs.clientmanagementapi.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

/**
 * Cliente entity.
 */
@Entity
@Table(name = "cliente")
public class Cliente {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(name = "nome")
  private String nome;

  @NotBlank
  @Column(name = "email")
  private String email;

  @NotBlank
  @Column(name = "cpf")
  private String cpf;

  @NotBlank
  @Column(name = "telefone")
  private String telefone;

  @NotBlank
  @Column(name = "status")
  private String status;

  public Cliente() {
  }

  /**
   * Cliente constructor.
   */
  public Cliente(Long id, String nome, String email, String cpf, String telefone, String status) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.status = status;
  }

  /**
   * Cliente constructor.
   */
  public Cliente(String nome, String email, String cpf, String telefone, String status) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.status = status;
  }



  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}