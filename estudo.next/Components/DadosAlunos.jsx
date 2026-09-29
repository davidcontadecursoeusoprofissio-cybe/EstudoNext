"use client"
import { useEffect, useState } from "react";

export default function DadosAlunos(){
    const [alunos, setAlunos] = useState([])
    const [nome, setNome] = useState("")
    const [nota, setNota] = useState("")

    async function cadastro(evento) {
        evento.preventDefault()
        const resposta = await fetch("/api/dadosnotas",{
            method: "POST",
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify({nome, nota:Number(nota)})
        })
        const usuarioCriado = await resposta.json()
        console.log("usuario criado", usuarioCriado)
        setNome("")
        setNota("")
    }

    useEffect(()=>{
        fetch("/api/dadosnotas")
        .then((resposta)=> resposta.json())
        .then((dadosdoBanco) => {setAlunos(dadosdoBanco)})
    }, [])

    return(
        <>
        {
            alunos.map((alunos)=>{
                return(
                    <li key={alunos.id}>
                        {alunos.nome}-{alunos.nota}
                    </li>
                )
            })
        }
        <form onSubmit={cadastro}>
            <input type="text" value={nome} placeholder="Digite o nome do aluno" onChange={(e) => setNome(e.target.value)} />
            <input type="number" value={nota} placeholder="Digite a nota do aluno" onChange={(e) => setNota(e.target.value)} />
            <button type="submit">cadastra nota</button>
        </form>
        </>
    )
}
