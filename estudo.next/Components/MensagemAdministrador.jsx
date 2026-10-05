"use client"
import {useEffect, useState} from "react";

export default function MensagemAdministrador(){
    const [mensagens, setMensagens] = useState([]);

    useEffect(()=>{
        fetch("/api/dadosduas")
        .then((res)=> res.json())
        .then((dados)=> setMensagens(dados[1]||[]));
    },[]);

    return(
        <div>
            <h1>Área do administrador</h1>
            <ul>
                {mensagens.map((item)=>{
                    return(
                        <li key={item.id}>
                            {item.remetente}: {item.mensagem}
                        </li>
                    )
                })}
            </ul>
        </div>       
    );
}
