// db/constants.ts
export const TABLES = {
    USERS: 'users',
    PAGES: 'pages',
};

export const USER_COLUMNS = {
    ID: 'id',
    USERNAME: 'username',
    EMAIL: 'email',
    PASSWORD: 'password',
    AVATAR: 'avatar',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
};

export const PAGES_COLUMNS = {
    ID: 'id',
    NAME: 'name',
    CREATION_AT: 'creation_at',
    LAST_MODIFIED: 'last_modified',
    ICON: 'icon',
    COVER_IMAGE: 'cover_image',
    USER_ID: 'user_id',
    PARENT_PAGE_ID: 'parent_page_id',
    IS_FAVORITE: 'is_favorite',
    DESCRIPTION: 'description',
    STATUS: 'status'
};
