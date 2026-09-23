"use client"
import { useEffect, useState } from "react"

export default function Bancodedadosdodados(){
    const [usuarios, setUsuarios] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function cadastro(evento){
        evento.preventDefault()
        const resposta = await fetch("/api/dados",{
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({nome, email, senha:Number(senha)})
        })
        const usuarioCriado = await resposta.json()
        console.log("usuario criado",usuarioCriado)
        setNome("")
        setEmail("")
        setSenha("")
    }
    useEffect(()=>{
        fetch("/api/dados")
        .then((resposta) => resposta.json())
        .then((DadosdoBanco) => {setUsuarios(DadosdoBanco)})
    }, [])
 return(
    <>
    {
        usuarios.map((usuario) => {
            <li Key={usuario}>
                {usuario.nome}-{usuario.email}-{usuario.senha}
            </li>
        })
    }
    <form onSubmit={cadastro}>
        <input type="text" value={nome} placeholder="Digite seu nome:" onChange={(e) => setNome(e.target.value)} />
        <input type="text" value={email} placeholder="Digite seu email:" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={senha} placeholder="Digite sua senha:" onChange={(e) => setSenha(e.target.value)} />
    </form>

    <button type="submit">Cadastrar</button>
    </>
 )
}