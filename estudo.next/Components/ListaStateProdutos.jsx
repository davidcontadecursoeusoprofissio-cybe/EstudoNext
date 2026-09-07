"use client"
import { useState, useRef} from "react"

export default function ListaState(){

const [listaprodutos, setListaProdutos] = useState([])
const produtoRef = useRef(null)

function AdicionarProdutosnaLista() {
    const ValorDigitado = produtoRef.current.value
    setListaProdutos([...listaprodutos, ValorDigitado])

}

    return(
        <>
        <div>
            <h1>Lista de Produtos</h1>
            <input type="text" placeholder="Digite o Produto" ref={produtoRef}/>
            <button onClick={AdicionarProdutosnaLista}>Adicionar</button>
        </div>


        {listaprodutos.map((item, indice) =>{
            return <h3 Key={indice}>{item}</h3>
        })}
        </>
    )
}