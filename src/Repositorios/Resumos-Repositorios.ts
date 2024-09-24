import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";

export default class ResumosRepository {
    
    async criar(props: TResumo) {
        const { usuarioId, materiaId, topicos, descricao, criado } = props;
        const query = 'INSERT INTO resumos (usuario_id, materia_id, topicos, descricao, criado) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const valores = [usuarioId, materiaId, topicos, descricao, criado];
        const { rows } = await pool.query(query, valores);
        const resultados = rows[0];
        return {
            id: resultados.id,
            usuarioId: resultados.usuario_id,
            materiaId: resultados.materia_id,
            titulo: props.titulo, 
            topicos: resultados.topicos.split(', '), 
            descricao: resultados.descricao || "Sem descrição",
            criado: resultados.criado
        };
    }
    
    async listar() {
        const query = 'SELECT resumos.*, materias.nome AS materia_nome FROM resumos JOIN materias ON resumos.materia_id = materias.id';
        const resultado = await pool.query(query);
        return resultado.rows.map(resumo => ({
            id: resumo.id,
            usuarioId: resumo.usuario_id,
            materia: resumo.materia_nome,
            titulo: resumo.titulo,
            topicos: resumo.topicos.split(', '),
            descricao: resumo.descricao || "Sem descrição",
            criado: resumo.criado
        }));
    }
    
    async editar(titulo: string, topicos: string[], descricao: string, id: number) {
        const query = 'UPDATE resumos SET titulo = $1, topicos = $2, descricao = $3 WHERE id = $4';
        const valores = [titulo, topicos, descricao, id];
        await pool.query(query, valores);
        return { mensagem: "Resumo editado com sucesso" };
    }
    
    async deletar(id: number) {
        const query = 'DELETE FROM resumos WHERE id = $1';
        const valores = [id];
        await pool.query(query, valores);
        return { mensagem: "Resumo deletado com sucesso" };
    }

    async findResumoByid(id: number) {
        const query = 'SELECT * FROM resumos WHERE id = $1';
        const valores = [id];
        const { rows } = await pool.query(query, valores);
        return rows[0];
    }

    async findByid(id: number) {
        const query = 'SELECT * FROM materias WHERE id = $1';
        const valores = [id];
        const { rows } = await pool.query(query, valores);
        return rows[0];
    }
}
