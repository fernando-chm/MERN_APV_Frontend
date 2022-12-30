import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

const NuevoPass = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;
    
    useEffect(() => {
      const comprobarToken = async () => {
        try {
          await clienteAxios(`/veterinarios/recuperar-password/${token}`);
          setAlerta({
            msg: "Coloca tu nuevo password"
          });
          setTokenValido(true);
        } catch (error) {
          setAlerta({
            msg: "Hubo un error con el enlace",
            error: true
          });
        }
      }
      comprobarToken();
    }, []);

    const handleSubmit = async e => {
      e.preventDefault();
      if(password.length < 8) {
        setAlerta({
          msg: "El password debe tener 8 o más caracteres",
          error: true
        })
        return
      }

      try {
        const url = `/veterinarios/recuperar-password/${token}`;
        const { data } = await clienteAxios.post(url, {password});
        setAlerta({
          msg: data.msg
        })
        setPasswordModificado(true);
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
            <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">Recupera tu Acceso & Administra a tus <span className="text-black">Pacientes</span></h1>
          </div>
          <div className="shadow-lg p-5 rounded-xl bg-white flex flex-col justify-center items-center">
            {
              msg && <Alerta 
                valores={alerta}
              />
            }
            {
              tokenValido && (
                <>
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                      <input 
                        type="password" 
                        placeholder="Escribe tu nuevo password..." 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <input type="submit" value="Cambiar Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                  </form>
                  {
                    passwordModificado && 
                    (<nav className="mt-5 w-full">
                      <Link to="/" className="block underline text-gray-500">Iniciar Sesión</Link>
                    </nav>)
                  }
                </>
              )
            }
            
          </div>
      </>
    )
  }
  
  export default NuevoPass;