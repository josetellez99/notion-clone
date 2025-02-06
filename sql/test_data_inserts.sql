INSERT INTO pages (name, icon, cover_image, user_id, is_favorite, description, status)
VALUES 
    ('Home', '🏠', 'cover1.jpg', 1, TRUE, 'Main homepage', 'active'),
    ('Work', '💼', 'cover2.jpg', 1, FALSE, 'Work-related notes', 'active'),
    ('Personal', '📝', 'cover3.jpg', 2, TRUE, 'Personal notes and ideas', 'active'),
    ('Projects', '🚀', 'cover4.jpg', 1, FALSE, 'List of ongoing projects', 'archived');

INSERT INTO users (username, email, password, avatar) VALUES
('john_doe', 'john@example.com', 'hashed_password_123', 'https://example.com/avatar1.png'),
('jane_smith', 'jane@example.com', 'hashed_password_456', 'https://example.com/avatar2.png');

SELECT * FROM pages;
