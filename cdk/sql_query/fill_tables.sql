INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
('a6316a1c-55ce-4b51-b635-f12299889929', 'bbd2d1b0-5f27-4dd5-87ac-0f58e2f4a0fa', '2024-07-23', '2024-07-28', 'OPEN'),
('d0270d65-7a2a-4749-a441-99f44cc70ee1', '94c16f43-41c3-4772-896a-c8f7fd169365', '2024-07-23', '2024-07-28', 'OPEN'),
('caeeecaf-7fa5-4ff7-b1e5-ab85ba27fecf', '41fafb73-00da-4614-a562-93811a4ed67f', '2024-07-23', '2024-07-28', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('a6316a1c-55ce-4b51-b635-f12299889929', 'b194ab9f-e5f6-4ef7-8666-dd5c18b03974', 4),
('caeeecaf-7fa5-4ff7-b1e5-ab85ba27fecf', 'dbdbbafe-d7d5-451b-be99-05fbeb9e1086', 6),
('d0270d65-7a2a-4749-a441-99f44cc70ee1', '88912f01-931e-41e1-8a12-e3d776288e89', 12);