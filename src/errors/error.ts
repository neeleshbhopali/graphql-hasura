import ExtendableError from './extendableError'

const AuthenticationErrors = {
    NOT_AUTHENTICATED: 401,
    BAD_CREDENTIALS: 402
}

class AuthenticationError extends ExtendableError {
    static errors = AuthenticationErrors

    constructor(message: string, code: number) {
        super(message, code ?? AuthenticationErrors.NOT_AUTHENTICATED);
    }
}

export default AuthenticationError