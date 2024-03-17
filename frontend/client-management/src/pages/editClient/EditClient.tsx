import React from 'react'
import Header from '../../components/header/Header'
import UserPanel from '../../components/userPanel/UserPanel'
import UserEditForm from '../../components/userEditForm/UserEditForm'

/**
 * Componente da página de edição de clientes.
 *
 * Esta página permite criar ou editar informações de um cliente.
 * Ela inclui um formulário para inserção ou modificação dos dados do cliente.
 */
const EditClient: React.FC = () => {
  return (
    <div>
      {/* Cabeçalho da página */}
      <Header />

      {/* Painel do usuário */}
      <UserPanel />

      {/* Formulário de edição/criação de cliente */}
      <UserEditForm />
    </div>
  )
}

export default EditClient
