import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL');
    } catch (err) {
      console.error('Error connecting to PostgreSQL', err);
    }
  }

  async disconnect() {
    await this.client.end();
    console.log('Disconnected from PostgreSQL');
  }

  async query(text: string, params?: any[]) {
    return this.client.query(text, params);
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
