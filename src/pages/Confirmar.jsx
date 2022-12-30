import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Confirmar = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clienteAxios(url); // El default de axios es .get(), no es necesario especificarlo
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg, error: false});
      } catch (error) {
        const msg = error.response.data.msg;
        setAlerta({msg, error: true});
      }
      setCargando(false);
    }
    confirmarCuenta();
  }, []); //Arreglo vacío de dependencias -> Se ejecuta al menos una vez, cuando el componente está listo

  return (
    <>
        <div className="flex items-center mb-12 md:mb-0">
          <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">Confirma tu Cuenta & Comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="shadow-lg p-5 rounded-xl bg-white flex flex-col justify-center items-center">
          {!cargando && <Alerta valores={alerta} />}
          {cuentaConfirmada && 
            <Link 
              to="/" 
              className="block underline text-gray-500 text-center text-xl mt-10">
              Iniciar Sesión
            </Link>
          }
        </div>
    </>
  )
}

export default Confirmar;