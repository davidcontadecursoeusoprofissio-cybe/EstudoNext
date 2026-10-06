"use client"
import {useEffect, useState} from "react";

export default function MensagemAdministrador(){
    const [mensagens, setMensagens] = useState([]);
    const [resposta, setResposta] = useState("");

   const carregarMensagens = () => {
        fetch("/api/duaslista")
        .then((res)=> res.json())
        .then((dados)=> setMensagens(dados[1]||[]));
   };

   useEffect(()=>{
    carregarMensagens();
   },[]);

   async function enviarResposta(e){
        e.preventDefault();
        if(!resposta.trim())return;

        await fetch("/api/duaslista",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({remetente:"Admin", mensagem:resposta})
        });
        setResposta("");
        carregarMensagens();
   }

   async function apagarMensagem(id, tipo){
        await fetch(`/api/duaslista?id=${id}&tipo=${tipo}`,{
            method: "DELETE"
        });
        carregarMensagens();
   }

    return(
        <div>
            <h1>Área do administrador</h1>

            <form onSubmit={enviarResposta}>
                <input
                    type="text"
                    placeholder="Escrever resposta como Admin..."
                    value={resposta}
                    onChange={(e)=> setResposta(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                    </form>
                    <ul>
                        {mensagens.map((msg)=>{
                            if (msg.deletado_admin === 1) return null;
                            const ehMinhaMensagem = msg.remetente === "Admin";
                            return(
                                <li key={msg.id} style={{margin: "10px 0"}}>
                                    {msg.remetente} : {msg.mensagem} {""}
                                    <button onClick={() => apagarMensagem(msg.id, "admin")}>Apagar para mim</button>
                                    {ehMinhaMensagem && (
                                        <button onClick={() => apagarMensagem(msg.id, "todos")}>Apagar para todos</button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
        </div>       
    );
}