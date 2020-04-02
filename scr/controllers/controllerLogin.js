const conexao = require('../database/conexao')
module.exports={
    async createSessaoUser (request,response){
        const {email}=request.body
        const usuario =await conexao('usuarios')
        .where('email',email)
        .select('name')
        .first()
        if(!usuario){
            return response.status(400).json({error:"usuario nao existe"})
        }
        return response.json(usuario)
    },
    async createSessaoTatoo(request,response){
        const {email}=request.body
        const tatuador =await conexao('usuarios')
        .where('email',email)
        .select('name')
        .first()
        if(!tatuador){
            return response.status(400).json({error:"tatuador nao existe"})
        }
        return response.json(tatuador)
    }
}