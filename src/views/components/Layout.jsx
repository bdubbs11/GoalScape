import React, { useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col text-primary font-barlow-600">
      <nav id="nav" className="flex flex-row justify-between my-auto w-screen px-6 py-4 text-primary sticky top-0">
        <Link to="/" className=" hover:opacity-70 text-xl transition ease-in-out duration-200 ">GoalScape</Link>
        <div className="flex gap-10">
           <Link to="/addGoals" className=" hover:opacity-70 text-xl transition ease-in-out duration-200">Add Goals</Link>
        </div>


      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="font-inter text-sm md:text-lg text-center p-4">
        <h3>All aspects of this website was designed and implemented by me, Brandon Wilson</h3>
      </footer> 
    </div>
  )
}

export default Layout