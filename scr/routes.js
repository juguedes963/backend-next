const express = require('express')
const {Joi,celebrate,Segments}=require('celebrate')
const ControllerUser=require('./controllers/controllerUsuarios')
const ControllerTatuador=require('./controllers/controllerTatuador')
const ControllerPortifolio=require('./controllers/controllerPortifolio')
const ControllerSessoao=require('./controllers/controllerLogin')
const routes = express.Router()

//rotas usuarios
routes.post('/usuario',celebrate({
    [Segments.BODY]:Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
        data:Joi.string().min(10).max(12),
        whatsapp:Joi.string().required().min(10).max(11)
    })
}), ControllerUser.createUser)

routes.get('/usuario', ControllerUser.indexUsuario)

//rotas tatuador

routes.get('/tatuador',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page:Joi.number(),
    })
}),ControllerTatuador.indexTatuador)

routes.post('/tatuador',celebrate({
    [Segments.BODY]:Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
        data:Joi.string().min(10).max(12),
        whatsapp:Joi.string().required().min(10).max(11),
        endereco:Joi.string().required(),
    })
}), ControllerTatuador.createTatuador)

//rotas portifolio
routes.post('/portifolio',celebrate({
    [Segments.BODY]:Joi.object().keys({
        title:Joi.string().required(),
        description:Joi.string().required(),
        especialidade:Joi.string().required(),
        valor_medio_hora:Joi.number().required(),       
    })
}),ControllerPortifolio.CreatePortifolio)

routes.get('/portifolio',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page:Joi.number(),
    })
}),ControllerPortifolio.indexPortifolio)

routes.delete('/portifolio/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id:Joi.number().required()
    })
}),ControllerPortifolio.delete)
//rotas de login usuario e de tatuador
routes.post('/loginUser',ControllerSessoao.createSessaoUser)
routes.post('/loginTatoo',ControllerSessoao.createSessaoTatoo)

module.exports = routes