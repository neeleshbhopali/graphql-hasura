import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import config from "../config";
import { Context } from "context/context";
import AuthenticationError from "../errors/error";


export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new AuthenticationError('No token provided', 401)
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, config.secret);
        context.payload = payload as any;
    } catch (err) {
        throw new AuthenticationError('Invalid Token', 401)
    }
    return next();
};