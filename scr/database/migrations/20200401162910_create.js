
exports.up = function (knex) {
    return knex.schema.createTable('portifolio', function (table) {
        table.increments('portId')

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.string('especialidade').notNullable()
        table.decimal('valor_medio_hora').notNullable()

        table.string('tatoId').notNullable()

        table.foreign('tatoId').references('tatoId').inTable('tatuador')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('portifolio')
};
