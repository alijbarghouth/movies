import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrrotectedRoutes({ loginData }) {    
  return (
    <>
    {loginData != null?<Outlet />:<Navigate to='login'/>}
    </>
  )
}

export default PrrotectedRoutes