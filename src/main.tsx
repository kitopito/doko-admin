import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import Config from './Config.tsx'
import './index.css'
import Status from './Status.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
    <ChakraProvider>
      <Config></Config>
    </ChakraProvider>
//  </React.StrictMode>,
)
      //<Status />
