export class DatabaseError extends Error {
    public code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.name = "DatabaseError";
        this.code = code;
    }
}

export class UniqueConstraintError extends DatabaseError {
    constructor(message = "Unique constraint violated", code = "23505") {
        super(message, code);
        this.name = "UniqueConstraintError";
    }
}

export class ForeignKeyError extends DatabaseError {
    constructor(message = "Foreign key constraint violated", code = "23503") {
        super(message, code);
        this.name = "ForeignKeyError";
    }
}

export class NotFoundError extends DatabaseError {
    constructor(message = "Record not found", code = "NOT_FOUND") {
        super(message, code);
        this.name = "NotFoundError";
    }
}

export class CircularReferenceError extends Error {
    constructor(message = "Circular reference detected") {
        super(message);
        this.name = "CircularReferenceError";
    }
}
