import { NextResponse} from "next/server";
import sqlite3 from 'sqlite3';
import { open} from 'sqlite';
import path from "path";

async function abrirBanco(){
    const db = await open({
        filename: path.join(process.cwd(), 'database.db'),
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS duaslista(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        remetente TEXT NOT NULL,
        mensagem TEXT NOT NULL,
        deletado_usuario INTEGER DEFAULT 0,
        deletado_admin INTEGER DEFAULT 0,
        deletado_todos INTEGER DEFAULT 0
        )
        `);
        return db;
}



export async function GET(){
    const db = await abrirBanco();

    const listaUsuario = await db.all('SELECT *  FROM duaslista WHERE deletado_todos =0');

    const listaAdmin = await db.all('SELECT * FROM duaslista WHERE deletado_todos =0');

    return NextResponse.json([listaUsuario, listaAdmin]);
}





export async function POST(request){
    const dados = await request.json();
    const { remetente, mensagem } = dados;
    const db = await abrirBanco();

    await db.run(`
        INSERT INTO dadosduas(remetente, mensagem) VALUES (?,?)`,
        [remetente, mensagem ??""]
    );

    return NextResponse.json({mensagem:"Mensagem cadastrada"}, {status:201});
}

export async function DELETE(request){
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    const tipo = searchParams.get("tipo");

    const db = await abrirBanco();

    if(tipo ==="todos"){
        await db.run(`UPDATE duaslista SET deletado_todos = 1 WHERE id =?`,[id]);
    }else if(tipo ==="usuario"){
        await db.run(`UPDATE duaslista SET deletado_usuario = 1 WHERE id =?`,[id]);
    }else if(tipo === "admin"){
        await db.run(`UPDATE duaslista SET deletado_admin = 1 WHERE id = ?`,[id]);
    }
    return NextResponse.json({mensagem:"Mensagem atualizada"});
}