import connection from 'knex';

const knex = connection({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '123456',
        database: 'car_database'
    }
});

export default knex;