import React from 'react'

function LoginComponent() {

    const onSubmit = (event)=> {
        event.preventDefault()
        alert()
    }

    return (
        <>
            <div className='w-[450px] scale-110 -rotate-3 bg-white  h-[550px] absolute right-60 top-1/2 transform -translate-y-1/2 rounded-md'>
                <div className='w-[450px] bg-gray-200 h-[550px] rotate-3 -translate-y-5 p-8 py-16 rounded-md shadow-lg'>

                    <div>
                        <img className='w-[50%] absolute -top-[70px] left-32' src="logo-removebg-preview.png" alt="" />
                    </div>
                    <h2 className="text-4xl text-center font-bold mb-12 mt-4 text-[#38A800]/80">Inicio de sesión</h2>
                    <form className='flex flex-col gap-y-3' onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-normal text-gray-700">Correo electrónico</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2.5 w-full border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-normal text-gray-700">Contraseña</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2.5 w-full border-gray-300 rounded-md" />
                        </div>

                        <div>
                            <p className='text-right'>Olvidates la contraseña?</p>
                        </div>
                        <button type="submit" className="bg-[#38A800] w-full text-white px-4 py-2.5 rounded-md hover:bg-[#38A800]/70 transition duration-300">Iniciar sesión</button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default LoginComponent