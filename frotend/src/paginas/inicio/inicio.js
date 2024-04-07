import React, { useState, useEffect } from 'react';
import './inicio.css'
import axios from 'axios'
const api="http://localhost:1045";
export default function Inicio() {
  const [nombre, setNombre] = useState('');
  const [productos,SetProductos]=useState([])
  useEffect(() => { 

  const token = localStorage.getItem('token');
  if (!token || token===undefined) {
    window.location.href = '/login';
    return;
  }else{
    axios.get(`${api}/productos`,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        SetProductos(response.data)
      })
      .catch(error => {
        console.error(error);
      });
      
      const id = localStorage.getItem('id');
      axios.get(`${api}/usuario/${id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setNombre(response.data.nombre)
        })
        .catch(error => {
          console.error(error);
        });
  }
}, [productos]);


const EliminarProducto = (idp) => {
  console.log("ipd:"+idp)
        axios.delete('http://localhost:1045/producto/'+idp, {
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
  }

const Salir=()=>{
  localStorage.clear();
}

  return (
    <div>
      <h1>Bienvenido, {nombre} </h1>
      <div className="container">
      <a class="btn btn-outline-primary botones" href="/registrar-producto" role="button">Nuevo Producto</a>  
      <a class="btn btn-outline-primary botones" href="/actualizar-usuario" role="button">Actualizar Datos</a>
      <a class="btn btn-outline-primary botones" onClick={Salir} role="button">Salir</a>    
        <table className="table table-hover table-condensed table-bordered">
          <thead className="table-sucess">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoria</th>
              <th scope="col">Valor</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {productos.map((producto,index)=>{
              return(
                <tr key={index}>
                  <td>{(index+1)}</td>
                  <td>{producto._id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.Categoria}</td>
                  <td>{producto.valor}</td>
                  <td> <a class="btn btn-primary botones" href={`/actualizar-producto/${producto._id}`} role="button">Edidtar</a></td>
                  <td><button type="button" class="btn btn-danger" onClick={() => EliminarProducto(producto._id)}>X</button></td>  
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


