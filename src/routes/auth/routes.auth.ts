import { Router } from "express";

import { postLogin } from "./login.auth";
import { postSignUp } from "./signup.auth";

export const auth = Router();

auth.post('/auth/signup', postSignUp);
auth.post('/auth/login', postLogin);