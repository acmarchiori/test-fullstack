import React from 'react'
import Header from '../../components/header/Header'
import UserPanel from '../../components/userPanel/UserPanel'
import UserListSection from '../../components/userListSection/UserListSection'
import UserList from '../../components/userList/UserList'
import Footer from '../../components/footer/Footter'

/**
 * Componente da página inicial.
 *
 * Esta página contém os componentes que compõem a interface do usuário
 * para exibir e gerenciar a lista de clientes.
 */
const Home: React.FC = () => {
  return (
    <div>
      {/* Cabeçalho da página */}
      <Header />

      {/* Painel de criação de usuário */}
      <UserPanel />

      {/* Seção da lista de usuários */}
      <UserListSection />

      {/* Lista de usuários */}
      <UserList />

      {/* Rodapé da página */}
      <Footer />
    </div>
  )
}

export default Home
