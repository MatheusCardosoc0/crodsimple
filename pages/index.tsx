import type { NextPage } from 'next'
import Button from '../components/Button'
import Input from '../components/Input'
import { Header } from '../components/Header'
import useCadastro from '../hooks/useCadastro'




const Home: NextPage = () => {

  
  const {
    atualizar, busca,buscador,contato,deletar,editando,email
    ,gravar,nome, resultBusca, saveChange, setAtualizar,setBusca,setBuscador,setContato,setEditando,
    setEmail,setNome,setResultBusca,setState,setTelefone,editar,state,telefone} = useCadastro()


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
