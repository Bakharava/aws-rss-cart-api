CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE carts (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    status cart_status
);

CREATE TABLE cart_items (
    cart_id uuid REFERENCES carts(id),
    product_id uuid,
    count integer
);