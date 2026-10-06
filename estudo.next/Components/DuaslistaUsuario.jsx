"use client"
import { useEffect, useState} from "react";

export default function MensagemUsuario(){
    const [mensagens, setMensagens] = useState([]);
    const [remetente, setRemetente] = useState("");
    const [mensagem, setMensagem] = useState("");
    useEffect(()=>{
        fetch("/api/duaslista")
        .then((res)=> res.json())
        .then((dados)=> setMensagens(dados[0]||[]));
    },[]);

    useEffect(() => {
        carregarMensagens();
    },[]);
    async function enviar(e){ //olhar

    }
    
    async function enviar(e){
        e.preventDefault();
        if(!remetente.trim() || !mensagem.trim() )
        return;
        await fetch("/api/duaslita",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({remetente, mensagem})
        });
        setRemetente("");
        setMensagem("");
        carregarMensagens();
    }

    async function apagarMensagem(id, tipo){
        await fetch(`\api\duaslista?id=id&tipo = {tipo}`,{
            method: "DELETE"
        });
        carregarMensagens();
    }


    return(
        <div>
            <h1>Área do Usuário</h1>
            <form onSubmit={enviar}>
                <input type="text" value={remetente} onChange={(e)=> setRemetente(e.target.value)}/>
                <input type="text" value={mensagem} onChange={(e)=> setMensagem(e.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
      <ul>    //olhar
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