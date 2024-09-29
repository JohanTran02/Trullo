import { ErrorRequestHandler, Request, Response, NextFunction } from "express"
import mongoose, { CastError } from "mongoose";
import { CustomError } from "./types.ts";

export const errorHandler: ErrorRequestHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "An unexpected error occurred";

    error = validateErrorHandlerType(error);

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        errors: error.validationErrors,
        error: error.name
    })
}

const validateErrorHandlerType = (error: CustomError) => {
    if (error instanceof mongoose.Error.ValidationError) error = validationErrorHandler({ error, errors: error.errors });
    if (error instanceof mongoose.Error.CastError) error = castErrorHandler(error);
    if (error instanceof mongoose.Error.DocumentNotFoundError) error = documentErrorHandler(error);

    return error;
}

const validationErrorHandler = ({ error, errors }: { error: CustomError, errors: mongoose.Error.ValidationError["errors"] }) => {
    const formattedErrors: Record<string, string> = {};
    Object.entries(errors).forEach(([field, errorDetails]) => {
        formattedErrors[field] = errorDetails.message;
    });

    return new CustomError("Invalid input data", 400, error, formattedErrors);
}

const castErrorHandler = (castError: CastError) => {
    const msg = `Invalid value for ${castError.path}: ${castError.value}`
    return new CustomError(msg, 400, castError);
}

const documentErrorHandler = (documentError: mongoose.Error.DocumentNotFoundError) => {
    return new CustomError("Document not found", 404, documentError);
}

export const checkDuplicateValue = (values: string[], newValues: string[]) => {
    const invalidTags = newValues.filter(value => !/^[a-zA-Z0-9]+$/.test(value));

    if (invalidTags.length > 0) {
        throw new CustomError(`Invalid tags: ${invalidTags.join(', ')}`, 400);
    }

    const allValues = [...values, ...newValues].map(tag => tag.toLowerCase())
    const uniqueValues = new Set(allValues);
    const hasDuplicates = uniqueValues.size !== allValues.length;

    if (hasDuplicates) {
        const duplicateValues = allValues.filter((tag, index) => allValues.indexOf(tag) !== index);
        const uniqueDuplicateValues = [...new Set(duplicateValues)]
        throw new CustomError(`Duplicate tags are not allowed: ${uniqueDuplicateValues.join(', ')}`, 400);
    }
}