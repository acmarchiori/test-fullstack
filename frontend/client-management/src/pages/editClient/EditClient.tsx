import React from 'react'
import Header from '../../components/header/Header'
import UserPanel from '../../components/userPanel/UserPanel'
import UserEditForm from '../../components/userEditForm/UserEditForm'

const EditClient: React.FC = () => {
  return (
          <div>
            <Header />
            <UserPanel />
            <UserEditForm />
          </div>
  )
}

export default EditClient
