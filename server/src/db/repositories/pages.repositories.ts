import { pool } from '@/db/pool'
import { Page } from '@/types/pages';
import { TABLES, PAGES_COLUMNS } from '@/db/constants'

export const fetchUserPages = async (userId: string) => {
    return await pool.query(`SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.USER_ID} = $1`, [userId]);
}

export const fetchPage = async (page_id: string) => {
    return await pool.query(`
        SELECT * FROM ${TABLES.PAGES}
        WHERE ${PAGES_COLUMNS.ID}
        = $1`, [page_id])
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
        DELETE FROM ${TABLES.PAGES} 
        WHERE ${PAGES_COLUMNS.ID} = $1
        RETURNING *
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

export const checkCircularReferenceDB = async (pageId: string, newParentId: number | undefined) => {

    if(!newParentId) return false

    const query = `
        WITH RECURSIVE page_ancestors AS (
            SELECT ${PAGES_COLUMNS.ID}, ${PAGES_COLUMNS.PARENT_PAGE_ID} FROM ${TABLES.PAGES} WHERE id = $1
            UNION ALL
            SELECT p.id, p.parent_page_id FROM ${TABLES.PAGES} p
            INNER JOIN page_ancestors pa ON p.parent_page_id = pa.id
        )
        SELECT 1 FROM page_ancestors WHERE id = $2;
    `;

    const result = await pool.query(query, [pageId, newParentId]);

    return (result.rowCount ?? 0) > 0;
};
