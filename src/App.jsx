import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Confirmar from './pages/Confirmar';
import RecuperarPass from './pages/RecuperarPass';
import NuevoPass from './pages/NuevoPass';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';
import AdministrarPacientes from './pages/AdministrarPacientes';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path='crear-cuenta' element={<Registrar />}/>
              <Route path='confirmar-cuenta/:token' element={<Confirmar />}/>
              <Route path='recuperar-password' element={<RecuperarPass />}/>
              <Route path='recuperar-password/:token' element={<NuevoPass />}/>
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter> 
  )
}

export default App
