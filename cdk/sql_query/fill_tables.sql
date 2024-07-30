INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
('a6316a1c-55ce-4b51-b635-f12299889929', 'bbd2d1b0-5f27-4dd5-87ac-0f58e2f4a0fa', CURRENT_DATE, CURRENT_DATE, 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('46bfee79-7fc3-4853-b191-b7698ba4da75', 'b194ab9f-e5f6-4ef7-8666-dd5c18b03974', 4);