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
        CREATE TABLE IF NOT EXISTS dadosduas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        remetente TEXT NOT NULL,
        mensagem TEXT NOT NULL
        )
        `);
        return db;
}



export async function GET(){
    const db = await abrirBanco();

    const listaUsuario = await db.all('SELECT *  FROM dadosduas WHERE remetente != "Admin"');

    const listaAdmin = await db.all('SELECT * FROM dadosduas WHERE remetente = "Admin"');

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