// src/db/repositories/user.repository.ts
import { pool } from "@/db/pool";
import { parseDbError } from "@/utils/dbErrorParser";
import { TABLES, USER_COLUMNS } from "@/db/constants";

interface CreateUserProps {
    username: string;
    email: string;
    hashedPassword: string;
}

export const createUser = async ({ username, email, hashedPassword }: CreateUserProps) => {
    try {
        const result = await pool.query(
            `INSERT INTO ${TABLES.USERS} (${USER_COLUMNS.USERNAME}, ${USER_COLUMNS.EMAIL}, ${USER_COLUMNS.PASSWORD})
            VALUES ($1, $2, $3)
            RETURNING *`,
            [username, email, hashedPassword]
        );
        return result.rows[0];
    } catch (err) {
        parseDbError(err, `User with email "${email}" already exists`);
    }
};

export const fetchUserByEmail = async (email: string) => {
    try {
        const result = await pool.query(
            `SELECT * FROM ${TABLES.USERS}
            WHERE ${USER_COLUMNS.EMAIL} = $1`,
            [email]
        );

        if (result.rowCount === 0) {
            // Possibly throw a NotFoundError, or just return null
            return null;
        }
        return result.rows[0];
    } catch (err) {
        parseDbError(err);
    }
};
