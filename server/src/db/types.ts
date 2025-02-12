// db/types.ts

export interface user {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export interface page {
    id: number;
    title: string;
    parentPageId?: number;
}