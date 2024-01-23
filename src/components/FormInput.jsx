
const FormInput = ({htmlFor,label,type,name, style,value,onchange}) => {
  return (
    <div className="flex flex-col my-5 w-full">
            <label htmlFor={htmlFor} className=" font-bold">{label}</label>
            <input type={type} name={name}  className={`p-2 rounded-sm border-2 border-black  capitalize w-full ${style}`}  value={value} onChange={onchange}/>
        </div>
  )
}

export default FormInput