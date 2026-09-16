import {NextResponse} from "next/server"
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from "path";

async function abrirBanco(){
    const db = await open({
        filename: path.join(process.cwd(), 'database.db'),
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT
            ,
            nome TEXT NOT NULL ,
            idade INTEGER NOT NULL,
            foto TEXT    
            )
            `);
            return db
    }

    export async function GET(){
        const db = await abrirBanco();
        const usuarios = await db.all('SELECT * FROM users')
        return NextResponse.json(usuarios)
    }

    export async function POST(request){
        const dados = await request.json();

        const { nome, idade, foto }=dados;

        const db = await abrirBanco();

        await db.run(
            `INSERT INTO users (nome, idade, foto) VALUES (?,?,?)`,
            [nome, idade, foto ?? null]
        );

        return NextResponse.json({ mensagem: "Cadastrado com sucesso" }, {status: 201})
    }

   