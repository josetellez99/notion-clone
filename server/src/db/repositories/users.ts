import { pool } from '@/db/pool'
import { TABLES, USER_COLUMNS } from '@/db/constants'

interface createUserProps {
    username: string,
    email: string,
    hashedPassword: string
}

export const createUser = async ({username, email, hashedPassword} : createUserProps) => {

    return await pool.query(
        `INSERT INTO ${TABLES.USERS} (${USER_COLUMNS.USERNAME}, ${USER_COLUMNS.EMAIL}, ${USER_COLUMNS.PASSWORD}) VALUES ($1, $2, $3) RETURNING *`,
        [username, email, hashedPassword]
    );
}