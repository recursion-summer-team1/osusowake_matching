INSERT INTO `User` (`userName`, `email`, `password`) 
VALUES
('ユーザー1', 'user1@example.com', 'password1'),
('ユーザー2', 'user2@example.com', 'password2'),
('ユーザー3', 'user3@example.com', 'password3');


INSERT INTO `Food` (userId, foodName, foodImageUrl, expirationDate, quantity, unit, description, isSoldOut)
VALUES
(1, 'Apple', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-30', 5.0, 'pieces', 'Fresh and delicious apple'),
(1, 'Banana', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-28', 3.0, 'pieces', 'Ripe and sweet banana'),
(2, 'Carrot', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-25', 2.5, 'pieces', 'Organic carrot for sale');

INSERT INTO `Deal` (`requesterId`, `foodId`, `isComplete`) 
VALUES
(1, 1, TRUE),
(2, 1, FALSE),
(2, 2, TRUE);

INSERT INTO `Chat` (`dealId`, `senderId`, `content`) VALUES
(1, 1, 'ユーザー1からのメッセージ1'),
(1, 2, 'ユーザー2からのメッセージ1'),
(2, 1, 'ユーザー1からのメッセージ2');

INSERT INTO `FriendShip` (`followeeId`, `followerId`)
VALUES
(1, 2),  
(2, 3),  
(3, 1),
(2, 1),
(1, 3);