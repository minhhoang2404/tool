const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log('process.env.DB_URI ', process.env.DB_URI, process.env.DB_NAME);

async function create() {
    let client = new Client({
        connectionString: process.env.DB_URI + '/postgres',
    });

    await client.connect()
    try {
        await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    } catch (e) {
        // Error will be thrown when database is existing
    }
    await client.end();

    async function createTable(client, query) {
        try {
            await client.query(query);
        } catch (e) {
            console.error('Error when creating table:', e);
        }
    }

    async function createIndex(client, query) {
        try {
            await client.query(query);
        } catch (e) {
            console.error('Index is created already', query);
        }
    }

    client = new Client({
        connectionString: process.env.DB_URI + `/${process.env.DB_NAME}`,
    });

    await client.connect();
    await createTable(
        client,
        `
        CREATE TABLE IF NOT EXISTS transaction (
            id serial,
            transaction_hash VARCHAR(255) NOT NULL,
            wallet VARCHAR(255) NOT NULL,
            token_from VARCHAR(255) NOT NULL,
            token_to VARCHAR(255) NOT NULL,
            amount_in float8,
            amount_out float8,
            rate float8,
            updated_at timestamp with time zone NOT NULL
        );
    `
    );

    await createIndex(client, `CREATE UNIQUE INDEX transaction_transaction_hash_idx ON transaction (transaction_hash);`);

    await client.end();

}

create();