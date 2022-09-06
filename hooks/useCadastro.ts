import { FormEvent, useEffect, useState } from "react"
import { database } from "../local/firebase"

type valor = {
  chave: string,
  nome: string,
  email: string,
  telefone: string,
}

export default function useCadastro(){

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

  return {
    gravar,
    deletar,
    email,
    busca,
    buscador,
    atualizar,
    contato,
    editando,
    saveChange,
    resultBusca,
    nome,
    setAtualizar,
    setBusca,
    setBuscador,
    setContato,
    setEditando,
    setEmail,
    setNome,
    setState,
    setResultBusca,
    setTelefone,
    telefone,
    state,
    editar
  }

} 