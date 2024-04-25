import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import { getClientById, createClient, updateClient } from '../../services/api'
import { schema, formatarTelefone } from '../../services/schema'
import { type Client } from '../../services/types'
import Swal from 'sweetalert2'
import './UserEditForm.css'
import 'animate.css'

/**
 * Componente responsável pelo formulário de edição e criação de clientes.
 */
const UserEditForm: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [clientData, setClientData] = useState<Client>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    status: ''
  })

  useEffect(() => {
    /**
     * Função assíncrona para buscar os dados do cliente pelo ID.
     */
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

  /**
   * Formik hook para controle do formulário.
   */
  const formik = useFormik({
    initialValues: clientData,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (id !== undefined && id !== null && id !== '') {
          await updateClient(Number(id), values)
          void Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cliente atualizado com sucesso!',
            confirmButtonColor: '#DF9408',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          })
        } else {
          await createClient(values)
          void Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cliente cadastrado com sucesso!',
            confirmButtonColor: '#DF9408',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          })
        }
      } catch (error: any) {
        const errorMessage = error.response.data !== undefined ? error.response.data : 'Erro desconhecido'
        void Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Ocorreu um erro ao processar sua solicitação: <br> ${errorMessage}`,
          confirmButtonColor: '#DF9408',
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        })
      }
    }
  })

  /**
 * Hook useEffect utilizado para atualizar os valores do formulário do usuário.
 * Este hook é acionado sempre que há uma mudança nos dados do cliente (`clientData`) ou
 * quando a função `formik.setValues` é alterada.
 */
  useEffect(() => {
  // Função assíncrona para configurar os valores do formulário com os dados do cliente
    const setFormValues = async (): Promise<void> => {
    // Verifica se os dados do cliente são válidos
      if (clientData !== null && clientData !== undefined) {
      // Define os valores do formulário com os dados do cliente
        await formik.setValues(clientData)
      }
    }

    // Invoca a função para definir os valores do formulário
    void (async () => {
      await setFormValues()
    })()
  }, [clientData, formik.setValues]) // Dependências do hook useEffect

  // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>
  }

  // Renderiza o formulário de edição ou criação de usuário
  return (
  <div className='user-edit-form'>
    {/* Título do formulário: "Editar Usuário" se houver um ID definido, senão "Novo Usuário" */}
    <h2>{id != null ? 'Editar Usuário' : 'Novo Usuário'}</h2>
    {/* Descrição do formulário: "editar um usuário" se houver um ID definido, senão "criar um novo usuário" */}
    <p>Informe os campos a seguir para {id != null ? 'editar um usuário:' : 'criar um novo usuário:'}</p>
    {/* Formulário de entrada de dados do usuário */}
    <form onSubmit={formik.handleSubmit}>
      {/* Campo de entrada para o nome do usuário */}
      <div>
        {/* Renderiza uma mensagem de erro se o campo foi tocado e possui erros */}
        {formik.errors?.nome !== undefined && <div className='error-message'>{formik.errors.nome}</div>}
        {/* Input de texto para o nome do usuário */}
        <input
          type="text"
          id="nome"
          name='nome'
          placeholder='Nome'
          minLength={3}
          required
          value={formik.values.nome}
          onChange={formik.handleChange}
        />
      </div>
      {/* Campo de entrada para o e-mail do usuário */}
      <div>
        {/* Renderiza uma mensagem de erro se o campo foi tocado e possui erros */}
        {formik.errors?.email !== undefined && <div className='error-message'>{formik.errors.email}</div>}
        {/* Input de e-mail para o e-mail do usuário */}
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
      {/* Campo de entrada para o CPF do usuário */}
      <div>
        {/* Renderiza uma mensagem de erro se o campo foi tocado e possui erros */}
        {formik.errors?.cpf !== undefined && <div className='error-message'>{formik.errors.cpf}</div>}
        {/* Input de máscara para o CPF do usuário */}
        <InputMask
          data-testid="cpf"
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
      {/* Campo de entrada para o telefone do usuário */}
      <div>
        {/* Renderiza uma mensagem de erro se o campo foi tocado e possui erros */}
        {formik.errors?.telefone !== undefined && <div className='error-message'>{formik.errors.telefone}</div>}
        {/* Input de máscara para o telefone do usuário */}
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
      {/* Campo de seleção para o status do usuário */}
      <div>
        {/* Renderiza uma mensagem de erro se o campo foi tocado e possui erros */}
        {formik.touched?.status !== undefined && formik.errors?.status !== undefined && <div className='error-message'>{formik.errors.status}</div>}
        {/* Select para o status do usuário */}
        <select
          id="status"
          name="status"
          required
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <option value="" disabled hidden>Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Aguardando ativação">Aguardando ativação</option>
          <option value="Desativado">Desativado</option>
        </select>
      </div>
      {/* Botões para enviar ou voltar */}
      <div className="button-container">
        {/* Botão para enviar o formulário */}
        <button className='button-create' type="submit" disabled={!formik.isValid}>{id != null ? 'Editar' : 'Criar'}</button>
        {/* Botão para voltar */}
        <button className='button-back' type="button" onClick={() => { history.push('/') }}>Voltar</button>
      </div>
    </form>
  </div>
  )
}

export default UserEditForm
