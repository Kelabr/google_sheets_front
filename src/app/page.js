'use client'

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

  async function getProfs(){

    try{

      const response = await fetch('http://localhost:3001/row', {
        method:'GET'
      })

      if(!response.ok){
        throw new Error('Falha ao buscra dados')
      }

      const value = await response.json()

      console.log(value)
      
      setData(value)


    }catch (err){
      setError(err.message)
    }

  }


  useEffect(() => {
    getProfs();
  }, [])

  return (
    <div>
      <h1>Lista de professores</h1>
      {error && <p className="text-rose-600">Error: {error}</p>}

      <ul>
        {data.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          data.map((prof, index) => (
            <div key={index}>
              <span>Nome: {prof.nome} / Matrícula: {prof.matricula} / Escola: {prof.escola}</span>
              
            </div>
            
          ))
        )}
      </ul>
    </div>
  );
}
