import React from 'react'
import LoginComponent from '../components/LoginComponent'

function LoginPage() {
  return (
    <>
      <main className='w-full h-screen bg-red-400 relative'>
        <LoginComponent />
        <div className='w-full h-[50%] bg-gray-100 p-48 py-36'>
          <div className='w-[50%] flex flex-col gap-y-10'>
            <h1 className='text-7xl font-black'>
              Bienvenido al <br />
              <span className='text-8xl'>
                Centro de Acopio
              </span>
            </h1>

            <p className='text-xl w-[80%] text-gray-600'>
              Transformemos basura en oportunidades, cada recogida es un paso hacia
              un futuro más limpio y sostenible. <span className='text-[#38A800] font-medium'>
              ¡Juntos, construimos un
              mundo mejor, un reciclaje a la vez!
              </span>
            </p>
          </div>
        </div>
        <div className='w-full h-[50%] bg-white px-48 py-20'>
          <div className='w-[50%] flex flex-col gap-y-10'>
            <img className='w-[60%]' src="undraw_explore_re_8l4v.svg" alt="" />
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage