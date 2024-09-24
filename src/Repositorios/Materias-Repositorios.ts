import pool from "../conexaoBd";

export default class MateriasRepository{
    async listar(){
        const query = 'select * from materias';
        const resultadoMaterias = await pool.query(query);
        return resultadoMaterias.rows;
    }
}