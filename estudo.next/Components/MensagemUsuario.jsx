"use client"
import { useEffect, useState} from "react";

export default function MensagemUsuario(){
    const [mensagens, setMensagens] = useState([]);
    const [remetente, setRemetente] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function enviar(e){
        e.preventDefault();
        await fetch("/api/dadosduas",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({remetente, mensagem})
        });
        setRmetente("");
        setMensagem("");
    }

    useEffect(()=>{
        fetch("/api/dadosduas")
        .then((res)=> res.json())
        .then((dados)=> setMensagens(dados[0]||[]));
    },[]);

    return(
        <div>
            <h1>Área do Usuário</h1>
            <form onSubmit={enviar}>
                <input type="text" value={remetente} onChange={(e)=> setRemetente(e.target.value)}/>
                <input type="text" value={mensagem} onChange={(e)=> setMensagem(e.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
            <ul>
                {mensagens.map((mensagem)=>{
                    return(
                        <li key={mensagem.id}>
                            {`Remetente: ${mensagem.remetente} - Mensagem: ${mensagem.mensagem}`}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}