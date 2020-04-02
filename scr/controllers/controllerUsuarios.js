const conexao = require('../database/conexao')
module.exports={
    async indexUsuario(request, response)  {
        const usuario = await conexao('usuarios').select('*')
        return response.json(usuario)
    },
    async createUser(request,response){
        const { name, email, data, whatsapp } = request.body
        let e_mail = await conexao('usuarios').where('email', email).first()
        let whats = await conexao('usuarios').where('whatsapp', whatsapp).first()
        if (e_mail) {
            
            if(whats){
                return response.status(302).json({ error: "whats ja cadastrado" })
            }
            return response.status(302).json({ error: " email ja cadastro" })
        }
        await conexao('usuarios').insert({
            name,
            email,
            whatsapp,
            data,
           
        })
        return response.json({name})
    },
   
}