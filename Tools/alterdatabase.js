const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

async function alter() {
    async function alterTable(client, query) {
        try {
            await client.query(query);
        } catch (e) {
            console.error('Error when altering table:', e);
        }
    }

    client = new Client({
        connectionString: process.env.DB_URI + `/${process.env.DB_NAME}`,
    });

    await client.connect();
    await alterTable(
        client,
        `
        ALTER TABLE IF EXISTS coins 
        ADD COLUMN IF NOT EXISTS created_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS percent_price_hour double precision, 
        ADD COLUMN IF NOT EXISTS percent_price_day double precision, 
        ADD COLUMN IF NOT EXISTS percent_price_week double precision,
        ADD COLUMN IF NOT EXISTS is_stable_coin BOOLEAN;
        `
    );

    await client.end();
}

alter();