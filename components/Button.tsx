interface ButtonProps {
  text: string
  cor: 'bg-green-500' | 'bg-blue-500' | 'bg-red-500' | 'bg-yellow-500'
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void 
}



export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        className={`
        ${props.cor}
        rounded-lg text-gray-100 p-1 hover:brightness-75
        ${props.className} 
        `}
        type={props.type}
        onClick={props.onClick}>
        {props.text}
      </button>
    </>
  )
}