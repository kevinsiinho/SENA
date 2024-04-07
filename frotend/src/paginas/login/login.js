import React,{useState} from "react";
import axios  from "axios";

import './login.css'
function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const verificar = () => {
        if(correo!="" && password!=""){
          axios.post('http://localhost:1045/login', {correo,password}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            alert(response.data.mensaje);
            console.log(response.data)
             // Guardar el token y el ID en el almacenamiento local
            if(response.data.id>0){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            setCorreo('')
            setPassword('')
            window.location.href = '/inicio';
            } 
            
          })
          .catch(error => {
            console.error(error);
          });
        }else{
          alert("Llena el formulario")
        }
      };

    return (
        <div className="login-container">
        <div className="login-form">
          <h2 className="mb-4">Inicio de sesión</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input 
              type="text" 
              className="form-control" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              placeholder="Ingresa tu correo" 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Ingresa tu contraseña" 
            />
          </div>
          <button type="button" onClick={verificar} className="btn btn-primary">Iniciar sesión</button>
          <div className="mt-3">
            <a href="/registro" className="text-decoration-none">Registrarme</a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;