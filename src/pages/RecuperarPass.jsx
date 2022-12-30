import { useState } from "react";
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const RecuperarPass = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '') {
      setAlerta({msg: "Es necesario colocar tu email", error: true});
      return
    }

    try {
      const url = '/veterinarios/recuperar-password';
      const { data } = await clienteAxios.post(url, { email });
      setAlerta({msg: data.msg});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }
  const { msg } = alerta;
  return (
    <>
        <div className="flex items-center mb-12 md:mb-0">
          <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">Recupera tu Acceso & no Pierdas tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="shadow-lg p-5 rounded-xl bg-white">
          {msg && <Alerta 
            valores={alerta}
          />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input 
                type="email" 
                placeholder="Escribe tu email..." 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Recuperar Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>
        </div>
    </>
  )
}

export default RecuperarPass;