import {
    UniqueConstraintError,
    ForeignKeyError,
    DatabaseError,
} from "@/errors/databaseErrors";

/* Maps Postgres error codes to custom Error classes + default messages */

export const errorCodeMap: Record<
    string,
    { errorClass: new (message?: string, code?: string) => DatabaseError; defaultMessage: string }
> = {
    "23505": {
        errorClass: UniqueConstraintError,
        defaultMessage: "Unique constraint violated",
    },
    "23503": {
        errorClass: ForeignKeyError,
        defaultMessage: "Foreign key constraint violated",
    },
};
