import { pool } from '@/db/pool'
import { Page } from '@/db/types';
import { TABLES, PAGES_COLUMNS } from '@/db/constants'

export const fetchUserPages = async (userId: string) => {
    return await pool.query(`SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.USER_ID} = $1`, [userId]);
}

export const createPageDB = async (newPage: Partial<Page>) => {
    return await pool.query(`
        INSERT INTO ${TABLES.PAGES} 
        (${PAGES_COLUMNS.NAME}, ${PAGES_COLUMNS.USER_ID}, ${PAGES_COLUMNS.PARENT_PAGE_ID})
        VALUES ($1, $2, $3)
        RETURNING *`,
        [newPage.name, newPage.user_id, newPage.parent_page_id])
}

export const deletePageDb = async (pageId: string) => {
    return await pool.query(`
        "DELETE FROM ${TABLES.PAGES} 
        WHERE ${PAGES_COLUMNS.ID} = $1 RETURNING *",
        `, [pageId])
}

type ValuesType = string | number | boolean

export const updatePageDB = async (pageId: string, updates: Partial<Page>) => {
    // Collect columns to update (only those that are not undefined)
    const setClauses: string[] = [];
    const values: ValuesType[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
            setClauses.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }
    }

    // If there are no fields to update, just return or do nothing
    if (setClauses.length === 0) {
        return null;
    }

    // Finalize query
    const setQuery = setClauses.join(", ");
    const query = `
      UPDATE ${TABLES.PAGES}
      SET ${setQuery}
      WHERE ${PAGES_COLUMNS.ID} = $${index}
      RETURNING *
    `;
    values.push(pageId);

    return pool.query(query, values);
};
