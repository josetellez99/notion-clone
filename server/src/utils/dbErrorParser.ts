import { errorCodeMap } from "./errorCodeMap";
import { DatabaseError } from "@/errors/databaseErrors";
import { PostgresError } from "@/types/postgresError";

/**
 * parseDbError takes a raw unknown error,
 * tries to interpret it as a PostgresError,
 * and throws an appropriate custom error.
 */
export function parseDbError(error: unknown, customMessage?: string): never {
    // 1) First ensure it's an Error object
    if (!(error instanceof Error)) {
        // If it's not even an Error, throw a generic DatabaseError
        throw new DatabaseError("Unknown error type encountered");
    }

    // 2) Now treat it as PostgresError
    const pgError = error as PostgresError;

    // 3) Check if it has a Postgres error code
    if (!pgError.code) {
        // If there's no code, re-throw the original error or wrap in DatabaseError
        throw new DatabaseError(pgError.message);
    }

    // 4) Look up our known code in the map
    const mappedEntry = errorCodeMap[pgError.code];
    if (mappedEntry) {
        // Construct a custom message or fallback to default
        const finalMessage = customMessage || mappedEntry.defaultMessage;
        throw new mappedEntry.errorClass(finalMessage, pgError.code);
    }

    // 5) If code not recognized, throw a generic DatabaseError with code
    throw new DatabaseError(pgError.message, pgError.code);
}
