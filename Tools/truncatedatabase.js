const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    connectionString: process.env.DB_URI + `/${process.env.DB_NAME}`,
});

client.connect()
    .then(() => client.query(`DROP SCHEMA public CASCADE;
            CREATE SCHEMA public; `)
        .catch(e => {
            console.error('Error when dropping database:', process.env.DB_NAME, e);
        })
        .finally(() => client.end())
    );