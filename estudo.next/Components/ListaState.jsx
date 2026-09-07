"use client"
import { useState, useRef} from "react"

export default function ListaState() {

const [lista, setLista] = useState([])

const inputRef = useRef(null)

function Adicionar() {
    const ValorDigitado = inputRef.current.value

    setLista([...lista, ValorDigitado])
}




    return (
        <>
        <div>
            <h1>Lista Simples com State</h1>
            <input type="text" placeholder="Digite aqui sua tarefa do dia" ref={inputRef}/>
            <button onClick={Adicionar}>Adicionar</button>
        </div>
        {lista.map((item, indice) =>{
            return <h3 Key={indice}>{item}</h3>
        })}
        </>
    )
}