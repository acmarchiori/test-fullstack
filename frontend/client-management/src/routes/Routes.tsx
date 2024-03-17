import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home/Home'
import EditClient from '../pages/editClient/EditClient'

/**
 * Componente responsável por definir as rotas da aplicação.
 * Utiliza o React Router para o roteamento.
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* Rota para a página inicial */}
        <Route path="/" exact component={Home} />

        {/* Rota para editar um cliente específico */}
        <Route path="/clientes/:id" component={EditClient} />

        {/* Rota para criar ou editar um cliente */}
        <Route path="/clientes" component={EditClient} />
      </Switch>
    </Router>
  )
}

export default Routes
