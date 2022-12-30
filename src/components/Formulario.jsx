import { useState, useEffect } from "react";
import Alerta from '../components/Alerta';
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha_alta, setFechaAlta] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFechaAlta(paciente.fecha_alta)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente]);

  const handleSubmit = e => {
    e.preventDefault();

    // Validar el formulario
    if([nombre, propietario, email, fecha_alta, sintomas].includes('')) {
      setAlerta({
        msg: "Hay campos vacíos...",
        error: true
      });
      return
    }

    guardarPaciente({nombre, propietario, email, fecha_alta, sintomas, id});
    setAlerta({
      msg: "Guardado Correctamente"
    });
    setNombre('')
    setPropietario('')
    setEmail('')
    setFechaAlta('')
    setSintomas('')
    setId('')
  }

  const { msg } = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y {''}<span className="text-indigo-600 font-bold">Administralos</span></p>
        <form
          className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label 
              className="text-gray-700 uppercase font-bold"
              htmlFor="nombre">Nombre de la mascota:</label>
            <input 
              id="nombre"
              type="text"
              placeholder="nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label 
              className="text-gray-700 uppercase font-bold"
              htmlFor="propietario">Propietario:</label>
            <input 
              id="propietario"
              type="text"
              placeholder="propietario de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
              value={propietario}
              onChange={e => setPropietario(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label 
              className="text-gray-700 uppercase font-bold"
              htmlFor="email">Email:</label>
            <input 
              id="email"
              type="email"
              placeholder="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label 
              className="text-gray-700 uppercase font-bold"
              htmlFor="fecha_alta">Fecha de alta:</label>
            <input 
              id="fecha_alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
              value={fecha_alta}
              onChange={e => setFechaAlta(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label 
              className="text-gray-700 uppercase font-bold"
              htmlFor="sintomas">Síntomas:</label>
            <textarea 
              id="sintomas"
              placeholder="describe los síntomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
              value={sintomas}
              onChange={e => setSintomas(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value={id ? "Guardar Cambios" : "Agregar Paciente"}
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          />
        </form>
        {msg && <Alerta 
          valores={alerta}
        />}
    </>
  )
}

export default Formulario;