import './updateuser.css'
import React, { useState,useEffect } from 'react';
import axios  from 'axios'
const api="http://localhost:1045";;

function UpdateUser() {
  const [usuario, setUsuario] = useState({
    _id: '',
    nombre: '',
    edad: '',
    correo: '',
    password: ''
  });

  const ActualizarUsuario = () => {
    console.log(usuario)
    if(usuario.nombre!==""&& usuario.edad>0 && usuario.correo!==""){
      const id = localStorage.getItem('id');
          axios.put(`http://localhost:1045/usuario/${id}`, usuario, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log(response.data.mensaje)
            alert(response.data.mensaje);
          })
          .catch(error => {
            console.error(error);
          });

    }else{
      alert("Llena el formulario")
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    } else {
      const id = localStorage.getItem('id');
      axios.get(`${api}/usuario/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setUsuario(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const EliminarUsuario = () => {
    const id = localStorage.getItem('id');
          axios.delete(`${api}/usuario/${id}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            alert(response.data.mensaje);
            localStorage.clear();
            window.location.href = '/login';
          })
          .catch(error => {
            console.error(error);
          });
    }

  return (
    <div className="register-container">
      <div className="row g-3 form">
        <h2 className="mb-4">Actualizar datos</h2>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">Número de Identificación</label>
          <input type="number" className="form-control" disabled value={usuario._id} onChange={(e) => setUsuario({ ...usuario, _id: parseInt(e.target.value, 10) || '' })} />
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
          <label htmlFor="validationDefault03" className="form-label">Correo</label>
          <input type="email" className="form-control" value={usuario.correo} onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="button" onClick={ActualizarUsuario}>Enviar datos</button>
          <button className="btn btn-danger" type="button" onClick={EliminarUsuario}>Eliminar datos</button>
        </div>
        <div className="mt-3">
          <a href="/inicio" className="text-decoration-none">Regresar</a>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
