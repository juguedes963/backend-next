
exports.up = function(knex) {
    
  return knex.schema.createTable('usuarios',function(table){
      table.increments('userId')
       table.string('name').notNullable()
       table.string('email').notNullable()
       table.date('data').notNullable()
       table.string('whatsapp').notNullable()     
      
   })
 };
 
 exports.down = function(knex) {
  return knex.schema.dropTable('usuarios')
 };
 