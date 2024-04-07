import './producto.css'
import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { useParams } from 'react-router-dom';

export default function ActualizarProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    valor: '',
    UserID: '',
  });
  const idp  = useParams();

  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    } else {
        axios.get('http://localhost:1045/producto/'+idp.id, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log(response.data.mensaje)
            setProducto(response.data)
          })
          .catch(error => {
            console.error(error);
          });
    }
  }, [idp.id]);

  

  const ActualizarProducto = () => {
    producto.UserID = localStorage.getItem('id');
    if(producto.nombre!==""&& producto.categoria!=="" && producto.valor>0){
          axios.put(`http://localhost:1045/producto/${idp.id}`,producto, {
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


  return (
    <div className="register-container">
      <div className="row g-3 form">
        <h2 className="mb-4">Actualizar Producto o Servicio</h2>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">ID</label>
          <input type="text" className="form-control" disabled value={producto._id} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">Nombre</label>
          <input type="text" className="form-control" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault04" className="form-label">Categoría</label>
          <select className="form-select" value={producto.categoria} onChange={(e) => setProducto({ ...producto, categoria: e.target.value })}>
            <option value="">Escoge una opción</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Servicio">Servicio</option>
            <option value="Ropa">Ropa</option>
            <option value="Comida">Comida</option>
            <option value="Vehiculo">Vehículo</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">Valor</label>
          <input type="number" className="form-control" value={producto.valor} onChange={(e) => setProducto({ ...producto, valor: parseFloat(e.target.value, 10) || 0 })} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="button" onClick={ActualizarProducto}>Enviar datos</button>
        </div>
        <div className="mt-3">
          <a href="/inicio" className="text-decoration-none">Regresar</a>
        </div>
      </div>
    </div>
  );
}
