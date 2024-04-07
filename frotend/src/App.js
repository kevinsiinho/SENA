import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './paginas/login/login';
import Registro from './paginas/registro/registro';
import UpdateUser from './paginas/ActualizarUsuario/UpdateUser';
import Inicio from './paginas/inicio/inicio';
import CrearProducto from './paginas/CrearProducto/CrearProducto';
import ActualizarProducto from './paginas/ActualizarProducto/ActualizarProducto';

function App() {
  return (
    <Router> {/* Esto es muy importante para las rutas */}
      <div className="App">
       {/* <header className="App-header">
        </header>*/}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/actualizar-usuario" element={<UpdateUser />} />
          <Route path="/registrar-producto" element={<CrearProducto />} />
          <Route path="/actualizar-producto/:id" element={<ActualizarProducto />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

