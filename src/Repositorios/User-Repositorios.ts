import  pool  from "../conexaoBd";
type TUserCreate = {
    nome: string
    email: string
    senha: string
}
type User = {
    id: number,
    nome: string,
    email: string,
    senha: string
}

export default class UsuariosRepositorio {
    async criar(props: TUserCreate){
        const { nome, email, senha } = props;
        const query = 'insert into usuarios(nome, email, senha) values($1, $2, $3) returning id,nome,email';
        const values = [nome, email, senha];
        const result = await pool.query(query, values);
        return result.rows[0];
     
    }
    async findById(id: number){
        const query = 'select * from usuarios where id = $1';
        const values = [id];
        const {rows} = await pool.query(query, values);
        return rows[0];
    }
    async findByEmail(email: string){
        const query = 'select * from usuarios where email = $1';
        const values = [email];
        const {rows} = await pool.query(query, values);
        return rows[0];
    }
}