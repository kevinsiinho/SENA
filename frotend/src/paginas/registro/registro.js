import './registro.css'
import React, { useState} from 'react';
import axios from 'axios';

function Registro() {
  const [usuario, setUsuario] = useState({
    _id: '',
    nombre: '',
    edad: '',
    correo: '',
    password: ''
  });


  const [password, setPassword] = useState('');

  const nuevoUsuario = () => {
    console.log(usuario)
    if(usuario.password!='' && usuario._id>0 && usuario.nombre!=""&& usuario.edad>0 && usuario.correo!=""){
        if(usuario.password===password){
          axios.post('http://localhost:1045/nuevo-usuario', usuario, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            alert(response.data.mensaje);
            setUsuario({
              _id: '',
              nombre: '',
              edad: '',
              correo: '',
              password: ''
            });
            setPassword('')
          })
          .catch(error => {
            console.error(error);
          });
          
        }else{
          alert("La contraseña no coinciden")
        }
    }else{
      alert("Llena el formulario")
    }
  };



  return (
    <div className="register-container">
      <div className="row g-3 form">
        <h2 className="mb-4">Registrarme</h2>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">Número de Identificación</label>
          <input type="number" className="form-control" value={usuario._id} onChange={(e) => setUsuario({ ...usuario, _id:parseInt(e.target.value, 10) || 0 })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">Nombre completo</label>
          <input type="text" className="form-control" value={usuario.nombre} onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })} />
        </div>
          <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">Edad</label>
          <input type="number" className="form-control" value={usuario.edad} onChange={(e) => setUsuario({ ...usuario, edad: parseInt(e.target.value, 10) || 0 })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault03" className="form-label">correo</label>
          <input type="correo" className="form-control" value={usuario.correo} onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">Repite la Contraseña</label>
          <input type="password" className="form-control" value={usuario.password} onChange={(e) => setUsuario({ ...usuario, password: e.target.value })} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="button" onClick={nuevoUsuario}>Enviar datos</button>
        </div>
        <div className="mt-3">
          <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Registro;

