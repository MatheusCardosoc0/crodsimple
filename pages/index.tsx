import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { type } from 'os'
import { FormEvent, useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { database } from '../local/firebase'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'


type valor = {
  chave: string,
  nome: string,
  email: string,
  telefone: string,
}

const Home: NextPage = () => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const [contato, setContato] = useState<valor[]>()

  const [busca, setBusca] = useState(false)
  const [resultBusca, setResultBusca] = useState<valor[]>()
  const [atualizar, setAtualizar] = useState('')
  const [editando, setEditando] = useState(false)
  const [buscador, setBuscador] = useState('')
  const [state, setState] = useState<'formulario' | 'lista'>('formulario')


  useEffect(() => {
    const refLista = database.ref('lista')

    refLista.on('value', resultados => {
      const resultLista = Object.entries<valor>(resultados.val() ?? {}).map(([chave, valor]) => {
        return {
          'chave': chave,
          'nome': valor.nome,
          'telefone': valor.telefone,
          'email': valor.email,
        }
      })
      setContato(resultLista)
    })
  }, [])



  function gravar(event: FormEvent) {

    event.preventDefault()

    const ref = database.ref('lista')

    const dados = {
      nome,
      telefone,
      email,
    }

    ref.push(dados)

    setTelefone('')
    setEmail('')
    setNome('')
  }

  function deletar(ref: string) {
    const referencia = database.ref(`lista/${ref}`).remove()
  }

  useEffect(() => {

    if (buscador.length > 0) {
      setBusca(true)
      const dados = new Array

      contato?.map(contato => {
        const regra = new RegExp(buscador, "gi")
        if (regra.test(contato.nome)) {
          dados.push(contato)
        }
      })
      setResultBusca(dados)
    }
    else {
      setBusca(false)
    }
  }, [buscador])

  function editar(contato: valor) {
    setEditando(true)
    setState('formulario')
    setAtualizar(contato.chave)
    setNome(contato.nome)
    setEmail(contato.email)
    setTelefone(contato.telefone)
  }

  function saveChange() {
    const ref = database.ref('lista/')

    const dados = {
      'nome': nome,
      'telefone': telefone,
      'email': email,
    }
    ref.child(atualizar).update(dados)

    setTelefone('')
    setEmail('')
    setNome('')

    setEditando(false)
    setState('lista')
  }




  return (
    <main className="flex h-screen items-center bg-gradient-to-tr from-violet-700 to-blue-600 justify-center">
      <Header></Header>


      {state == 'formulario' ?
        <form className={`
           flex flex-col gap-2
           bg-teal-400 p-4 rounded-lg max-w-[20rem] md:w-[30rem] md:max-w-[40rem]
           `}>
          <div className='flex gap-8 md:justify-between'>
            <h1 className='text-blue-700 text-xl font-bold'>
              {!editando ? 'Cadastrar contato' :
                'Atualizar Contato'}</h1>
            <Button onClick={() => setState('lista')}
              cor='bg-yellow-500'
              text="Contatos"></Button>
          </div>
          <hr className='border-2 border-blue-700' ></hr>
          <Input onChange={e => setNome(e.target.value)} value={nome} type='text' placeholder='Nome' required></Input>
          <Input value={telefone} onChange={e => setTelefone(e.target.value)} type='number' placeholder='Telefone' required></Input>
          <Input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' required></Input>
          {editando ?
            <Button onClick={saveChange}
              cor='bg-blue-500' type='button' className='mx-auto py-1 px-2 ' text='Atualizar'></Button>
            :
            <button onClick={gravar}
              type='button' className='mx-auto py-1 px-2 bg-blue-500 text-gray-100 rounded-lg' >
              Enviar
            </button>
          }
        </form>
        :
        <div className='bg-yellow-500 flex justify-center p-3 flex-col rounded-lg max-w-[18rem] md:max-w-[35rem] mt-24'>
          <div className='pb-3 flex gap-2 justify-between'>
            <Input className='w-[200px] md:w-3/4'
             onChange={e => setBuscador(e.target.value)} value={buscador} placeholder='buscar' type='text'></Input>
            <Button onClick={() => setState('formulario')}
              cor='bg-blue-500'
              text='Voltar'></Button>
          </div>
          <div className='h-[400px] overflow-auto flex flex-col gap-2' >
            {!busca ?
              contato?.map(contato => {
                return (
                  <span key={contato.chave}
                    className='flex justify-between bg-teal-600 p-2 text-gray-100'>
                    <div>
                      <h2 className='text-2xl'>{contato.nome}</h2>
                      <p>{contato.telefone}</p>
                      <p>{contato.email}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Button onClick={() => editar(contato)}
                        cor="bg-green-500" text='editar'></Button>
                      <Button
                        cor="bg-red-500"
                        text='excluir'
                        onClick={() => deletar(contato.chave)}
                      ></Button>
                    </div>
                  </span>
                )
              })
              :
              resultBusca?.map(contato => {
                return (
                  <span key={contato.chave}
                    className='flex justify-between bg-teal-600 p-2 text-gray-100'>
                    <div>
                      <h2 className='text-2xl'>{contato.nome}</h2>
                      <p>{contato.telefone}</p>
                      <p>{contato.email}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Button onClick={() => editar(contato)}
                        cor="bg-green-500" text='editar'></Button>
                      <Button
                        cor="bg-red-500"
                        text='excluir'
                        onClick={() => deletar(contato.chave)}
                      ></Button>
                    </div>
                  </span>
                )
              })}

          </div>
        </div>}




    </main>
  )
}

export default Home
