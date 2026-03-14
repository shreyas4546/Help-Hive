import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles.css';

const routerBase = import.meta.env.VITE_ROUTER_BASENAME || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBase}>
      <ThemeProvider>
        <SocketProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SocketProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
