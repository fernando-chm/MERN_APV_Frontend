
const Alerta = ({valores}) => {
  return (
    <div
        className={`${valores.error ? 
                    'from-red-400 to-red-600' : 
                    'from-indigo-400 to-indigo-600' } 
                    bg-gradient-to-br text-white p-6 font-bold text-center text-xl rounded-xl w-full`
        }
    >
        {valores.msg}
    </div>
  )
}

export default Alerta