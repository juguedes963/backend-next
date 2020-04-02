
exports.up = function(knex) {
    
    return knex.schema.createTable('tatuador',function(table){
        table.increments('tatoId')
         table.string('name').notNullable()
         table.string('email').notNullable()
         table.date('data').notNullable()
         table.string('whatsapp').notNullable()
         table.string('endereco').notNullable()
     })
   };
   
   exports.down = function(knex) {
    return knex.schema.dropTable('tatuador')
   };
   