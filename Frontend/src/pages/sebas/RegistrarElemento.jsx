import React, { useRef, useState } from 'react';
import axiosClient from '../../axios-client';


function RegistrarElemento() {
  const [isOpen, setIsOpen] = useState(false);
  const nombreActividadRef = useRef();
  const lugarActividadRef = useRef();
  const cantidad = useRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    const nombreActividad = nombreActividadRef.current.value;
    const lugarActividad = lugarActividadRef.current.value;
    const cantidad2 = cantidad.current.value;

    axiosClient.post('http://localhost:3000/elemento/registrar', {
        nombre: nombreActividad,
        tipo: lugarActividad,
        cantidad: cantidad2
    })
    .then(response => {
      console.log('Datos guardados exitosamente:', response.data);
      closeModal();
    })
    .catch(error => {
      console.error('Error al guardar datos:', error);
    });
  };

  return (
    <>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
       Registrar Elemento
      </button>

      <div className="fixed z-10 inset-0 overflow-y-auto" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
              <form className="mt-2">
                    <div>
                      <label htmlFor="nombreActividad" className="block text-sm font-medium text-gray-700">Nombre del elemento</label>
                      <input type="text" id="nombreActividad" ref={nombreActividadRef} name="nombreActividad" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="lugarActividad" className="block text-sm font-medium text-gray-700">tipo elemento</label>
                      <input type="text" id="lugarActividad" ref={lugarActividadRef} name="lugarActividad"  className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="lugarActividad" className="block text-sm font-medium text-gray-700">Cantidad</label>
                      <input type="text" id="lugarActividad" ref={cantidad} name="lugarActividad"  className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                  </form>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default RegistrarElemento