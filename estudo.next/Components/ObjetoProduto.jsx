"use client"
import { useState, useRef} from "react"

export default function ObjetoProduto() {
const [produto, setProduto] = useState([])

const ValorProduto = useRef(null)
const ValorPreco = useRef(null)
const ValorQuantidade = useRef(null)
const ValorDescricao = useRef(null)
const ValorData = useRef(null)

function Adicionar() {
    const produto = ValorProduto.current.value
    const preco = ValorPreco.current.value
    const quantidade = ValorQuantidade.current.value
    const descricao = ValorDescricao.current.value
    const data = ValorData.current.value

    setProduto([...produto,{produto: produto, preco: preco, quantidade: quantidade, descricao: descricao, data: data}])
}



return (
    <>
    <div>
        <h1>Adicionar Produto</h1>
        <input type="text" placeholder="Digite seu Produto" ref={ValorProduto}/>
        <input type="number" step="any" placeholder="Digite o Preço" ref={ValorPreco}/>
        <input type="number" placeholder="Digite a Quantidade" ref={ValorQuantidade}/>
        <input type="text" placeholder="Digite a Descrição" ref={ValorDescricao}/>
        <input type="date"   placeholder="Digite a Data" ref={ValorData}/>
        <button onClick={Adicionar}>Adicionar</button>
    </div>

    {produto.map ((Produtos)=>{
        return(
            <li Key={Produtos.produto}>
                <h1>Produto: {Produtos.produto}</h1>
                <p>Preço: {Produtos.preco}</p>
                <p>Quantidade: {Produtos.quantidade}</p>
                <p>Descrição: {Produtos.descricao}</p>
                <p>Data: {Produtos.data}</p>
            </li>
        )
    })}
    </>
)
}