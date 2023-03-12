import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken"
import { Context } from "context/context";
import AuthenticationError from "../errors/error";
import config from "../config";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    try {
        const auth = context.req.headers['authorization'];
        if (!auth) throw new AuthenticationError('No token provided', 401);

        const token = auth.split(" ")[1];
        const data = verify(token, config.secret);
        context.payload = data as any;
    } catch (e) {
        throw new AuthenticationError('Invalid token', 401)
    }
    return next();
}