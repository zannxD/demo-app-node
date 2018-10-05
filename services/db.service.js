const { Pool, Client } = require('pg')

export class DB {
    static client;

    static getInstance() {
        if (!this.client) {
            this.client = new Client({
                user: 'postgres',
                host: '35.193.85.2',
                database: 'demo-db',
                password: 'Dimuthu123',
                port: 5432,
            })
        }

        return this.client;
    }


}