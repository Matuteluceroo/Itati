import React from 'react'
import { SocketProvider } from './services/SocketContext.jsx'
import { AlertProvider } from './services/AlertContext.jsx'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <SocketProvider>
    <AlertProvider>
      <AppRoutes />
    </AlertProvider>
  </SocketProvider>
)

export default App;
