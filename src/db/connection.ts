import { Connection, createConnection, OkPacket, QueryError, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import fs from "fs";

import { info, error, warn, debug } from '../logging';

const NAMESPACE = 'DBCONNECTION';

let configPath: string = 'src/db/config.json';
let parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

let config = parsed.local.rw;

export interface QueryResult {
    success: boolean,
    message: string,
    results: RowDataPacket[] | RowDataPacket[][]| OkPacket | OkPacket[] | ResultSetHeader | null
}

export const getConnection = async () => {
    let connection: Connection = await createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    return connection
}

export const executeQuery = async (query: string, params: string[]) => {
    let results: QueryResult = {
        success: false,
        message: 'Unable to connect',
        results: null
    }
    const connection = await getConnection();
    const [rows, fields]: [RowDataPacket[], any[]] = await connection.execute(query, params);
    if (rows) {
        results.success = true;
        results.message = 'Success'
        results.results = rows;
    }
    return results;
}
