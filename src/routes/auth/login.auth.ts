import { Request, Response, NextFunction } from "express";
import { compare, genSalt } from "bcrypt";

import { QueryResult, executeQuery } from "../../db/connection";
import { NAMESPACE, saltRounds, passwordLoginQuery, tokenLoginQuery } from "./resources.auth";
import { info } from "../../logging";

interface ResultObject {
    authenticated: boolean,
    message: string,
    email: string,
    token: string
}

const loginUser = async (email: string, userKey: string, dbKey: string, loginMethod: string): Promise<ResultObject> => {
    let results: ResultObject = {
        authenticated: false,
        message: 'Invalid credentials',
        email: email,
        token: ''
    }

    let keyCheck: boolean = await compare(userKey, dbKey);

    if (keyCheck) {
        results.authenticated = true;
        results.message = 'Success';
        if (loginMethod == 'password') {
            let token: string = await genSalt(saltRounds);
            // let queryParams: string[] = [email, token];
            // let queryResults: QueryResult = await executeQuery(loginQuery, queryParams);
            if (true) {
                results.authenticated = true;
                results.message = 'Successfully logged in';
                results.token = token;
            }
        } else if (loginMethod == 'token') {
            results.token = userKey;
        }

    }

    return results;
}

const getLoginData = async (email: string, key: string, loginMethod: string): Promise<ResultObject> => {
    let results: ResultObject = {
        authenticated: false,
        message: 'Invalid credentials',
        email: email,
        token: ''
    }

    let params: string[] = [email];
    let query: string;
    if (loginMethod == 'password') query = passwordLoginQuery;
    else query = tokenLoginQuery;
    let queryResults: QueryResult = await executeQuery(query, params);

    if (queryResults.success && queryResults.results) {
        let rows: any = queryResults.results;
        if (rows) {
            let dbKey = rows[0][loginMethod];
            results = await loginUser(email, key, dbKey, loginMethod);
        }
    }
    return results;
}



export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let email: string = req.body.email ?? null;
    let pass: string = req.body.pass ?? null;
    let token: string = req.body.token ?? null;

    let key: string = '';
    let loginMethod: string = '';

    let results: ResultObject = {
        authenticated: false,
        message: 'Invalid credentials',
        email: email,
        token: ''
    }

    if (email) {
        if (pass) {
            key = pass;
            loginMethod = 'password';
        } else if (token) {
            key = token;
            loginMethod = 'token';
        }
        results = await getLoginData(email, key, loginMethod);
    }
    info(NAMESPACE, req, results.message);
    res.send(results);
}