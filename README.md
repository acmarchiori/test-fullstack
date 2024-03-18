# Aplicativo de Gerenciamento de Clientes

Este é um projeto fullstack desenvolvido como parte de um teste para a vaga de Desenvolvedor Trainee Fullstack na UOL. O aplicativo permite aos usuários visualizar e criar clientes, com um frontend responsável pela interface do usuário e comunicação com a API, e um backend responsável pelo armazenamento e gerenciamento dos dados dos clientes.

## Tecnologias Utilizadas

### Frontend

- **Tecnologias Principais**:
  - TypeScript
  - React
  - Context API
  - Hooks

- **Bibliotecas e Frameworks**:
  - Axios: Para comunicação com a API.
  - Formik: Para validação de formulários.
  - Yup: Para definição de esquemas de validação.
  - React Input Mask: Para aplicar máscaras em inputs.

- **Testes**:
  - Jest: Framework de testes.
  - @testing-library/react: Para testes de componentes.
  - @testing-library/jest-dom: Para extensões de expectativas.

### Backend

- **Tecnologias Principais**:
  - Java
  - Spring Framework

- **Banco de Dados**:
  - SQLite
  - Spring Data JPA

- **Testes**:
  - JUnit: Framework de testes para Java.

## Scripts (Frontend)

Para executar os scripts do frontend, você precisará do npm instalado em sua máquina.

- `npm start`: Inicia o servidor de desenvolvimento do frontend.
- `npm run build`: Compila o projeto para produção.
- `npm test`: Executa os testes do frontend com cobertura.
- `npm run eject`: Ejeta a configuração do webpack para personalização avançada.
- `npm run lint`: Executa o ESLint para análise estática do código.

## Como Executar

Para executar a aplicação, siga os seguintes passos:

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Navegue até a raiz do projeto.
3. Execute o comando `docker-compose up`. Isso iniciará o container Docker para o frontend e o backend, bem como o banco de dados SQLite.
4. Após a inicialização, acesse o aplicativo através do navegador usando o endereço [http://localhost:3000/](http://localhost:3000/).

## Documentação do Código

O código está completamente documentado, explicando a responsabilidade de cada componente, função, etc. Isso visa facilitar a compreensão e manutenção do código no futuro.

## Considerações Finais

O código foi escrito seguindo boas práticas de desenvolvimento e arquitetura, visando a legibilidade, organização e manutenibilidade do código. Além disso, foram realizados testes tanto no frontend quanto no backend para garantir a integridade e robustez da aplicação.

Para qualquer dúvida ou problema, não hesite em entrar em contato.
