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
        CREATE TABLE IF NOT EXISTS wallet (
            id serial,
            address VARCHAR(255) NOT NULL,
            seed TEXT,
            private_key VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            withdrawal_id VARCHAR(255) NOT NULL,
            created_at timestamp with time zone NOT NULL
        );
    `
    );

    await createIndex(client, `CREATE UNIQUE INDEX wallet_address_idx ON wallet (address);`);

    await createTable(
        client,
        `
        CREATE TABLE IF NOT EXISTS control (
            id serial,
            chat_id VARCHAR(255) NOT NULL,
            status BOOLEAN,
            updated_at timestamp with time zone NOT NULL
        );
    `
    );

    await createIndex(client, `CREATE UNIQUE INDEX control_chat_id_idx ON control (chat_id);`);

    await client.end();

}

create();