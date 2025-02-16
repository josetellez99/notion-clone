import { pool } from '@/db/pool'
import { Page } from '@/db/types';
import { TABLES, PAGES_COLUMNS } from '@/db/constants'

export const fetchUserPages = async (userId : string) => {
    return await pool.query(`SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.USER_ID} = $1`, [userId]);
}

export const createPageDB = async (newPage: Partial<Page>) => {
    return await pool.query(`
        INSERT INTO ${TABLES.PAGES} 
        (${PAGES_COLUMNS.NAME}, ${PAGES_COLUMNS.USER_ID}, ${PAGES_COLUMNS.PARENT_PAGE_ID})
        VALUES ($1, $2, $3)`,
        [newPage.name, newPage.user_id, newPage.parent_page_id])
}

export const updatePageDB = async (newPage: Partial<Page>) => {
    return await pool.query(`
        UPDATE ${TABLES.PAGES} SET 
        `)
}