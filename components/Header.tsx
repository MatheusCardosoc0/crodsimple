import { GithubLogo, LinkedinLogo, User } from 'phosphor-react'

export function Header(){

  
  const legenda = `hidden absolute text-sm w-[10px] mr-10 mt-3`

  const span = ``


  return(
    <header className="top-0 absolute w-full p-5 bg-gradient-to-br from-slate-700 to-slate-500 text-gray-100">
    <div className="flex flex-col md:flex-row md:justify-around text-center gap-4 md:gap-0">
      <div>
      <h2 className="text-3xl font-bold"
      >Matheus Cardoso</h2>
      </div>
      <div className="flex text-yellow-500 gap-4 md:gap-8 text-3xl justify-center">
        <span className={span} >
        <a href="https://www.linkedin.com/in/matheus-cardoso-026488244/" target={"_blank"} rel="noreferrer"><LinkedinLogo></LinkedinLogo></a>
        <p className={legenda}>Meu linkedin</p>
        </span>
        <span className={span}>
        <a href="https://github.com/MatheusCardosoc0"
          target={"_blank"} rel="noreferrer"><GithubLogo></GithubLogo></a>
            <p className={legenda}>Meu Github</p>
        </span>
        <span className={span}>
        <a href="https://matheuscardosoc-portifolio.netlify.app" target={"_blank"} rel="noreferrer"><User></User></a>
        <p className={legenda}>Meu site portifolio</p>
        </span>
      </div>
    </div>
    </header>
  )
}