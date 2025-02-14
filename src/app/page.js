'use client'

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredData = data.filter(
    (prof) =>
      prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 pt-4">
      {error && <p className="text-rose-600">Error: {error}</p>}

      <input
        type="text"
        placeholder="Pesquisar por nome ou matrícula..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md mb-4 w-full"
      />

      <ul>
        {data.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          filteredData.map((prof, index) => (
            <div key={index}>
              <span>
                Nome: {prof.nome} / Matrícula: {prof.matricula} / Escola: {prof.escola}
              </span>

            </div>
          ))
            
        )}
      </ul>
    </div>
  );
}
