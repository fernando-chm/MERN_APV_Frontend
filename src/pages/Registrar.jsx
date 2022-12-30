import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [ nombre, setNombre ] = useState(''); 
  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState(''); 
  const [ repetirPassword, setRepetirPassword ] = useState('');

  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg: 'Hay campos vacíos', error: true})
      return
    }

    if(password !== repetirPassword) {
      setAlerta({msg: 'Los password son diferentes', error: true})
      return
    }

    if(password.length < 8) {
      setAlerta({msg: 'El password debe tener 8 o más caracteres', error: true})
      return
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({msg: "Cuenta creada con éxito. Revisa tu correo electrónico para confirmar tu cuenta.", error: false});
    } catch (error) {
      const msg = error.response.data.msg;
      setAlerta({msg, error: true});
    }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="flex items-center mb-12 md:mb-0">
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">Crea tu Cuenta & Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="shadow-lg p-5 rounded-xl bg-white">
        { msg && <Alerta valores={alerta}/> }
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input 
              type="text" 
              placeholder="Escribe tu nombre..." 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              value={nombre} 
              onChange={ e => setNombre(e.target.value) }
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email" 
              placeholder="Escribe tu email..." 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email} 
              onChange={ e => setEmail(e.target.value) }
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input 
              type="password" 
              placeholder="Escribe tu password..." 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password} 
              onChange={ e => setPassword(e.target.value) }
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
            <input 
              type="password" 
              placeholder="Escribe tu password nuevamente..." 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword} 
              onChange={ e => setRepetirPassword(e.target.value) }
            />
          </div>
          <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className="mt-5">
          <Link to="/" className="block underline text-gray-500 text-center md:text-left">¿Ya tienes una cuenta? Inicia Sesión.</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar;