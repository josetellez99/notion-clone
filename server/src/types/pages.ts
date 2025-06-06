export interface Page {
    id: number;
    name: string;
    created_at: string;
    last_modified: string;
    user_id: string;
    is_favorite: boolean;
    status: Page_Status
    description?: string;
    icon?: string;
    cover_image?: string;
    parent_page_id?: number;
}

export type Page_Status = 'active' | 'archived';

export interface JoinedPage extends Page {
    children: Page[]
}