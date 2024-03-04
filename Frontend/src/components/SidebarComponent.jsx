import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash, faBars, faFile, faA, faUser, faAlignCenter, faPowerOff, faC } from '@fortawesome/free-solid-svg-icons';



function SidebarComponent() {

  const [toggle, setToggle] = useState(false)

  const clickSidebar = () => {
    setToggle(!toggle)
  }

  return (
    // <div className='w-full h-full' >
    <>
      <div className={`h-screen bg-[#38A800] px-4 duration-700 ease-in-out py-5 relative ${toggle ? 'w-[55px]' : 'w-[300px]'}`}>
        <span onClick={clickSidebar} className='absolute cursor-pointer -right-12 top-3.5 text-xl border px-1.5 border-black'>
          <FontAwesomeIcon icon={faBars} />
        </span>
        <div className='w-full overflow-hidden h-full flex flex-col justify-start flex-nowrap'>



          <div className='flex overflow-hidden w-[210px] items-center gap-x-4 py-2 -translate-y-3 text-white'>
            <span className='text-white font-black text-3xl'>
            {<FontAwesomeIcon icon={faC} />}
            </span>
            <h2 className='text-xl font-bold text-white'>
              Centro de Acopio
            </h2>
          </div>

          <ul className='border-t overflow-hidden border-b border-white border-opacity-50 py-5 border-b-white'>
            <li className='flex justify-start items-center gap-x-4 text-white text-opacity-80'><FontAwesomeIcon icon={faHouse} /> Dashboard</li>
          </ul>

          <ul className='border-b overflow-hidden border-b-white relative mt-20 border-opacity-50 text-white text-opacity-80'>

            <span className='absolute -top-8'>
              MENU
            </span>
            <li className='hover:bg- h-10 flex items-center justify-start gap-x-4'><FontAwesomeIcon icon={faTrash} />Residuos</li>
            <li className='hover:bg- h-10 flex items-center justify-start gap-x-4'><FontAwesomeIcon icon={faFile} />Movimientos</li>
            <li className='hover:bg- h-10 flex items-center justify-start gap-x-4'><FontAwesomeIcon icon={faA} />Actividades</li>
            <li className='hover:bg- h-10 flex items-center justify-start gap-x-4'><FontAwesomeIcon icon={faUser} />Usuarios</li>
            <li className='hover:bg- h-10 flex items-center justify-start gap-x-4'><FontAwesomeIcon icon={faAlignCenter} />Elementos</li>
          </ul>

          <ul className='border-t overflow-hidden border-white mt-28 py-5 border-opacity-50'>
            <li className='flex justify-start items-center gap-x-4 text-white text-opacity-80'><FontAwesomeIcon icon={faPowerOff} />Logout</li>
          </ul>

        </div>
      </div>
    </>
    // </div>
  )
}

export default SidebarComponent
