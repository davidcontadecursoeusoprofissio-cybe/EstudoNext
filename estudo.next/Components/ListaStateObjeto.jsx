"use client"
import { useState, useRef} from "react"


export default function ListaStateObjeto() {

const [nome, setNome] = useState([])

const ValorEmail = useRef(null)
const ValorNome = useRef(null)

function Adicionar() {
    const email = ValorEmail.current.value
    const nome = ValorNome.current.value

    setNome([...nome,{email: email, nome: nome}])
}
    return (
        <>
        <div>
            <h1>Usuarío</h1>
            <input type="text" placeholder="Digite seu nome" ref={ValorNome}/>
            <input type="text" placeholder="Digite seu email" ref={ValorEmail}/>
            <button onClick={Adicionar}>Adicionar</button>
        </div>
        {nome.map ((Nomes)=>{
            return(
                <li Key={Nomes.nomes}>
                    <h1>Nome: {Nomes.nome}</h1>
                    <h2>Email: {Nomes.email}</h2>
                </li>
            )
        })}
        </>
    )
}