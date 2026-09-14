"use client"
import { useState } from "react"
export default function Produtos(props){

    const [Produtos, setProdutos]=useState(0)

    function aumentar(){
        setProdutos(Produtos+7.50)
    }

    function diminuir(){
        setProdutos(Produtos-7.50)
    }

    return(
        <div>
            <img src={props.imagem} alt="" />
            <h1>Nome:{props.nome}</h1>
            <p>Valor:{props.valor}</p>
            <p>Estoque:{props.estoque}</p>
            <button onClick={aumentar}>➕</button>
            <p>{Produtos}</p>
            <button onClick={diminuir}>➖</button>

        </div>
    )
}