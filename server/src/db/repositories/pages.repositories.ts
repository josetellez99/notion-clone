import { pool } from "@/db/pool";
import { parseDbError } from "@/utils/dbErrorParser";  // Import your parser
import { Page } from "@/types/pages";
import { TABLES, PAGES_COLUMNS } from "@/db/constants";


export const fetchUserPages = async (userId: string) => {
    try {
        return await pool.query(
            `SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.USER_ID} = $1`,
            [userId]
        );
    } catch (error) {
        parseDbError(error);
    }
};

export const fetchPage = async (page_id: string) => {
    try {
        return await pool.query(
            `SELECT * FROM ${TABLES.PAGES} WHERE ${PAGES_COLUMNS.ID} = $1`,
            [page_id]
        );
    } catch (error) {
        parseDbError(error);
    }
};

export const createPageDB = async (newPage: Partial<Page>) => {
    try {
        return await pool.query(
            `
            INSERT INTO ${TABLES.PAGES} 
            (${PAGES_COLUMNS.NAME}, ${PAGES_COLUMNS.USER_ID}, ${PAGES_COLUMNS.PARENT_PAGE_ID})
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [newPage.name, newPage.user_id, newPage.parent_page_id]
        );
    } catch (error) {
        parseDbError(error, `Failed to create page "${newPage.name}"`);
    }
};

export const deletePageDb = async (pageId: string) => {
    try {
        return await pool.query(
            `
            DELETE FROM ${TABLES.PAGES} 
            WHERE ${PAGES_COLUMNS.ID} = $1
            RETURNING *
            `,
            [pageId]
        );
    } catch (error) {
        parseDbError(error, `Failed to delete page with ID "${pageId}"`);
    }
};

type ValuesType = string | number | boolean;

export const updatePageDB = async (pageId: string, updates: Partial<Page>) => {
    try {
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

        // If there are no fields to update, return null or handle as needed
        if (setClauses.length === 0) {
            return null;
        }

        const setQuery = setClauses.join(", ");
        const query = `
            UPDATE ${TABLES.PAGES}
            SET ${setQuery}
            WHERE ${PAGES_COLUMNS.ID} = $${index}
          RETURNING *
        `;
        values.push(pageId);

        return pool.query(query, values);
    } catch (error) {
        parseDbError(error, `Failed to update page with ID "${pageId}"`);
    }
};

export const checkCircularReferenceDB = async (pageId: string, newParentId: number | undefined) => {
    if (!newParentId) return false;

    try {
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
    } catch (error) {
        parseDbError(error, "Failed to check for circular reference");
    }
};
