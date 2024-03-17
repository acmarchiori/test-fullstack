import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import { getClientById, createClient, updateClient } from '../../services/api'
import { schema, formatarTelefone } from '../../services/schema'
import './UserEditForm.css'

const UserEditForm: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [clientData, setClientData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    status: ''
  })

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (id !== undefined && id !== null && id !== '') {
          const response = await getClientById(Number(id))
          setClientData(response)
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData().catch(() => {})
  }, [id])

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      status: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (id !== undefined && id !== null && id !== '') {
          await updateClient(Number(id), values)
          alert('Cliente atualizado com sucesso!')
        } else {
          await createClient(values)
          alert('Cliente cadastrado com sucesso!')
        }
      } catch (error: any) {
        const errorMessage = error.response.data !== undefined ? error.response.data : 'Erro desconhecido'
        alert(`Erro ${error.response.status}: ${errorMessage}`)
      }
    }
  })

  useEffect(() => {
    const setFormValues = async (): Promise<void> => {
      if (clientData !== null && clientData !== undefined) {
        await formik.setValues(clientData)
      }
    }
    void (async () => {
      await setFormValues()
    })()
  }, [clientData, formik.setValues])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className='user-edit-form'>
      <h2>{id != null ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <p>Informe os campos a seguir para {id != null ? 'editar um usuário:' : 'criar um novo usuário:'}</p>
      <form onSubmit={formik.handleSubmit}>
        <div>
        {formik.touched?.nome !== undefined && formik.errors?.nome !== undefined && <div className='error-message'>{formik.errors.nome}</div>}
          <input
            type="text"
            id="nome"
            name='nome'
            placeholder='Nome'
            required
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched?.email !== undefined && formik.errors?.email !== undefined && <div className='error-message'>{formik.errors.email}</div>}
          <input
            type="email"
            id="email"
            name="email"
            placeholder='E-mail'
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched?.cpf !== undefined && formik.errors?.cpf !== undefined && <div className='error-message'>{formik.errors.cpf}</div>}
          <InputMask
            mask="999.999.999-99"
            maskChar=""
            type="text"
            id="cpf"
            name="cpf"
            placeholder='CPF'
            required
            value={formik.values.cpf}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched?.telefone !== undefined && formik.errors?.telefone !== undefined && <div className='error-message'>{formik.errors.telefone}</div>}
          <input
            type="tel"
            id="telefone"
            maxLength={14}
            name="telefone"
            placeholder='Telefone'
            required
            value={formatarTelefone(formik.values.telefone)}
            onChange={(event) => {
              const formattedTelefone = formatarTelefone(event.target.value)
              void formik.setFieldValue('telefone', formattedTelefone)
            }}
          />
        </div>
        <div>
          {formik.touched?.status !== undefined && formik.errors?.status !== undefined && <div className='error-message'>{formik.errors.status}</div>}
          <select
            id="status"
            name="status"
            required
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <option value="" disabled>Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Aguardando ativação">Aguardando ativação</option>
            <option value="Desativado">Desativado</option>
          </select>
        </div>
        <div>
          <button className='button-create' type="submit">{id != null ? 'Editar' : 'Criar'}</button>
          <button className='button-back' type="button" onClick={() => { history.push('/') }}>Voltar</button>
        </div>
      </form>
    </div>
  )
}

export default UserEditForm
