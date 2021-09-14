import { Request, Response, NextFunction } from "express";
import { hash, genSalt } from "bcrypt";
import { QueryResult, executeQuery } from "../../db/connection";

import { info, warn, error, debug } from '../../logging';
import { NAMESPACE, saltRounds, passwordLoginQuery, signupQuery } from "./resources.auth";

interface ResultObject {
    success: Boolean,
    message: string
}

const signUpUser = async (email: string, pass: string) => {
    let loginParams = [email];
    let results: ResultObject = {
        success: false,
        message: ''
     };

    let salt = await genSalt(saltRounds);
    let hashedPass = await hash(pass, salt);

    let loginQueryResults: QueryResult = await executeQuery(passwordLoginQuery, loginParams);
    if (loginQueryResults.success) {
        let rows: any = loginQueryResults.results;
        if (rows[0]) {
            results.message = 'User already exists with that email';
        } else {
            let signupParams = [email, hashedPass, salt];
            let signupQueryResults: QueryResult = await executeQuery(signupQuery, signupParams);
            if (signupQueryResults.success) {
                results.success = true;
                results.message = 'Success';
            }
        }

    }

    return results;
}

export const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;
    let pass: string = req.body.pass;
    let repeatPass: string = req.body.repeatPass;

    let results: ResultObject = {
        success: false,
        message: 'Invalid fields'
    };
    if (email && pass && repeatPass) {
        if (pass == repeatPass) {
            results = await signUpUser(email, pass);
        } else {
            error(NAMESPACE, req, req.body)
        }
    }
    let print;
    if (results.success) print = info;
    else print = error;
    print(NAMESPACE, req, results.message);

    res.send(results);
}