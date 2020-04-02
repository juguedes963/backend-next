const conexao = require('../database/conexao')
module.exports = {
    async indexTatuador(request, response) {
        const { page = 1 } = request.query
        const [count] = await conexao('tatuador').count()

        const tatuador = await conexao('tatuador').limit(5).offset((page - 1) * 5).select('*')
        response.header('total-tatuador', count['count(*)'])
        return response.json(tatuador)
    },
    async createTatuador(request, response) {
        const { name, email, data, whatsapp, endereco } = request.body
        let e_mail = await conexao('tatuador').where('email', email).first()
        let whats = await conexao('tatuador').where('whatsapp', whatsapp).first()
        if (e_mail) {
            if (whats) {
                return response.status(302).json({ error: "Tatuador ja existe" })
            }

        }
        await conexao('tatuador').insert({
            name,
            email,
            whatsapp,
            data,
            endereco,
        })
        return response.json({ name })
    },

}