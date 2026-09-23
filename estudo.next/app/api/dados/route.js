import {NextResponse} from "next/server";
import sqline3 from 'sqlite3'
import {open} from 'sqlite'
import path from "path"

async function abrirBanco(){
    const db = await open({
        filename : path.join(process.cwd(),'database.db'),
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS dados(
        id INTEGER PRIMARY KEY AUTOINCREMENT

        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha INTEGER NOT NULL,
        )
        `);

        export async function GET(){
            const db = await abrirBanco();
            const usuarios = await db.all('SELECT * FROM dados')
            return NextResponse.json(usuarios)
        }
        export async function POST(request){
            const dado = await request.json();
            const { nome, email, senha } = dado;
            const db = await abrirBanco();

            const resultado = await db.run(
                `INSERT INTO dados (nome, email, senha)VALUES(?,?,?)`,
                [nome, email, senha ?? null]
            );
            return NextResponse.json({ mensagem: "Cadastro feito com sucesso"}, {status: 201})
        }
}