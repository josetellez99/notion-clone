// src/types/PostgresError.ts
export interface PostgresError extends Error {
    code?: string;        // e.g., '23505' for unique constraint
    detail?: string;      // Additional info
    constraint?: string;  // Which constraint was violated
    schema?: string;      // DB schema name
    table?: string;       // Table name
    // ... other Postgres-specific fields as needed
}
