import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>

)
