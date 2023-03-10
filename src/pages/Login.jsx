import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: "Hay campos vacíos...",
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
      localStorage.setItem('jwtoken', data.jwtoken);
      setAlerta({});
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div className="flex items-center mb-12 md:mb-0">
          <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">Inicia Sesión & Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="shadow-lg p-5 rounded-xl bg-white">
          {
            msg && <Alerta 
              valores={alerta}
            />
          }
          <form onSubmit={handleSubmit}>
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
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input 
                type="password" 
                placeholder="Escribe tu password..." 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}  
              />
            </div>
            <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>
          <nav className="mt-5">
            <Link to="/crear-cuenta" className="block underline text-gray-500 text-center md:text-left">¿No tienes una cuenta? Comienza creando una.</Link>
            <Link to="/recuperar-password" className="underline mt-2 block text-gray-500 text-center md:text-left">Olvidé mi contraseña.</Link>
          </nav>
        </div>
    </>
  )
}

export default Login;