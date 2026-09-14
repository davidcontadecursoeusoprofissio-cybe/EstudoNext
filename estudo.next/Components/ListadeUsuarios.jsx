export default function ListadeUsuarios() {
    const usuario=[
        {
            nome: "Leite",
            preco: "5.00",
            quantidade:"25",
            status: true
        },
        {
            nome: "Café",
            preco:"25.00",
            quantidade:"0",
            status: false
        },
        {
            nome:"Pão",
            preco:"7.50",
            quantidade:"12",
            status:true
        }
    ]

    return(
        <>
        <h1>Lista de Produtos</h1>
        {
            usuario.map((usuario)=>{
                if(usuario.status == false){
                    return console.log("Produto acabado")
                }
                else{
                    return(
                        <div key={usuario.nome}>
                            <h1>Nome:{usuario.nome}</h1>
                            <p>Preço:{usuario.preco}</p>
                            <p>Quantidade:{usuario.quantidade}</p>
                            <p>{usuario.status}</p>
                        </div>
                    )
                }
            })
        }
        </>
    )
}