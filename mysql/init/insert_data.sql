INSERT INTO `users` (name, email, password) VALUES("taro", 'hoge@fuga.com', 'pass123');
INSERT INTO `users` (name) VALUES("jiro");
INSERT INTO `users` (name) VALUES("tanaka");

INSERT INTO `Food` (userId, foodName, foodImageUrl, expirationDate, quantity, unit, description)
VALUES
(1, 'Apple', 'https://example.com/apple.jpg', '2023-09-30', 5.0, 'pieces', 'Fresh and delicious apple'),
(1, 'Banana', 'https://example.com/banana.jpg', '2023-09-28', 3.0, 'pieces', 'Ripe and sweet banana'),
(2, 'Carrot', 'https://example.com/carrot.jpg', '2023-09-25', 2.5, 'pieces', 'Organic carrot for sale');