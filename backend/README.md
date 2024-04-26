# Backend

O backend foi desenvolvido em Java utilizando o Spring Framework. O banco de dados utilizado é o SQLite com o Spring Data JPA para interação.

# Validações

Aqui estão as validações realizadas nos dados do cliente:


- **Nome:** Deve ter entre 2 e 100 caracteres e conter apenas letras, espaços, hífens e apóstrofos.
- **Email:** Deve ser um email válido e único.
- **CPF:** Deve ter o formato "XXX.XXX.XXX-XX" e ser único.
- **Telefone:** Deve ter o formato "(XX)XXXXX-XXXX" ou "(XX)XXXX-XXXX".
- **Status:** Deve ser um dos seguintes valores: "Ativo", "Inativo", "Aguardando ativação" ou "Desativado".

## Tecnologias Principais:

- Java
- Spring Framework

## Banco de Dados:

- SQLite
- Spring Data JPA

## Testes:

- JUnit: Framework de testes para Java.

# Rotas

## Clientes

### GET /clientes

A rota GET `/clintes` é utilizada para obter a listagem de clientes cadastrados no banco de dados.

**Saída (status: 201):**

```json
[
	{
		"id": 1,
		"nome": "John Doe",
		"email": "john_doe1@test.com",
		"cpf": "123.456.789-00",
		"telefone": "(11)9998-8745",
		"status": "Ativo"
	},
	{
		"id": 2,
		"nome": "John Doe",
		"email": "john_doe2@test.com",
		"cpf": "123.456.789-01",
		"telefone": "(11)9998-8743",
		"status": "Inativo"
	},
	{
		"id": 3,
		"nome": "John Doe",
		"email": "john_doe3@test.com",
		"cpf": "123.456.789-02",
		"telefone": "(11)9998-8742",
		"status": "Aguardando ativação"
	},
	{
		"id": 4,
		"nome": "John Doe",
		"email": "john_doe4@test.com",
		"cpf": "123.456.789-03",
		"telefone": "(11)9998-8741",
		"status": "Desativado"
	}
]

```

### GET /clientes/:{id}

A rota GET /clientes/{id} é utilizada para obter um cliente específico cadastrado no banco de dados.


`/clientes/1`

**Saída (status: 201):**

```json
{
	"id": 1,
	"nome": "John Doe",
	"email": "john_doe1@test.com",
	"cpf": "123.456.789-00",
	"telefone": "(11)9998-8745",
	"status": "Ativo"
}
```

`/clientes/99` 

**Saída (status: 404):**

```json
{
	"message": "Cliente não encontrado com o ID: 99"
}
```

### POST /clientes

A rota POST `/clientes` é utilizada para cadastrar um novo cliente com informações válidas no banco de dados.

**Entrada:**

```json
{
	"nome": "John Doe",
	"email": "john_doe5@test.com",
	"cpf": "123.456.789-04",
	"telefone": "(11)9998-8744",
	"status": "Ativo"
}
```

**Saída (status: 201):**

```json
{
	"id": 5,
	"nome": "John Doe",
	"email": "john_doe5@test.com",
	"cpf": "123.456.789-04",
	"telefone": "(11)9998-8744",
	"status": "Ativo"
}
```

### PUT /clientes:{id}

A rota PUT `/clientes/{id}` é utilizada para atualizar informações de um cliente existente no banco de dados.

`/clientes/1`


**Entrada:**

```json
{
	"nome": "John Doe",
	"email": "john_doe1@test.com",
	"cpf": "123.456.789-00",
	"telefone": "(11)9998-8745",
	"status": "Inativo"
}
```

**Saída (status: 200):**

```json
{
	"id": 1,
	"nome": "John Doe",
	"email": "john_doe1@test.com",
	"cpf": "123.456.789-00",
	"telefone": "(11)9998-8745",
	"status": "Inativo"
}
```


