import { pool } from '@/db/pool'
import { TABLES, PAGES_COLUMNS } from '@/db/constants'

export const fetchUserPages = async (userId : string) => {
    return await pool.query(`SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.USER_ID} = $1`, [userId]);
}