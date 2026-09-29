import {NextResponse} from "next/server";
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from "path";

async function abrirBanco(){
    const db = await open({
        filename: path.join(process.cwd(),'database.db'),
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS dadosnotas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        nota INTEGER NOT NULL
        )
        `);
        return db
}

export async function GET(){
    const db = await abrirBanco();

    const alunos = await db.all('SELECT * FROM dadosnotas');

    return NextResponse.json(alunos);
}

export async function POST(request){
    const dados = await request.json();
    const { nome, nota }= dados;
    const db = await abrirBanco();


    const resultado = await db.run(
        `INSERT INTO dadosnotas(nome, nota)VALUES(?,?)`,
        [nome, nota ?? null]
    );
    return NextResponse.json({ mensagem:"Cadastro realizado"}, {status: 201});
}