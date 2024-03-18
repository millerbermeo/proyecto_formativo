import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from '../../components/SidebarComponent';
import NavbarComponent from '../../components/NavbarComponent';
import axiosClient from '../../axios-client';

import ActualizarActividad from '../jose/ActualizarActividad';
import RegistrarUsuario from './RegistrarUsuario';
import DesactivarUusuario from './DesactivarUusuario';

function UsuariosPage() {
  const [actividades, setActividades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosClient.get('http://localhost:3000/usuario/listar')
      .then(response => {
        setActividades(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las actividades:', error);
      });
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageSize = 4;
  const indexOfLastActivity = currentPage * pageSize;
  const indexOfFirstActivity = indexOfLastActivity - pageSize;
  const currentActivities = actividades.slice(indexOfFirstActivity, indexOfLastActivity);

  const filteredActividades = currentActivities.filter(actividad => {
    return actividad.identificacion.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-20'>
          <RegistrarUsuario/>
          <div className="overflow-x-auto">
            <input
              type="text"
              placeholder="Buscar por nombre de actividad"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id_usuario </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">apellidos</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">identificacion</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">rol </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActividades.map(actividad => (
                  <tr key={actividad.id_actividad}>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.id_usuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.apellidos}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.identificacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.rol}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{actividad.estado}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DesactivarUusuario id_actividad={actividad.id_usuario}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={filteredActividades.length < pageSize}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
              >
                Siguiente
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UsuariosPage;
