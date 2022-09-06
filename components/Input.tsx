
interface InputProps{
  type: 'text' | 'number' | 'email'
  placeholder: string
  required?: boolean
  onChange?: (value:any) => void
  value?: any
  className?: string
}


export default function Input(props: InputProps) {
  return (
    <>
      <input className={props.className}
        required={props.required}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        ></input>
    </>
  )
}