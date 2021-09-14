import fs from "fs";

export const NAMESPACE: string = 'Auth';
export const saltRounds: number = 10;
export const passwordLoginQuery: string = fs.readFileSync('src/routes/auth/queries/check-login-password.sql', 'utf-8');
export const tokenLoginQuery: string = fs.readFileSync('src/routes/auth/queries/check-login-token.sql', 'utf-8');
export const loginQuery: string = fs.readFileSync('src/routes/auth/queries/login.sql', 'utf-8');
export const signupQuery: string = fs.readFileSync('src/routes/auth/queries/signup.sql', 'utf-8');