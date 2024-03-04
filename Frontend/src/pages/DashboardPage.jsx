import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'

function DashboardPage() {
  return (
    < main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full'>
        <NavbarComponent />
        <section className='px-6 py-5'>
          csacas
        </section>
      </div>


    </main>
  )
}

export default DashboardPage
