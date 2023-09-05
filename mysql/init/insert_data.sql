INSERT INTO `User` (`userName`, `email`, `password`) 
VALUES
('ユーザー1', 'user1@example.com', 'password1'),
('ユーザー2', 'user2@example.com', 'password2'),
('ユーザー3', 'user3@example.com', 'password3');


INSERT INTO `Food` (userId, foodName, foodImageUrl, expirationDate, quantity, unit, description)
VALUES
(1, 'Apple', 'https://example.com/apple.jpg', '2023-09-30', 5.0, 'pieces', 'Fresh and delicious apple'),
(1, 'Banana', 'https://example.com/banana.jpg', '2023-09-28', 3.0, 'pieces', 'Ripe and sweet banana'),
(2, 'Carrot', 'https://example.com/carrot.jpg', '2023-09-25', 2.5, 'pieces', 'Organic carrot for sale');