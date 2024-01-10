import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import Config from './Config.tsx'
import './index.css'
import Status from './Status.tsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "config/",
    element: <Config></Config>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
//  </React.StrictMode>,
)
      //<Status />