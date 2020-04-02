const conexao = require('../database/conexao')
module.exports = {
    async indexPortifolio(request, response) {
        const { page = 1 } = request.query
        const [count] = await conexao('portifolio').count()

        const portifolio = await conexao('portifolio')
            .join('tatuador', 'tatuador.tatoId', '=', 'portifolio.portId')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*')

        response.header('total-portifolio', count['count(*)'])
        return response.json(portifolio)
    },
    async CreatePortifolio(request, response) {
        const { title, description, especialidade, valor_medio_hora } = request.body
        const tatoId = request.headers.authorization
        const portifolio = await conexao('portifolio').where('tatoID', tatoId).select('tatoId').first()
        if (portifolio) {
            return response.status(302).json({ error: "Portifolio ja existe" })
        }
        const [id] = await conexao('portifolio').insert({
            title,
            description,
            especialidade,
            valor_medio_hora,
            tatoId
        })
        return response.json({ id })

    },
    async delete(request, response) {
        const { id } = request.params
        const portId = request.headers.authorization

        const portifolio = await conexao('portifolio')
            .where('portId', id)
            .select('tatoId')
            .first()

        if (portifolio.tatoId != portId) {
            return response.status(401).json({ error: 'operacao invalida' })
        }
        await conexao('portifolio').where('portId', id).delete()
        return response.status(204).send()
    }
}