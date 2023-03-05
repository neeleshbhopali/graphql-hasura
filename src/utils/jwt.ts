import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import config from "../config";
import { Context } from "context/context";


export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("Not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, config.secret);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("Not authenticated");
    }
    return next();
};