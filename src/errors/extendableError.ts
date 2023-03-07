class ExtendableError extends Error {
    constructor(message, errorCode) {
        super(JSON.stringify({ text: message, code: errorCode }))
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export default ExtendableError