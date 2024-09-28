import mongoose, { MongooseError } from "mongoose";

export class CustomError extends MongooseError {
    statusCode: number;
    status: string;
    errors?: mongoose.Error.ValidationError["errors"];
    castError?: {
        stringValue: string;
        kind: string;
        value: any;
        path: string;
        reason?: NativeError | null;
    }
    validationErrors?: Record<string, string>;

    constructor(message: string, statusCode: number, error?: mongoose.Error, validationErrors?: Record<string, string>) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.validationErrors = validationErrors;

        if (error instanceof mongoose.Error.ValidationError) this.errors = error.errors;
        if (error instanceof mongoose.Error.CastError) this.castError = this.createCastError(error)
    }

    private createCastError(error: mongoose.Error.CastError): {
        stringValue: string;
        kind: string;
        value: any;
        path: string;
        reason?: NativeError | null;
    } {
        return {
            stringValue: error.stringValue,
            kind: error.kind,
            value: error.value,
            path: error.path,
            reason: error.reason,
        };
    }
}

export type MongooseErrorHandler = {
    "ValidationError": ({ error, errors }: { error: CustomError, errors: mongoose.Error.ValidationError["errors"] }) => CustomError;
    "CastError": (error: mongoose.Error.CastError) => CustomError;
    "DocumentNotFoundError": (error: mongoose.Error.DocumentNotFoundError) => CustomError;
};
