CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creation_at TIMESTAMP DEFAULT NOW(),
    last_modified TIMESTAMP DEFAULT NOW(),
    icon VARCHAR(255),
    cover_image VARCHAR(255),
    user_id INTEGER NOT NULL,
    parent_page_id INTEGER REFERENCES pages(id),
    is_favorite BOOLEAN DEFAULT FALSE,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM pages
