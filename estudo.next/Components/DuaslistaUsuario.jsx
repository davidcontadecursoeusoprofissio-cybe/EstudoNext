"use client"
import { useEffect, useState } from "react";

export default function MensagemUsuario(){
    const [mensagens, setMensagens] = useState([]);
    const [remetente, setRemetente] = useState("");
    const [mensagem, setMensagem] = useState("");

    const carregarMensagens = () => {
        fetch("/api/duaslista")
        .then((res) => res.json())
        .then((dados) => setMensagens(dados[0] || []));
    };

    useEffect(() => {
        carregarMensagens();
    }, []);

    async function enviar(e){
        e.preventDefault();
        if(!remetente.trim() || !mensagem.trim()) return;

        // Corrigido o nome da rota (/api/duaslita -> /api/duaslista)
        await fetch("/api/duaslista", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ remetente, mensagem })
        });
        setRemetente("");
        setMensagem("");
        carregarMensagens();
    }

    async function apagarMensagem(id, tipo){
        // Corrigida a interpolação da URL
        await fetch(`/api/duaslista?id=${id}&tipo=${tipo}`, {
            method: "DELETE"
        });
        carregarMensagens();
    }

    return(
        <div>
            <h1>Área do Usuário</h1>
            <form onSubmit={enviar}>
                <input type="text" value={remetente} onChange={(e) => setRemetente(e.target.value)} placeholder="Seu nome..." />
                <input type="text" value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Sua mensagem..." />
                <button type="submit">Enviar</button>
            </form>
            <ul>
                {mensagens.map((msg)=>{
                    if (msg.deletado_usuario === 1) return null;
                    const ehMinhaMensagem = msg.remetente !== "Admin";
                    return(
                        <li key={msg.id} style={{ margin: "10px 0" }}>
                            {`Remetente: ${msg.remetente} - Mensagem: ${msg.mensagem}`}
                            <button onClick={() => apagarMensagem(msg.id, "usuario")}>Apagar para mim</button>
                            
                            {/* O usuário só pode apagar para todos se a mensagem for dele */}
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





