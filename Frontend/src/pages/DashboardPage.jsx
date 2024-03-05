import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'
import DatatableResiduos from '../components/DatatableResiduos'
import Tabla from '../components/Tabla'

function DashboardPage() {
  return (
    < main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-20'>
          {/* <DatatableResiduos/> */}
          <Tabla/>
        </section>
      </div>


    </main>
  )
}

export default DashboardPage
