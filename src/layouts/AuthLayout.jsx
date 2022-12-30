import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
        <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-14 p-5 md:py-20 md:px-5 lg:p-20'>
          <Outlet />
        </main>
    </>
  )
}

export default AuthLayout;