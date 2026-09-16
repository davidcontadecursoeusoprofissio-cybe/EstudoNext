"use client"
import { useEffect, useState } from "react"

export default function ListaDeUsuariosBanco(){
    const [usuarios, setUsuarios] = useState([])
    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [foto, setFoto] = useState("")

    async function cadastro(evento) {
        evento.preventDefault()
        const resposta = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, idade: Number(idade), foto })
        })
        const usuarioCriado = await resposta.json()
        console.log("usuario criado", usuarioCriado)
        setFoto("")
        setIdade("")
        setNome("")
    }

    useEffect(()=>{
        fetch("/api/users")
        .then((resposta) => resposta.json())
        .then((DadosDoBanco) => { setUsuarios(DadosDoBanco) })
    }, [])

    return(
        <>
        {
            usuarios.map((usuario)=>{
                return(
                    <li key={usuario.id}>
                        {usuario.nome} - {usuario.idade}
                        <img src={usuario.foto} alt="" />
                    </li>
                )
            })
        }
        <form onSubmit={cadastro}>
            <input type="text" value={nome} placeholder="Digite seu nome" onChange={(e)=>setNome(e.target.value)} />
            <input type="text" value={idade} placeholder="Digite sua idade" onChange={(e)=>setIdade(e.target.value)} />
            <input type="text" value={foto} placeholder="Link da foto" onChange={(e)=>setFoto(e.target.value)} />

            <button type="submit">Cadastrar</button>
        </form>
        </>
    )
}