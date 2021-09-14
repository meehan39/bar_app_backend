import { Request } from "express";

const getTimestamp = (): string => {
    return new Date().toISOString();
}

export const info = (namespace: string, req: Request, object?: any) => {
    let log = `${getTimestamp()} [INFO] [${namespace}] Method - [${req.method}] URL - [${req.url}], IP - [${req.socket.remoteAddress}]`;
    if (object) console.log(log, object);
    else console.log('\x1b[37m', log);
}

export const warn = (namespace: string, req: Request, object?: any) => {
    let log = `${getTimestamp()} [WARN] [${namespace}] Method - [${req.method}] URL - [${req.url}], IP - [${req.socket.remoteAddress}]`;
    if (object) console.log(log, object);
    else console.log(log);
}

export const error = (namespace: string, req: Request, object?: any) => {
    let log = `${getTimestamp()} [ERROR] [${namespace}] Method - [${req.method}] URL - [${req.url}], IP - [${req.socket.remoteAddress}]`;
    if (object) console.log(log, object);
    else console.log(log);
}

export const debug = (namespace: string, req: Request, object?: any) => {
    let log = `${getTimestamp()} [DEBUG] [${namespace}] Method - [${req.method}] URL - [${req.url}], IP - [${req.socket.remoteAddress}]`;
    if (object) console.log(log, object);
    else console.log(log);
}