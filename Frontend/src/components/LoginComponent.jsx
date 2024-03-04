import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function LoginComponent() {
    const email = useRef();
    const password = useRef();

    const [tipoInput, setTipoInput] = useState('password');
    const [mostrar, setMostrar] = useState(false);

    const cambiarTipoInput = () => {
        // Cambia el tipo de input entre 'text' y 'password'
        setTipoInput((tipoAnterior) => (tipoAnterior === 'password' ? 'text' : 'password'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert();
    };

    return (
        <>
            <div className='2xl:w-[450px] w-[370px] scale-110 -rotate-3 bg-white h-[420px]  2xl:h-[550px] absolute right-40 2xl:right-60 top-1/2 transform -translate-y-1/2 rounded-md'>
                <div className='2xl:w-[450px] w-[370px] bg-gray-200 h-[420px] 2xl:h-[550px] rotate-3 -translate-y-5 py-16 rounded-md shadow-lg'>

                    <form onSubmit={handleSubmit} className="w-[370px] px-6 rounded flex flex-col justify-center">
                        <div className='flex flex-col items-center'>
                            <span className='text-9xl'>
                                <ion-icon name="people-circle-outline"></ion-icon>
                            </span>
                            <h2 className="text-3xl -translate-y-5 text-center font-bold">Iniciar sesión</h2>

                        </div>
                        <div className="mb-4 w-full relative">
                            <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
                                Email
                            </label>
                            <input
                                autoFocus
                                ref={email}
                                type="email"
                                id="email"
                                className="w-full p-2 px-7 2xl:p-3 border rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-sm"
                                required
                                placeholder='Enter Email'
                            />

                            <span className='absolute left-1.5 top-10 text-lg text-gray-800'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="password" className="block text-gray-700 text-lg mb-2">
                                Password
                            </label>
                            <input
                                ref={password}
                                type={tipoInput}
                                id="password"
                                className="w-full p-2 px-7 2xl:p-3  border rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-sm"
                                required
                                placeholder='Enter Password'
                            />
                             <span className='absolute left-1.5 top-10 text-lg text-gray-800'>
                             <FontAwesomeIcon icon={faLock} />
                            </span>
                            <label htmlFor="password" onClick={cambiarTipoInput} className='absolute cursor-pointer text-lg top-11 right-3'>
                                <FontAwesomeIcon icon={tipoInput === 'password' ? faEyeSlash : faEye} />
                            </label>
                        </div>

                        <div className='text-right mt-5'>
                            <p>Olvidates Tu Contraseña?</p>
                        </div>

                        <div className='h-5 mb-2 flex items-center pl-[1px]'>
                            {mostrar && (
                                <>
                                    Datos Incorrectos
                                </>
                            )}

                        </div>

                        <button
                            type="submit"
                            className="bg-[#38A800]/90 hover:bg-[#38A800] transition duration-300 ease-in-out w-full text-white p-3 rounded focus:outline-none"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginComponent;
