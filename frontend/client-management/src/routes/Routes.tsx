import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home/Home'
import EditClient from '../pages/editClient/EditClient'

const Routes: React.FC = () => {
  return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/clientes/:id" component={EditClient} />
                <Route path="/clientes" component={EditClient} />
            </Switch>
        </Router>
  )
}

export default Routes
